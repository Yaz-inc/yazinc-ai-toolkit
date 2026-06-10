# Project references for git commits

Use these blocks when extracting skills **into Yazinc Ai Toolkit** or when committing in the **source project**. Copy the matching block into your commit message `Ref:` footer.

**Before committing:** run `git rev-parse --short HEAD` in the source folder — update `<sha>` if HEAD moved.

---

## yazfex-suite (Perfex CRM module)

| Field | Value |
|-------|-------|
| **Display name** | YazfexAi Suite |
| **Type** | Perfex CRM module |
| **Local path** | `D:\Servers\laragon\www\perfex\modules\yazfex_suite` |
| **Git** | Local repo (no remote configured yet) |
| **Branch** | `master` |
| **Current HEAD** | `138b0d1` |
| **Tags** | `v17.8-stable`, `v17.8-290526` |
| **Registry slug** | `yazfex-suite` |
| **Stack** | Perfex / CodeIgniter, PHP, multi-provider AI, encrypted keystore, KB |

### Toolkit commit footer (copy-paste)

```
Extracted from YazfexAi Suite (Perfex module) @ 138b0d1
Local: D:\Servers\laragon\www\perfex\modules\yazfex_suite
What: <one line — e.g. Perfex AI keystore pattern>
Ref: projects/REGISTRY.md#yazfex-suite
```

### Source project commit (when working in module)

```
<your message>

Module: yazfex_suite v17.8 | Perfex YazfexAi Suite
Path: perfex/modules/yazfex_suite
```

> When you add a GitHub remote, update this file and REGISTRY with `Yaz-inc/<repo>` URL.

---

## yazfexai-website (SaaS marketing site)

| Field | Value |
|-------|-------|
| **Display name** | Yazfex AI SaaS Website |
| **Type** | Next.js marketing / SaaS site |
| **Local path** | `D:\Servers\laragon\www\perfex\yazfexai-website` |
| **GitHub** | [Yaz-inc/yazfexai](https://github.com/Yaz-inc/yazfexai) |
| **Branch** | `master` |
| **Current HEAD** | `b712898` |
| **Registry slug** | `yazfexai-website` |
| **Stack** | Next.js 16, React 19, Tailwind 4, Supabase, Vercel |

### Toolkit commit footer (copy-paste)

```
Extracted from Yaz-inc/yazfexai @ b712898
Local: D:\Servers\laragon\www\perfex\yazfexai-website
What: <one line — e.g. dark/light theme CSS variables>
Ref: projects/REGISTRY.md#yazfexai-website
```

### Source project commit (when working in website)

```
<your message>

Project: Yazfex AI Website | Yaz-inc/yazfexai
Path: perfex/yazfexai-website
```

> **Security:** Use clean remote URL `https://github.com/Yaz-inc/yazfexai.git` — do not embed PATs in `git remote` URLs.

---

## Quick reference table

| Slug | Source | HEAD (as of 2026-06-10) | Commit footer prefix |
|------|--------|-------------------------|----------------------|
| `asset-manager` | `Yaz-inc/Asset-Manager-V17-Final` | `0ee71e9` | `Extracted from Yaz-inc/Asset-Manager-V17-Final @ …` |
| `yazfex-suite` | Local Perfex module | `138b0d1` | `Extracted from YazfexAi Suite (Perfex module) @ …` |
| `yazfexai-website` | `Yaz-inc/yazfexai` | `b712898` | `Extracted from Yaz-inc/yazfexai @ …` |
| `mission-control` | `builderz-labs/mission-control` | `30ecc3d` | `Extracted from builderz-labs/mission-control @ …` |

---

## Update checklist (when registering a new project)

1. Add section to [REGISTRY.md](REGISTRY.md)
2. Add row to [INVENTORY.md](INVENTORY.md)
3. Add block to this file with local path + GitHub + HEAD
4. Note candidate skills in REGISTRY — extract later via [WORKFLOW.md](../WORKFLOW.md)
