---
name: laravel-rag
description: >-
  Design, implement, upgrade, or review secure read-only retrieval-augmented
  assistants in Laravel, including ingestion, embeddings, authorization-scoped
  retrieval, citations, bounded tool calling, and regression evaluation. Use for
  Laravel "chat with our data," database-aware RAG, or a one-shot RAG chatbot
  that needs multi-step read-only tools. Do not use for write-capable agents or
  vector-store selection alone.
license: MIT
metadata:
  version: "2.0.0"
  version_timestamp: "2026-11-10 18:44:43 +05:00"
  stack: "Laravel, PHP 8.2+, provider client, measured vector store"
---

# Laravel RAG

Build a grounded, read-only Laravel assistant where retrieval is one explicitly
scoped tool. Keep authorization, data access, and safety controls in application
code. Never rely on the model to enforce them.

Load `references/implementation.md` when producing migrations, interfaces,
services, tools, tests, or deployment steps.

## Route related work

- Use `vector-database-readiness` before choosing or changing vector storage.
- Use `rag-evaluation` for dataset design, metrics, thresholds, and release gates.
- Use `laravel-ai-multi-provider` when provider routing and fallback are in scope.
- Use a security review before releasing access to confidential or tenant data.

## Required discovery

Before implementation, inspect:

1. Supported PHP and Laravel versions, lockfiles, database engine, queues, and
   the installed provider client. Verify current package APIs before coding.
2. Authentication, policies, tenant boundaries, data classification, deletion
   requirements, provider retention, and residency constraints.
3. Corpus size, update rate, source ownership, expected questions, latency and
   cost budgets, and the evaluation set that defines success.
4. Existing retrieval, logging, observability, and failure behavior. Preserve
   useful behavior unless an approved change replaces it.

Do not install a new package or vector service until the existing stack and
operational constraints have been assessed.

## Reference architecture

```text
authenticated request
  -> orchestrator with step, time, and cost limits
     -> policy-scoped retriever
     -> allow-listed domain tools
  -> evidence and resolvable source identifiers
  -> cited answer, safe refusal, or bounded failure
```

RAG is a retrieval capability, not an authorization layer. Apply tenant and
principal filters before similarity scoring. A high similarity score must never
make an inaccessible record visible.

## Implementation workflow

1. **Define the contract.** Specify allowed questions, read-only tools, source
   owners, refusal behavior, citation format, budgets, and release metrics.
2. **Threat-model the data path.** Cover cross-tenant leakage, prompt injection,
   unauthorized source discovery, sensitive logs, stale deletions, provider
   exposure, and denial-of-wallet loops.
3. **Build deterministic ingestion.** Use stable document and chunk identifiers,
   normalized content hashes, embedding model and dimension metadata, source
   revisions, and mark-and-sweep deletion or tombstone handling. Make retries
   idempotent.
4. **Implement scoped retrieval.** Filter by tenant, principal, policy, source,
   and lifecycle state before ranking. Tune top-k, thresholds, hybrid search, and
   reranking against the evaluation set, not intuition.
5. **Implement domain tools.** Give each tool a narrow JSON schema and a fixed
   domain query. Validate arguments, hydrate an authorized model, run its policy,
   select approved fields, and return a size-limited result. Do not expose a
   generic table or SQL tool to the model.
6. **Add a bounded model adapter.** Prefer the provider's current tool-calling
   interface when the installed client supports it. Isolate provider response
   shapes behind an adapter. Enforce maximum steps, wall time, output size, tool
   result size, and request cost. Handle malformed calls and provider failures.
7. **Ground the response.** Treat retrieved text and tool output as untrusted
   data. Require resolvable citations for factual claims. If evidence is absent,
   inaccessible, contradictory, or stale, state the limitation instead of
   guessing.
8. **Observe safely.** Record request and correlation IDs, tool name, duration,
   result count, source identifiers, status, model, and usage. Hash or redact
   arguments. Do not log raw prompts, rows, retrieved passages, secrets, or
   personal data by default.
9. **Evaluate and release.** Test retrieval, faithfulness, citations, refusal,
   tenant isolation, prompt injection, stale-source removal, loop limits,
   provider failure, latency, and cost. Compare with the approved baseline and
   retain a rollback path.

## Non-negotiable controls

- Use a database principal with SELECT-only grants for read tools, plus
  application policies. A connection name alone does not make access read-only.
- Never interpolate model output into SQL, identifiers, class names, file paths,
  URLs, or commands. Map model-facing enums to fixed server-side objects.
- Never authorize a table name and numeric ID as if they were a Laravel model.
  Resolve the scoped record first, then authorize the actual model instance.
- Keep retrieval partitions and policy filters in the query executed by the
  vector store. Do not retrieve globally and filter sensitive hits afterward.
- Treat indexed content as untrusted input. Prompt text is defense in depth, not
  the enforcement boundary.
- Propagate source edits, revocation, retention, and deletion into the index.
- Do not embed secrets or unnecessary personal data. Confirm provider and vector
  store handling before sending confidential material.
- A write or action tool is outside this skill. It requires a separate design,
  dry-run behavior, explicit approval, idempotency, audit evidence, and rollback.

## Completion evidence

Do not claim the feature is production-ready until the following are recorded:

- supported runtime and package versions;
- migration and rollback results;
- deterministic ingestion and deletion-sync results;
- authorization and cross-tenant negative tests;
- grounded-answer, citation, refusal, and injection evaluation results;
- bounded failure, latency, and cost results;
- secret and sensitive-log scan results;
- deployment, monitoring, and rollback instructions.

## Public references

- [OpenAI embeddings guide](https://developers.openai.com/api/docs/guides/embeddings)
- [OpenAI function calling guide](https://developers.openai.com/api/docs/guides/function-calling)
- [OpenAI PHP Laravel integration](https://github.com/openai-php/laravel)
- [Laravel authorization documentation](https://laravel.com/docs/authorization)

## Origin

- **Origin:** Generalized local Laravel RAG workflow, independently revised for
  safe public reuse.
- **Added:** 2026-11-10
