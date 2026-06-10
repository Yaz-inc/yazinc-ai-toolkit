---
name: laravel-dual-repo-push
description: >-
  Pushes the same branch to two GitHub remotes — developer repo and client
  official repo — using PATs from a local gitignored key file. Use when
  deploying Laravel projects with separate dev and client GitHub repositories.
---

# Dual GitHub Remote Push

One codebase, two remotes: **developer** (`origin`) and **client official** (`century` or custom name). Every production-ready commit goes to both.

## When to use

- You maintain a dev repo under your account and a client-facing repo
- Client owns their org repo; you push releases there after validation
- Same pattern as Yaz-inc dev + client official workflows

## Setup (per project)

```bash
git remote add origin https://github.com/YOUR-ORG/your-app-dev.git
git remote add client https://github.com/CLIENT-ORG/your-app.git
git remote -v
```

Store PATs locally — **never in the repo**:

```text
_deploy/key.git.md   # gitignored
```

Format:

```text
Developer: github_pat_...
Client Official:
Repo: https://github.com/client-org/app-repo
Token github_pat_...
```

## Push script pattern

Template: [templates/push-both-repos.example.ps1](../../templates/push-both-repos.example.ps1)

Script should:

1. Read PATs from `_deploy/key.git.md` (first PAT = dev, last PAT = client)
2. Read client repo URL from `Repo:` line if present
3. Push `main` (or `-Branch` param) to both URLs with embedded token
4. Optional `-Tag` for release tags
5. Exit non-zero if either push fails

Run from project root:

```powershell
.\scripts\push-both-repos.ps1
.\scripts\push-both-repos.ps1 -Tag "v1.0.0"
```

## Commit before push

Only push when:

- Changes are tested
- No secrets in staged files (`.env`, `key.git.md`, AI settings JSON)
- Commit message describes the release

## Do

- Always push both remotes for production releases
- Rotate PATs if exposed; keep key file gitignored
- Verify with `git ls-remote` after token rotation

## Don't

- Don't commit PATs to toolkit or project repos
- Don't force-push `main` to client repo without explicit approval

## File checklist

| File | Action |
|------|--------|
| `.gitignore` | Include `_deploy/`, `key.git.md` |
| `_deploy/key.git.md` | Local PATs + client repo URL (not committed) |
| `scripts/push-both-repos.ps1` | Project copy from template |
| `git remote -v` | Two remotes configured |

## Origin

- **Project:** Asset Manager (CDghl)
- **Repo:** Yaz-inc/Asset-Manager-V17-Final
- **Commit:** 0ee71e9
- **Extracted:** 2026-06-10
