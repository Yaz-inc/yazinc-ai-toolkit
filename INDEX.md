# Yazinc Ai Toolkit — Skill Index

> Update whenever you add, change, or retire a skill. See [WORKFLOW.md](WORKFLOW.md).

## Active skills — Laravel admin platform (Asset Manager)

| Skill | Summary | Source commit | Added |
|-------|---------|---------------|-------|
| `extract-to-toolkit` | Meta-skill: extract patterns into this repo | — | 2026-06-10 |
| `laravel-datatables-module` | Server-side Yajra CRUD lists | 0ee71e9 | 2026-06-10 |
| `laravel-activity-logger` | Hybrid indexed + JSON audit log | 0ee71e9 | 2026-06-10 |
| `laravel-deploy-fix-php` | Post-deploy cache reset | 0ee71e9 | 2026-06-10 |
| `laravel-dual-repo-push` | Dev + client GitHub push | 0ee71e9 | 2026-06-10 |
| `laravel-rbac-permissions` | Module read/write middleware | 0ee71e9 | 2026-06-10 |
| `laravel-soft-delete-trash` | Unified trash + 30-day cleanup | 0ee71e9 | 2026-06-10 |
| `laravel-security-hardening` | Setup lock, gitignore ops, input rule | 0ee71e9 | 2026-06-10 |
| `laravel-json-ai-settings` | Encrypted AI keys in storage JSON | 0ee71e9 | 2026-06-10 |
| `laravel-ai-multi-provider` | Provider fallback + friendly errors | 0ee71e9 | 2026-06-10 |
| `laravel-vision-label-scan` | Image → JSON → review → apply | 0ee71e9 | 2026-06-10 |
| `laravel-env-maintenance` | `.env` maintenance + branded 503 | 0ee71e9 | 2026-06-10 |
| `laravel-form-select2-global` | App-wide form/Select2 CSS variables | 0ee71e9 | 2026-06-10 |

**Source project:** Asset Manager — `Yaz-inc/Asset-Manager-V17-Final` @ `0ee71e9`

## AI skill cluster (use together)

```
laravel-json-ai-settings → laravel-ai-multi-provider → laravel-vision-label-scan
```

## Templates

| File | Linked skill |
|------|--------------|
| `templates/fix.php.example` | `laravel-deploy-fix-php` |
| `templates/push-both-repos.example.ps1` | `laravel-dual-repo-push` |
| `templates/TracksSoftDeletes.php.example` | `laravel-soft-delete-trash` |
| `templates/form-field-heights.css.example` | `laravel-form-select2-global` |

## Planned

| Source | Notes |
|--------|-------|
| Other Yaz Inc projects | Add to `projects/REGISTRY.md` as you extract |
