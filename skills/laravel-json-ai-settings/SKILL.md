---
name: laravel-json-ai-settings
description: >-
  Stores AI provider settings and encrypted API keys in JSON under storage,
  editable via admin UI without .env changes. Use when building Laravel apps
  with configurable AI keys, provider selection, or runtime AI settings.
---

# Laravel JSON AI Settings

Runtime AI configuration in `storage/app/ai/settings.json` — encrypted API keys via Laravel `Crypt`, readable/writable from admin UI.

## When to use

- Clients/admins change AI provider or API keys without redeploying `.env`
- Multiple provider keys (Gemini, OpenRouter, OpenAI, Claude) stored securely
- Default provider comes from config; override per installation in JSON

## Stack

- Laravel 10, `Illuminate\Support\Facades\Crypt`
- File: `config('ai.settings_file')` → `storage/app/ai/settings.json`
- Service: `JsonAiSettingsService`

## Do

- **Gitignore** `storage/app/ai/settings.json` — never commit keys
- Use `getDecrypted()` / `setEncrypted()` for `*_api_key` fields
- Use plain `get()` / `set()` for non-secret settings (`ai_provider`, `ai_model`, prompts)
- `sanitizeProvider()` against `config('ai.enabled_providers')` — migrate stale provider on load
- Create directory on first write (`storage/app/ai/`)

## Don't

- Don't store keys in `.env` for production UI-managed setups (optional env fallback OK for dev)
- Don't log decrypted keys
- Don't expose raw settings JSON to non-admin API responses

## Service API

```php
$settings->get('ai_provider', config('ai.provider'));
$settings->get('ai_model', config('ai.fallback_models.gemini'));
$settings->getDecrypted('gemini_api_key');
$settings->setEncrypted('openrouter_api_key', $plainKey);
$settings->all(); // for admin form — mask keys in UI
```

## Config

```php
// config/ai.php
'settings_file' => storage_path('app/ai/settings.json'),
'enabled_providers' => ['gemini', 'openrouter', 'openai', 'claude'],
'provider' => env('AI_PROVIDER', 'gemini'),
'fallback_models' => [
    'gemini' => 'gemini-2.0-flash',
    'openrouter' => 'openrouter/free',
    // ...
],
```

## Admin UI

- Super-admin settings page: provider dropdown, model field, per-provider API key inputs
- On save: encrypt keys, persist JSON, optionally `config:clear` if you cache config
- Show masked key (`••••••••`) when value exists; empty input = keep existing

## File checklist

| File | Action |
|------|--------|
| `app/Services/JsonAiSettingsService.php` | Load/save/encrypt |
| `config/ai.php` | `settings_file`, providers |
| `.gitignore` | `/storage/app/ai/settings.json` |
| Admin controller + view | CRUD settings |
| `AiService` | Read keys via `$this->settings->getDecrypted(...)` |

## Related skills

- `laravel-ai-multi-provider` — consumes these keys
- `laravel-security-hardening` — gitignore runtime AI config

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
