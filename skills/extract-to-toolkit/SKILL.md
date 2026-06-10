---
name: extract-to-toolkit
description: >-
  Extracts reusable patterns from a finished or active project into Yazinc Ai
  Toolkit. Use when the user asks to add skills to the toolkit, publish patterns,
  extract from a project, close a project, or push learnings to yazinc-ai-toolkit.
  Reads AGENTS.md and WORKFLOW.md in the toolkit repo first.
---

# Extract to Yazinc Ai Toolkit

## Before you start

1. Locate **Yazinc Ai Toolkit** repo (clone if missing):
   `https://github.com/Yaz-inc/yazinc-ai-toolkit`
2. Read `AGENTS.md` and `WORKFLOW.md` in that repo.
3. Identify the **source project** repo name, path, and current `git rev-parse --short HEAD`.

## Steps

### 1. Discover candidates in source project

Scan:
- `app/Services/`, `.cursor/skills/`
- `*Guide*`, `*Pattern*`, `docs/superpowers/specs/`
- Deploy ops: `fix.php.example`, push scripts, maintenance services
- AI: vision, fallback, provider config

List 3–5 candidates; confirm with user if scope is unclear.

### 2. Generalize

Remove: client names, secrets, domain-specific fields, real URLs.
Keep: structure, steps, config keys (no values), stack versions.

### 3. Write skill

Create `skills/<kebab-name>/SKILL.md` from `skills/_template/SKILL.md`.

Required footer in every extracted skill:

```markdown
## Origin
- **Project:** <display name>
- **Repo:** <org/repo>
- **Commit:** <short-sha>
- **Extracted:** <YYYY-MM-DD>
```

### 4. Register

- Add row to `INDEX.md`
- Add/update section in `projects/REGISTRY.md`

### 5. Commit (toolkit repo)

```
Add <skill-name> skill from <ProjectName>

Extracted from <org/repo> @ <sha>.
What: <one line>.
Generalized: <what was removed>.
Ref: projects/REGISTRY.md#<slug>
```

Verify `git status` shows **no** `.env`, tokens, or `key.git.md`.

### 6. Push

```bash
git push origin main
```

Remote: `https://github.com/Yaz-inc/yazinc-ai-toolkit.git`

## Explain to the user

After push, summarize:
- Skill name and path
- What it does (plain language)
- Source project + commit reference
- How to use in next project (symlink or copy to `.cursor/skills/`)

## Do not

- Commit PATs or client data
- Copy entire client controllers verbatim — distill the pattern
- Skip `INDEX.md` or `REGISTRY.md` updates
