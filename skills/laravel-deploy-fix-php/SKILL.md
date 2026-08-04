---
name: laravel-deploy-fix-php
description: >-
  Post-deploy Laravel cache recovery via public/fix.php without SSH or exec().
  Use after git pull when app shows 500 from stale config/route cache, or when
  setting up production deploy recovery on shared hosting.
---

# Laravel Deploy fix.php Recovery

Standalone PHP script in `public/` that bootstraps Laravel and clears all caches when SSH/`artisan` is unavailable or awkward.

## When to use

- After deploy: app returns **500** (often stale `bootstrap/cache/config.php`)
- Shared hosting: no reliable shell access
- Emergency recovery while site is in maintenance

## Security model

- **Not in git:** commit only `public/fix.php.example`; add `/public/fix.php` to `.gitignore`
- **On each server:** `cp public/fix.php.example public/fix.php`
- **Auth:** `?key=` must match `hash('sha256', APP_KEY . 'cache-clear-secret-salt')`
- **403 response:** generic message only — never leak the key
- Optional: `ALLOWED_IPS` array for IP whitelist
- Ensure production `.env` has a real `APP_KEY` (fallback default is insecure)

## Derive the URL key (on server)

```bash
php -r "preg_match('/^APP_KEY=(.+)$/m', file_get_contents('.env'), \$m); echo hash('sha256', trim(\$m[1]).'cache-clear-secret-salt');"
```

Visit: `https://your-domain.com/fix.php?key=<hash>`

## What it clears

1. Artisan: `cache:clear`, `config:clear`, `route:clear`, `view:clear`, `optimize:clear`
2. Deletes: `bootstrap/cache/config.php`, routes, services, packages caches
3. Clears: `storage/framework/cache/data`, compiled views
4. Verifies storage/bootstrap directories exist and are writable

## Do

- Keep `fix.php` on production permanently for rescue (tradeoff vs delete-after-use)
- Run after every deploy if caches are enabled
- Works independently of Laravel HTTP middleware (503 maintenance does not block it)

## Don't

- Don't commit `fix.php` or expose keys in access logs (use private browser session)
- Don't use when 500 is caused by syntax errors or missing `vendor/` — fix code first

## Deploy checklist

```
□ fix.php.example in repo
□ /public/fix.php in .gitignore
□ cp fix.php.example → fix.php on server (once)
□ Bookmark fix.php?key=... per server
□ After git pull → hit fix.php if app breaks
```

## Template

Full template: [templates/fix.php.example](../../templates/fix.php.example)

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
