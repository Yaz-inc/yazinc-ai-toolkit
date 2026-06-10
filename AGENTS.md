# AGENTS.md — Yazinc Ai Toolkit

> **Read this first** whenever you open this repo or the user mentions "toolkit", "extract skill", or "push skills".

## What this is

**Yazinc Ai Toolkit** is Yasir's **personal, cross-project library** for Cursor agent skills, AI patterns, templates, and scripts. It is **not** a client application (not Asset Manager, not Century Displays).

- **Owner:** Yaz Inc — `yazinc@gmail.com`
- **GitHub:** `https://github.com/Yaz-inc/yazinc-ai-toolkit`
- **Purpose:** Reuse proven patterns across new projects; avoid reinventing the wheel.

## Why it exists

Every production project teaches repeatable patterns (DataTables modules, AI fallback chains, deploy recovery, etc.). Those get **generalized** here so the next project—and the next agent session—starts from documented skills instead of rediscovering solutions.

## How it works

```
┌─────────────────┐     extract & generalize      ┌──────────────────────┐
│  Client / dev   │ ────────────────────────────► │  Yazinc Ai Toolkit   │
│  project repo   │     commit + source reference   │  (this repo)         │
└─────────────────┘                               └──────────────────────┘
         ▲                                                    │
         │              copy / symlink skills                  │
         └────────────────────────────────────────────────────┘
                        new project starts here
```

| Folder | Role |
|--------|------|
| `skills/` | Cursor `SKILL.md` — one folder per skill |
| `patterns/` | Longer human docs (source material for skills) |
| `templates/` | Copy-paste stubs (fix.php, controller stubs, etc.) |
| `scripts/` | Link skills into `~/.cursor/skills/`, helpers |
| `projects/REGISTRY.md` | Which client/dev repos contributed which skills |
| `projects/REFERENCES.md` | **Git commit footers** — local path, repo, HEAD per project |
| `projects/INVENTORY.md` | Full Laragon project scan |
| `INDEX.md` | Master skill catalog |
| `WORKFLOW.md` | Step-by-step: extract → explain → commit → push |

## When to use this repo

### Starting a new project
1. Clone or pull this repo.
2. Symlink or copy needed skills from `skills/` into the new project's `.cursor/skills/` or `~/.cursor/skills/`.
3. Copy relevant `templates/` and `patterns/`.

### Closing or finishing work on a project
Follow **WORKFLOW.md** and skill **`skills/extract-to-toolkit/`**:

1. Inventory reusable patterns from the project (services, deploy scripts, AI integrations).
2. **Generalize** — remove client names, secrets, domain-specific business rules.
3. Write or update `skills/<name>/SKILL.md` (+ optional `reference.md`).
4. Add entry to `INDEX.md` and `projects/REGISTRY.md` with **source project + commit hash**.
5. Use commit footer from **`projects/REFERENCES.md`** for registered projects (Yazfex, Asset Manager, etc.).
6. Commit with a message that names the source project.
7. Push to `Yaz-inc/yazinc-ai-toolkit`.

## Commit message format

```
Add <skill-name> skill from <ProjectName>

Extracted from <github-org/repo> @ <short-sha>.
What: one-line description of the pattern.
Generalized: what was stripped or renamed.
Ref: projects/REGISTRY.md#<project-slug>
```

Example:

```
Add laravel-deploy-fix-php skill from Asset Manager

Extracted from Yaz-inc/Asset-Manager-V17-Final @ 0ee71e9.
What: Post-deploy cache reset via public/fix.php without SSH.
Generalized: Removed Century Displays branding; kept APP_KEY-derived secret.
Ref: projects/REGISTRY.md#asset-manager
```

## Hard rules

- **Never commit** PATs, `.env`, API keys, client data, or paths with secrets.
- **One skill = one job** — split large topics into focused skills.
- **Always update** `INDEX.md` and `projects/REGISTRY.md` in the same commit as a new skill.
- Tag stack versions in skill body when relevant (Laravel 10, PHP 8.1, etc.).
- Do **not** put custom skills in `~/.cursor/skills-cursor/` (Cursor reserved).

## Install skills into Cursor

```powershell
.\scripts\link-skills.ps1
```

Or copy `skills/<name>/` to `~/.cursor/skills/<name>/`.

## Related meta-skill

Load **`skills/extract-to-toolkit/SKILL.md`** when the user asks to extract, publish, or contribute skills from any project to this repo.
