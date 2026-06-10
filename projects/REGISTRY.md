# Source project registry

Tracks which repos contributed skills to **Yazinc Ai Toolkit**.

---

## asset-manager

| Field | Value |
|-------|-------|
| **Display name** | Asset Manager (CDghl) |
| **Dev repo** | [Yaz-inc/Asset-Manager-V17-Final](https://github.com/Yaz-inc/Asset-Manager-V17-Final) |
| **Client repo** | [centurydisplays/Asset-Manager](https://github.com/centurydisplays/Asset-Manager) |
| **Stack** | Laravel 10, PHP 8.1, Bootstrap 5, Yajra DataTables, multi-provider AI |
| **Local path (dev)** | `D:\Servers\laragon\www\CDghl` |

### Skills contributed

| Skill | Extracted | Source commit | Notes |
|-------|-----------|---------------|-------|
| `laravel-datatables-module` | 2026-06-10 | 0ee71e9 | ~15 controllers; shared datatables-config partial |
| `laravel-activity-logger` | 2026-06-10 | 0ee71e9 | ActivityLogger + activity_logs migration |
| `laravel-deploy-fix-php` | 2026-06-10 | 0ee71e9 | Template in toolkit `templates/fix.php.example` |
| `laravel-dual-repo-push` | 2026-06-10 | 0ee71e9 | Template `templates/push-both-repos.example.ps1` |

### Planned from this project

- `laravel-rbac-permissions`, `laravel-soft-delete-trash`, AI block (settings, fallback, vision), maintenance, Select2, security hardening

### Reference docs in source (not yet extracted)

- `public/docs/V11__5_Pattern_Analysis.txt`
- `public/docs/V11__1_Logger_Implementation_Guide.txt`
- `docs/superpowers/specs/2026-06-10-f2-label-scan-design.md`

---

## other-projects

Add a section per project when extracting skills:

```markdown
## my-other-app

| Field | Value |
|-------|-------|
| **Repo** | Yaz-inc/... |

### Skills contributed
| Skill | Extracted | Source commit | Notes |
|-------|-----------|---------------|-------|
```

---

## Registry rules

1. One `## slug` section per source repo.
2. Every skill row links to a commit on the **source** repo.
3. No secrets, PATs, or client-only URLs with credentials.
