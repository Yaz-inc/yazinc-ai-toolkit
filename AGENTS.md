# AGENTS.md: Yazinc AI Toolkit

## Purpose

Yazinc AI Toolkit is a public library of reusable AI-agent skills, patterns, templates, and installation helpers maintained by Yaz Inc.

- Repository: `https://github.com/Yaz-inc/yazinc-ai-toolkit`
- Public site: `https://yaz-inc.github.io/yazinc-ai-toolkit/`
- Catalog: `INDEX.md`
- Contribution workflow: `WORKFLOW.md`

## Repository structure

| Folder | Purpose |
|---|---|
| `skills/` | One reusable capability per folder, documented in `SKILL.md` |
| `patterns/` | Longer implementation guidance |
| `templates/` | Reusable, secret-free examples |
| `scripts/` | Installation, validation, and maintenance helpers |
| `projects/REGISTRY.md` | Public catalog provenance policy |

## Working rules

1. Remove organization-specific data, customer details, credentials, local paths, repository names, and commit identifiers before publishing a reusable workflow.
2. Keep each skill focused on one repeatable job.
3. Update `INDEX.md`, the landing-page catalog, and `projects/REGISTRY.md` when adding or retiring a skill.
4. Never commit secrets, personal access tokens, environment files, customer data, private URLs, or workstation-specific paths.
5. Run the secret exposure gate before every deployment or public push.
6. Validate examples on a disposable fixture and document any required version constraints.
7. Preserve license notices for included third-party assets.

## Installation

Use the universal installer from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-toolkit.ps1 -Target all -Scope user
```

Supported targets are `all`, `codex`, `cursor`, `claude`, and `antigravity`. Restart the selected agent after installation.

## Publishing checklist

- Run `scripts/pre-deploy-secrets-scan.ps1`.
- Search tracked content for private paths, unrelated repository names, credentials, and obsolete provenance.
- Validate every `SKILL.md` frontmatter block.
- Verify the landing page, language selector, keyboard navigation, and links.
- Confirm the GitHub Pages deployment returns HTTP 200.
