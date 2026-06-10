# Source project registry

Tracks which repos contributed skills to **Yazinc Ai Toolkit**. Update when extracting from a project.

---

## asset-manager

| Field | Value |
|-------|-------|
| **Display name** | Century Displays Asset Manager (CDghl) |
| **Dev repo** | [Yaz-inc/Asset-Manager-V17-Final](https://github.com/Yaz-inc/Asset-Manager-V17-Final) |
| **Client repo** | [centurydisplays/Asset-Manager](https://github.com/centurydisplays/Asset-Manager) |
| **Stack** | Laravel 10, PHP 8.1, Bootstrap 5, Yajra DataTables, multi-provider AI |
| **Local path (dev)** | `D:\Servers\laragon\www\CDghl` |

### Skills contributed

| Skill | Extracted | Source commit | Notes |
|-------|-----------|---------------|-------|
| *(pending)* | — | — | Planned: datatables, fix.php, AI fallback, label scan |

### Patterns worth extracting

- Server-side DataTables (`public/docs/V11__5_Pattern_Analysis.txt`)
- Activity logger (`public/docs/V11__1_Logger_Implementation_Guide.txt`)
- F-2 label scan spec (`docs/superpowers/specs/2026-06-10-f2-label-scan-design.md`)
- Post-deploy `public/fix.php.example`

---

## other-projects

Add a section per project:

```markdown
## my-other-app

| Field | Value |
|-------|-------|
| **Display name** | ... |
| **Repo** | Yaz-inc/... |
| **Stack** | ... |

### Skills contributed
| Skill | Extracted | Source commit | Notes |
|-------|-----------|---------------|-------|
| `skill-name` | YYYY-MM-DD | abc1234 | ... |
```

---

## Registry rules

1. One `## slug` section per source repo.
2. Every skill row links to a commit on the **source** repo (not toolkit commit).
3. Do not paste secrets, `.env`, or client-only URLs here.
