# Laravel RAG implementation reference

> Version-Timestamp: 2026-11-10 18:44:43 +05:00

Use these contracts as a starting point. Adapt namespaces, package APIs, database
syntax, and response parsing to the versions locked by the host application.
Never paste an example into production without tests.

## 1. Establish compatibility

Record the current state before changing dependencies:

```powershell
php --version
php artisan --version
composer show openai-php/laravel openai-php/client
php artisan about
```

The current `openai-php/laravel` release requires PHP 8.2 or newer. Confirm the
version selected by Composer rather than assuming the latest release is
compatible. Its documented installation is:

```powershell
composer require openai-php/laravel
php artisan openai:install
```

Place placeholders in `.env.example`, not real credentials:

```dotenv
OPENAI_API_KEY=
RAG_CHAT_MODEL=
RAG_EMBED_MODEL=text-embedding-3-small
RAG_DB_CONNECTION=rag_readonly
```

Do not hardcode a default chat model. Select an available model after measuring
the approved evaluation set, latency, cost, tool-calling support, and data policy.

## 2. Configuration and budgets

```php
<?php

return [
    'models' => [
        'chat' => env('RAG_CHAT_MODEL'),
        'embedding' => env('RAG_EMBED_MODEL', 'text-embedding-3-small'),
    ],
    'database' => env('RAG_DB_CONNECTION', 'rag_readonly'),
    'retrieval' => [
        'top_k' => 5,
        'min_score' => null, // Set from evaluation, not a copied constant.
        'max_passage_chars' => 4000,
    ],
    'limits' => [
        'max_steps' => 5,
        'wall_seconds' => 25,
        'max_tool_result_bytes' => 32_000,
        'max_output_tokens' => 700,
    ],
];
```

Provision `rag_readonly` with a separate database account whose grants permit
only the required schemas, tables, and SELECT operations. Add driver-supported
read-only transaction settings when available. Test the grants with a synthetic
write that must fail in a disposable environment.

## 3. Index schema and lifecycle

A useful logical schema contains:

| Field | Purpose |
|---|---|
| `tenant_key` | Required isolation partition, or a documented global partition |
| `source_type`, `source_id` | Stable source identity |
| `source_revision` | Detect stale source versions |
| `chunk_key`, `chunk_ordinal` | Stable position within the source |
| `content` | Normalized text approved for retrieval |
| `content_hash` | Skip unchanged content without losing source identity |
| `embedding_model`, `embedding_dimensions`, `embedding_version` | Prevent incompatible comparisons |
| `vector` | Native vector type for production-scale similarity search |
| `metadata` | Allow-listed citation and filter fields only |
| `indexed_at`, `deleted_at` | Freshness and revocation lifecycle |

Use a unique key such as:

```text
(tenant_key, source_type, source_id, chunk_key, embedding_version)
```

Do not make `content_hash` globally unique. Identical text can legitimately
belong to multiple authorized sources and must retain separate provenance.

An idempotent indexing run should:

1. begin an indexing run with a correlation ID;
2. stream source records rather than loading the full corpus;
3. normalize and chunk deterministically;
4. skip embedding when content hash and embedding version are unchanged;
5. upsert by the stable unique key;
6. mark chunks seen in this run;
7. tombstone or remove unseen chunks only after the run succeeds;
8. publish counts for added, changed, unchanged, removed, and failed chunks.

Keep the previous index version available until the new version passes its smoke
test. This gives deployment a rollback path.

## 4. Application contracts

Keep provider and storage details behind small interfaces:

```php
interface EmbeddingGateway
{
    /** @return list<float> */
    public function embed(string $text): array;
}

interface Retriever
{
    /** @return list<RetrievedPassage> */
    public function search(RetrievalQuery $query, AccessContext $access): array;
}

interface ModelGateway
{
    public function respond(AgentTurn $turn): ModelTurn;
}

interface ReadTool
{
    public function name(): string;
    public function schema(): array;
    public function execute(array $arguments, AccessContext $access): ToolResult;
}
```

`AccessContext` should be built server-side from the authenticated request. It
contains the principal, tenant, approved scopes, locale, and correlation ID. The
model cannot supply or override those fields.

## 5. Authorization-first retrieval

The retriever must include access restrictions in the vector query itself:

```php
public function search(RetrievalQuery $query, AccessContext $access): array
{
    $vector = $this->embeddings->embed($query->text);

    return KnowledgeChunk::query()
        ->where('tenant_key', $access->tenantKey)
        ->whereNull('deleted_at')
        ->whereIn('source_type', $access->allowedSourceTypes)
        ->tap(fn ($builder) => $this->policies->scopeChunks($builder, $access))
        ->nearestTo($vector) // Implement with the selected vector driver.
        ->limit($query->topK)
        ->get()
        ->map(fn (KnowledgeChunk $chunk) => RetrievedPassage::fromChunk($chunk))
        ->all();
}
```

Do not use `Model::get()` followed by cosine calculation for a production corpus.
It loads unauthorized candidates into application memory, scales poorly, and can
make isolation depend on later filtering. A full scan is acceptable only in a
small disposable fixture whose limits are explicit.

## 6. Narrow domain tools

Map model-facing resource names to fixed model classes and field projections.
Scope first, find the actual model, then run the policy:

```php
final class ViewTicketTool implements ReadTool
{
    public function name(): string
    {
        return 'view_ticket';
    }

    public function schema(): array
    {
        return [
            'type' => 'object',
            'additionalProperties' => false,
            'properties' => [
                'ticket_id' => ['type' => 'integer', 'minimum' => 1],
            ],
            'required' => ['ticket_id'],
        ];
    }

    public function execute(array $arguments, AccessContext $access): ToolResult
    {
        $validated = Validator::make($arguments, [
            'ticket_id' => ['required', 'integer', 'min:1'],
        ])->validate();

        $ticket = Ticket::query()
            ->where('tenant_id', $access->tenantId)
            ->select(['id', 'subject', 'status', 'updated_at'])
            ->findOrFail($validated['ticket_id']);

        Gate::forUser($access->user)->authorize('view', $ticket);

        return ToolResult::success([
            'source_id' => "ticket:{$ticket->id}",
            'subject' => $ticket->subject,
            'status' => $ticket->status,
            'updated_at' => $ticket->updated_at->toIso8601String(),
        ]);
    }
}
```

Return the same outward error for inaccessible and nonexistent records when
resource enumeration is a risk. Do not expose generic `query_table`, raw SQL,
arbitrary column selection, arbitrary URLs, or arbitrary filesystem paths.

## 7. Bounded orchestration

Keep provider response parsing inside `ModelGateway`. For providers that support
the OpenAI Responses API, use its current function-calling flow when supported by
the installed PHP client. Otherwise implement the installed client's documented
tool-calling flow behind the same interface.

The orchestration loop should enforce:

```php
$deadline = now()->addSeconds(config('rag.limits.wall_seconds'));

for ($step = 0; $step < config('rag.limits.max_steps'); $step++) {
    throw_if(now()->greaterThan($deadline), AgentLimitExceeded::class);

    $turn = $model->respond($conversation->nextTurn());
    if ($turn->isFinal()) {
        return $citations->verifyAndFormat($turn, $conversation->evidence());
    }

    foreach ($turn->toolCalls() as $call) {
        $tool = $registry->require($call->name());
        $result = $tool->execute($call->arguments(), $access);
        $conversation->append($result->limitedTo(
            config('rag.limits.max_tool_result_bytes')
        ));
    }
}

throw new AgentLimitExceeded('The request exceeded its tool-step limit.');
```

Also reject duplicate tool-call IDs, malformed JSON, unknown tools, excess
arguments, oversized results, and unsupported content types. Use timeouts and
limited retries only for transient provider failures. Do not retry authorization,
validation, or budget failures.

## 8. Citations and safe observability

Every passage and tool result should carry a stable source ID plus an approved
display label. Verify that cited IDs exist in the evidence collected for the
current request. Never let the model invent a URL.

Log metadata, not content:

```php
Log::info('rag.tool.completed', [
    'correlation_id' => $access->correlationId,
    'user_key' => hash_hmac('sha256', (string) $access->user->getAuthIdentifier(), $auditKey),
    'tool' => $tool->name(),
    'argument_keys' => array_keys($validated),
    'arguments_hash' => hash('sha256', json_encode($validated, JSON_THROW_ON_ERROR)),
    'result_count' => $result->count(),
    'duration_ms' => $durationMs,
    'status' => 'ok',
]);
```

Keep `$auditKey` in an approved secret store. Define retention and access for
audit logs. Do not return internal traces or raw tool arguments to ordinary users.

## 9. Minimum test and evaluation matrix

| Area | Required evidence |
|---|---|
| Ingestion | retry idempotency, changed source, deleted source, failed partial run, rollback |
| Retrieval | known-answer recall, irrelevant query, threshold behavior, citation resolution |
| Authorization | same-tenant allowed, same-tenant denied, cross-tenant denied, revoked source denied |
| Injection | hostile text in documents and fields cannot change policy or call unapproved tools |
| Tools | malformed JSON, unknown field, oversized value, nonexistent record, policy denial |
| Orchestration | maximum steps, timeout, duplicate call, provider 429/5xx, invalid response |
| Privacy | sensitive content absent from logs, traces, fixtures, and error responses |
| Operations | migration rollback, index rollback, queue retry, monitoring and alert test |

Use synthetic fixtures. Define release thresholds before running the evaluation,
compare them with the baseline, and publish failures as unresolved evidence. A
passing happy-path test alone is not a production release gate.

## Official implementation references

- [OpenAI PHP Laravel README](https://github.com/openai-php/laravel/blob/main/README.md)
- [OpenAI Responses API overview](https://developers.openai.com/api/reference/responses/overview)
- [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling)
- [OpenAI embeddings](https://developers.openai.com/api/docs/guides/embeddings)
- [Laravel authorization](https://laravel.com/docs/authorization)
- [Laravel validation](https://laravel.com/docs/validation)
