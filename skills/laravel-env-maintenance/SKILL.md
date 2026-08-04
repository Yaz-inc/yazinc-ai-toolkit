---
name: laravel-env-maintenance
description: >-
  Toggles Laravel maintenance mode from .env (APP_MAINTENANCE) with branded
  503 page, secret bypass URL, and safe coexistence with manual artisan down.
  Use when deploying upgrades without SSH or for scheduled maintenance windows.
---

# Laravel Env-Driven Maintenance Mode

Control maintenance via `.env` instead of only `php artisan down` — synced on each boot to `storage/framework/down`.

## When to use

- Flip maintenance on/off by editing `.env` + deploy (or config clear)
- Branded 503 page for visitors; staff bypass via secret URL
- Avoid accidentally clearing a manual `artisan down` with env toggle

## .env

```env
APP_MAINTENANCE=true
APP_MAINTENANCE_MESSAGE="Application offline for scheduled upgrade."
APP_MAINTENANCE_SECRET=your-bypass-token
APP_MAINTENANCE_RETRY=60
APP_MAINTENANCE_STATUS=503
```

Bypass while down: visit `https://domain.com/{APP_MAINTENANCE_SECRET}`

## Config

```php
// config/app.php
'maintenance_env' => [
    'enabled' => filter_var(env('APP_MAINTENANCE', false), FILTER_VALIDATE_BOOL),
    'message' => env('APP_MAINTENANCE_MESSAGE', '...'),
    'secret'  => env('APP_MAINTENANCE_SECRET'),
    'retry'   => (int) env('APP_MAINTENANCE_RETRY', 60),
    'status'  => (int) env('APP_MAINTENANCE_STATUS', 503),
],
```

## EnvMaintenanceService

Boot from `AppServiceProvider::boot()`:

1. If `APP_MAINTENANCE=true` → activate down file with payload flag `env_managed: true`
2. If `APP_MAINTENANCE=false` → deactivate **only** if current down state is env-managed
3. Manual `php artisan down` (no `env_managed`) → **never** cleared by `.env`

Reuse middleware `$except` paths from `PreventRequestsDuringMaintenance` (e.g. `logo/*`, `database-setup`).

## Branded 503 view

`resources/views/errors/503.blade.php`:

- Company logo (route allowed in maintenance except list)
- Short reassuring copy — avoid duplicating env message twice on page
- Link to public website + `tel:` support phone optional

## Do

- Set `APP_MAINTENANCE=false` after deploy verified
- Run `fix.php` or `config:clear` if env change not picked up (config cache)
- Allow static logo/assets paths in maintenance except list

## Don't

- Don't leave maintenance on in production `.env` after go-live
- Don't rely on env sync if `bootstrap/cache/config.php` is stale — clear caches

## File checklist

| File | Action |
|------|--------|
| `app/Services/EnvMaintenanceService.php` | Sync logic |
| `config/app.php` | `maintenance_env` array |
| `app/Providers/AppServiceProvider.php` | `$envMaintenance->sync()` |
| `resources/views/errors/503.blade.php` | Branded page |
| `PreventRequestsDuringMaintenance.php` | `$except` paths |

## Related skills

- `laravel-deploy-fix-php` — clear cache after toggling maintenance
- `laravel-security-hardening` — lock setup routes

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
