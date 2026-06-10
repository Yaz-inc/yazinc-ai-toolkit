# Cursor skills

Each subfolder with a `SKILL.md` is one installable skill.

| Folder | Purpose |
|--------|---------|
| `extract-to-toolkit/` | Meta-skill — how to publish from any project into this repo |
| `_template/` | Copy when creating a new skill (do not install as-is) |

## Install

```powershell
# From repo root — links all skills into Cursor personal folder
.\scripts\link-skills.ps1
```

Or copy one folder to `~/.cursor/skills/<name>/`.

**Never** install into `~/.cursor/skills-cursor/` (Cursor reserved).

## Authoring

See [WORKFLOW.md](../WORKFLOW.md) and [AGENTS.md](../AGENTS.md).
