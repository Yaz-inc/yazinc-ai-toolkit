# Yazinc Ai Toolkit

Personal AI agent skill library for **Yaz Inc** (`yazinc@gmail.com`). Cursor skills, patterns, templates, and scripts reused across **all** projects — not tied to Asset Manager or any single client.

## What & why

| | |
|---|---|
| **What** | Central repo for agent skills and proven dev patterns |
| **Why** | Start each new project from scaffolding you already trust; push learnings back after each delivery |
| **Who** | Yasir / Yaz Inc internal — same GitHub account as `Yaz-inc/Asset-Manager-V17-Final` |

## For humans

1. Clone: `git clone https://github.com/Yaz-inc/yazinc-ai-toolkit.git`
2. Link skills: `.\scripts\link-skills.ps1`
3. New project: copy/symlink what you need from `skills/`, `templates/`, `patterns/`
4. Project done: follow [WORKFLOW.md](WORKFLOW.md) to extract new skills and push back

## For Cursor agents

**Read [AGENTS.md](AGENTS.md) first** — explains what this repo is, how extraction works, commit format, and registry rules.

Meta-skill for contributing: `skills/extract-to-toolkit/SKILL.md`

## Structure

```
yazinc-ai-toolkit/
├── AGENTS.md              ← agents read this on open
├── WORKFLOW.md            ← extract → explain → commit → push
├── INDEX.md               ← skill catalog
├── projects/REGISTRY.md   ← source projects & contributions
├── projects/INVENTORY.md  ← all Laragon projects scan
├── skills/                ← Cursor SKILL.md folders
├── patterns/              ← detailed pattern docs
├── templates/             ← stubs to copy
└── scripts/               ← link-skills.ps1, etc.
```

## Rules

- Never commit secrets, PATs, or client-specific data
- One skill = one focused job
- Every new skill: update `INDEX.md` + `projects/REGISTRY.md` + source commit in commit message

## GitHub

- **Repo:** [Yaz-inc/yazinc-ai-toolkit](https://github.com/Yaz-inc/yazinc-ai-toolkit)
- **Account:** Yaz-inc (yazinc@gmail.com)
