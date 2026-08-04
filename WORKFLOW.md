# Reusable Skill Contribution Workflow

Use this workflow to turn a useful implementation lesson into a safe, public skill.

## 1. Identify a repeatable capability

Choose a workflow that is useful across more than one application. Define its trigger, expected outcome, constraints, and verification criteria.

## 2. Generalize before writing

Remove all customer names, private repository names, local paths, credentials, internal URLs, production data, proprietary rules, and historical commit identifiers. Replace domain-specific field names with neutral examples when the original name is not essential.

## 3. Create or update the skill

Place the skill in `skills/<skill-name>/SKILL.md`. Keep instructions actionable and include safeguards, failure handling, and verification. Add focused references or scripts only when they materially improve reuse.

## 4. Update the public catalog

Update:

- `INDEX.md`
- `projects/REGISTRY.md`
- `assets/toolkit.js` when catalog metadata changes
- translated interface copy when user-facing labels change

## 5. Validate

- Confirm every skill has valid frontmatter and a unique name.
- Run relevant syntax and script checks.
- Run the repository secret scan.
- Search for private paths, unrelated repositories, customer names, and obsolete provenance.
- Test the public landing page at desktop and mobile widths.

## 6. Commit and publish

Use a concise public commit message that describes the reusable capability. Do not name the private source application. Push only after the clean-tree and public-content checks pass.

Suggested format:

```text
Add <skill-name> reusable workflow

What: <one-line capability summary>.
Validation: <checks performed>.
```
