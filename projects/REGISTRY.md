# Source project registry

See also: [INVENTORY.md](INVENTORY.md) — full Laragon project scan.

---

## asset-manager

| Field | Value |
|-------|-------|
| **Display name** | Asset Manager (CDghl) |
| **Dev repo** | [Yaz-inc/Asset-Manager-V17-Final](https://github.com/Yaz-inc/Asset-Manager-V17-Final) |
| **Client repo** | [centurydisplays/Asset-Manager](https://github.com/centurydisplays/Asset-Manager) |
| **Stack** | Laravel 10, PHP 8.1, Bootstrap 5, Yajra DataTables, multi-provider AI |
| **Local path** | `D:\Servers\laragon\www\CDghl` |
| **Status** | **Extracted** — 13 Laravel skills @ `0ee71e9` |

### Skills contributed

| Skill | Extracted | Commit | Batch |
|-------|-----------|--------|-------|
| `laravel-datatables-module` | 2026-06-10 | 0ee71e9 | 1 |
| `laravel-activity-logger` | 2026-06-10 | 0ee71e9 | 1 |
| `laravel-deploy-fix-php` | 2026-06-10 | 0ee71e9 | 1 |
| `laravel-dual-repo-push` | 2026-06-10 | 0ee71e9 | 1 |
| `laravel-rbac-permissions` | 2026-06-10 | 0ee71e9 | 2 |
| `laravel-soft-delete-trash` | 2026-06-10 | 0ee71e9 | 2 |
| `laravel-security-hardening` | 2026-06-10 | 0ee71e9 | 2 |
| `laravel-json-ai-settings` | 2026-06-10 | 0ee71e9 | 3 |
| `laravel-ai-multi-provider` | 2026-06-10 | 0ee71e9 | 3 |
| `laravel-vision-label-scan` | 2026-06-10 | 0ee71e9 | 3 |
| `laravel-env-maintenance` | 2026-06-10 | 0ee71e9 | 3 |
| `laravel-form-select2-global` | 2026-06-10 | 0ee71e9 | 3 |

---

## mission-control

| Field | Value |
|-------|-------|
| **Display name** | Mission Control (OpenClaw orchestration) |
| **Repo** | [builderz-labs/mission-control](https://github.com/builderz-labs/mission-control) |
| **Stack** | Next.js, SQLite, SSE/WebSocket, adapter protocol |
| **Local path** | `D:\Servers\laragon\www\MissionControl` |

### Skills contributed

| Skill | Extracted | Commit | Notes |
|-------|-----------|--------|-------|
| `mission-control` | 2026-06-10 | 30ecc3d | Condensed from repo-root `SKILL.md` |

### Planned

- Link to OpenClaw gateway setup skill when documented

---

## mediav1

| Field | Value |
|-------|-------|
| **Display name** | MediaV1 |
| **Repo** | [yasirnmg/MediaV1](https://github.com/yasirnmg/MediaV1) |
| **Stack** | React 19, Vite, MUI, Supabase |
| **Local path** | `D:\Servers\laragon\www\MediaV1` |
| **Status** | **Scan** — not yet extracted |

### Candidate skills

- React + Supabase media app patterns
- MUI layout / asset library UI

---

## fm2026

| Field | Value |
|-------|-------|
| **Display name** | Fee Management 2026 |
| **Repo** | [Yazinc/FM2026](https://github.com/Yazinc/FM2026) |
| **Stack** | Slim PHP 4 (not Laravel) |
| **Local path** | `D:\Servers\laragon\www\fm2026` |
| **Status** | **Scan** |

---

## philsis

| Field | Value |
|-------|-------|
| **Display name** | Phil / philsis |
| **Repo** | [Yazinc/philsis](https://github.com/Yazinc/philsis) |
| **Local path** | `D:\Servers\laragon\www\phil` |
| **Status** | **Scan** |

---

## rockcreteusa-pro

| Field | Value |
|-------|-------|
| **Display name** | RockCrete USA Pro |
| **Dev repo** | [Yaz-inc/rockcreteusa](https://github.com/Yaz-inc/rockcreteusa) |
| **Local path** | `D:\Servers\laragon\www\RockCreteUsa-Pro` |
| **Status** | **Scan** — blueprint, templates, scripts |

---

## yazfex-suite

| Field | Value |
|-------|-------|
| **Display name** | YazfexAi Suite (Perfex CRM module) |
| **Local path** | `D:\Servers\laragon\www\perfex\modules\yazfex_suite` |
| **GitHub** | *(local git only — add remote when published)* |
| **Branch / HEAD** | `master` @ `138b0d1` |
| **Tags** | `v17.8-stable` |
| **Stack** | Perfex CRM, PHP, multi-provider AI chat, DB tools, encrypted keystore, knowledge base |
| **Module version** | 17.8 (`yazfex_suite.php`) |
| **Status** | **Registered** — skills not yet extracted |

### Candidate skills

- Perfex module bootstrap / `install.php` pattern
- Multi-provider AI + CRM database read/write tools
- Military-grade keystore (AEAD + HMAC)
- Offline licence validation
- Auto-learning KB with schema discovery

### Git commit reference

See [REFERENCES.md#yazfex-suite](REFERENCES.md#yazfex-suite-perfex-crm-module)

### Skills contributed

| Skill | Extracted | Commit | Notes |
|-------|-----------|--------|-------|
| *(pending)* | — | — | |

---

## yazfexai-website

| Field | Value |
|-------|-------|
| **Display name** | Yazfex AI SaaS Website |
| **Local path** | `D:\Servers\laragon\www\perfex\yazfexai-website` |
| **GitHub** | [Yaz-inc/yazfexai](https://github.com/Yaz-inc/yazfexai) |
| **Branch / HEAD** | `master` @ `b712898` |
| **Stack** | Next.js 16, React 19, Tailwind CSS 4, Supabase, Vercel Analytics, Resend |
| **Status** | **Registered** — skills not yet extracted |

### Candidate skills

- Next.js 16 marketing site with dark/light theme CSS variables
- 36-page static SaaS site structure
- Supabase integration patterns
- Vercel deployment

### Git commit reference

See [REFERENCES.md#yazfexai-website](REFERENCES.md#yazfexai-website-saas-marketing-site)

### Skills contributed

| Skill | Extracted | Commit | Notes |
|-------|-----------|--------|-------|
| *(pending)* | — | — | |

---

## Registry rules

1. One `## slug` section per source repo.
2. Every skill row links to a commit on the **source** repo.
3. No secrets, PATs, or credentials in this file.
