---
name: laravel-ai-multi-provider
description: >-
  Multi-provider AI chat and vision with automatic fallback when quota, rate
  limits, or model unavailability occur. Use when integrating Gemini, OpenRouter,
  OpenAI, or Claude in Laravel with resilient error messages.
---

# Laravel AI Multi-Provider + Fallback

Single `AiService` routes to configured provider; on retryable failures, walks a **fallback chain** (same provider alt models → cross-provider plan in config).

## When to use

- Production AI features that must survive free-tier quota exhaustion
- Chat + vision share one fallback infrastructure
- User-friendly errors instead of raw API JSON

## Stack

- Laravel 10, Guzzle/Http facade
- Settings from `laravel-json-ai-settings`
- Config: `config/ai.php` → `fallback_plan`, `fallback_models`, `label_scan.vision_models`

## Architecture

```
User message / image
    → primary provider + model (from settings)
    → executeWithFallbackChain(mode, provider, model, invoke)
        → buildFallbackChain('chat'|'label_scan', ...)
        → foreach step: skip if no API key; try invoke; catch retryable → next
    → formatAiErrorMessage() on final failure
```

## Config: fallback_plan

```php
'fallback_plan' => [
    'enabled' => true,
    'chat' => [
        ['provider' => 'openrouter', 'models' => ['openrouter/free', 'meta-llama/llama-3.3-70b-instruct:free']],
        ['provider' => 'gemini', 'models' => ['gemini-2.5-flash-lite', 'gemini-2.0-flash-lite']],
    ],
    'label_scan' => [
        ['provider' => 'openrouter', 'models' => ['openrouter/free', 'nvidia/nemotron-nano-12b-v2-vl:free']],
        ['provider' => 'gemini', 'models' => ['gemini-2.5-flash-lite', 'gemini-2.5-flash']],
    ],
],
```

## Retryable errors

Treat as fallback-worthy (case-insensitive): `quota`, `rate limit`, `429`, `503`, `resource exhausted`, `high demand`, `no endpoints`, `not found` (model), etc.

Non-retryable (invalid key, bad request): throw immediately.

## User-facing messages

`formatAiErrorMessage()` strips provider prefixes; maps quota/overload to plain English.  
On total failure: list attempted provider/model pairs + hint to add OpenRouter free key.

## Vision specifics (Gemini)

- Set `thinkingBudget: 0` on gemini-2.5-flash/pro to avoid truncated JSON
- Raise `label_scan.max_output_tokens` (e.g. 4096) for label extraction
- Low temperature (0.1) for structured JSON

## Do

- Run `php artisan config:clear` after changing `config/ai.php` on servers with config cache
- Log successful fallback at info level for debugging
- Skip chain steps when API key for that provider is empty

## Don't

- Don't hardcode dead OpenRouter model IDs — verify on openrouter.ai/models
- Don't enable fallback for auth/validation errors

## File checklist

| File | Action |
|------|--------|
| `app/Services/AiService.php` | `ask()`, `analyzeImage()`, chain builders |
| `config/ai.php` | providers, fallback_plan, endpoints |
| `JsonAiSettingsService` | keys + active provider |

## Related skills

- `laravel-json-ai-settings` — key storage
- `laravel-vision-label-scan` — uses `analyzeImage()`

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
