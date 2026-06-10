# Workflow — Extract skills from a project → Yazinc Ai Toolkit

Use this when a project phase ends, a feature ships, or the user says *"add this to my toolkit"*.

---

## Phase 1 — Discover (in the source project)

1. Scan for high-reuse artifacts:
   - `app/Services/` — service classes
   - `.cursor/skills/` — project-local skills
   - `public/docs/*Guide*`, `*Pattern*` — pattern docs
   - Deploy/ops files (`fix.php.example`, push scripts)
   - AI integration (`AiService`, vision, fallback config)
2. Ask: *Would this help a **different** client/project?* If no → skip or keep project-local only.
3. List candidates in a short note for the user before writing files.

---

## Phase 2 — Generalize

Before copying anything into this repo:

| Remove | Keep |
|--------|------|
| Client/company names | Pattern structure |
| API keys, tokens, `.env` values | Config **shape** (keys only, no values) |
| Domain field names (asset_serial, etc.) | Generic examples (`entity_id`, `sku`) |
| Hard-coded URLs | Placeholder `https://your-domain.com` |

Write a **plain-language explanation** (2–4 sentences) for `INDEX.md`: what problem it solves, when to use it.

---

## Phase 3 — Create the skill

```text
skills/<kebab-case-name>/
├── SKILL.md        # required — triggers, steps, do/don't
├── reference.md    # optional — long detail
└── examples.md     # optional — snippets
```

Start from `skills/_template/SKILL.md`.

**SKILL.md must include:**
- YAML `name` + `description` (third person, WHAT + WHEN)
- Stack/version if relevant
- Step-by-step for an agent implementing the pattern
- **Source reference** footer:

```markdown
## Origin
- **Project:** Asset Manager (CDghl)
- **Repo:** Yaz-inc/Asset-Manager-V17-Final
- **Commit:** 0ee71e9
- **Extracted:** 2026-06-10
```

---

## Phase 4 — Register

### `INDEX.md`
Add a row:

| Skill | Summary | Stack | Source project | Source commit | Added |
|-------|---------|-------|----------------|---------------|-------|

### `projects/REGISTRY.md`
Add or update the project section with skills contributed and dates.

Optional: add a one-page `patterns/<name>.md` if the skill needs long background.

---

## Phase 5 — Commit and push

From **this repo root** (`yazinc-ai-toolkit`):

```powershell
git add skills/<name>/ INDEX.md projects/REGISTRY.md
git status   # verify no secrets
git commit -m "$( @'
Add <skill-name> skill from <ProjectName>

Extracted from <org/repo> @ <sha>.
What: ...
Generalized: ...
'@ )"
git push origin main
```

Push target: `https://github.com/Yaz-inc/yazinc-ai-toolkit.git`

---

## Phase 6 — Use in the next project

1. Pull latest toolkit.
2. Copy or symlink the new skill.
3. Tell the agent: *"Use @skill-name from Yazinc Ai Toolkit"* or rely on personal skills path.

---

## Checklist (copy per extraction)

```
[ ] Pattern is reusable outside source project
[ ] Client names and secrets removed
[ ] skills/<name>/SKILL.md created
[ ] INDEX.md updated
[ ] projects/REGISTRY.md updated
[ ] Commit message names source repo + SHA
[ ] git push to Yaz-inc/yazinc-ai-toolkit
```
