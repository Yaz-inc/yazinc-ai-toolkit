---
name: laravel-security-hardening
description: >-
  Production security checklist for Laravel admin apps — lock database setup,
  gitignore ops files, validation rule against XSS payloads, and safe 403/404
  responses. Use when hardening deploys or reviewing production exposure.
---

# Laravel Security Hardening (Production Checklist)

Small, high-impact controls for admin Laravel apps on shared or client hosting.

## When to use

- Before first production deploy
- After pen-test or security review
- When adding public ops utilities (`fix.php`, setup wizards)

## 1. Lock `/database-setup` after install

Middleware `EnsureDatabaseSetupAllowed`:

- Allow if `APP_ALLOW_DB_SETUP=true` (temporary recovery only)
- Allow if DB unreachable or `users` table missing (first install)
- Otherwise return **404** (not 403 — don't advertise the route)

```php
Route::prefix('database-setup')
    ->middleware(EnsureDatabaseSetupAllowed::class)
    ->group(function () { ... });
```

`.env` production default:

```env
APP_ALLOW_DB_SETUP=false
```

## 2. Gitignore ops & runtime secrets

```gitignore
/public/fix.php
/storage/app/ai/settings.json
_server_env
/_deploy
.env
.env.production
```

Commit **templates only**: `public/fix.php.example`, not live `fix.php`.

See skill: `laravel-deploy-fix-php`.

## 3. Input validation — NoMaliciousInput rule

Custom validation rule rejecting obvious XSS/script payloads in user text fields:

```php
use App\Rules\NoMaliciousInput;

$request->validate([
    'notes' => ['nullable', 'string', new NoMaliciousInput],
]);
```

Patterns block: `<script`, `onerror=`, `<iframe`, `javascript:`, etc.

Apply to free-text fields on high-risk forms (assets, tickets, descriptions) — not every field.

## 4. Auth response hygiene

- `fix.php` failed key → generic 403, no hint of correct key
- Database setup disabled → 404
- Super admin areas → 403 with minimal detail

## 5. Environment defaults

```env
APP_DEBUG=false
APP_ENV=production
```

Never expose stack traces on production.

## 6. Maintenance & public assets

If using env-driven maintenance, allow logo/static paths in `PreventRequestsDuringMaintenance::$except` so branded 503 page renders.

## Do

- Review `.gitignore` on every new ops file added to `public/`
- Rotate PATs if `_deploy/key.git.md` ever leaked
- Use `APP_MAINTENANCE_SECRET` bypass only when needed

## Don't

- Don't commit encrypted AI settings JSON with keys
- Don't leave `APP_ALLOW_DB_SETUP=true` on production after setup
- Don't rely on NoMaliciousInput alone — still escape output in Blade (`{{ }}`)

## File checklist

| File | Action |
|------|--------|
| `app/Http/Middleware/EnsureDatabaseSetupAllowed.php` | Setup route lock |
| `app/Rules/NoMaliciousInput.php` | Validation rule |
| `.gitignore` | Ops files, env, runtime config |
| `public/fix.php.example` | Template only |
| `.env.example` | Document `APP_ALLOW_DB_SETUP` |

## Cross-skill

Before any production deploy, also run **`deploy-secrets-zero-exposure`** — post-deploy 404 checks on live domain (`.env`, `.git`, logs).

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
