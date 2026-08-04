---
name: central-knowledge-base
description: Maintain and retrieve shared, cross-project knowledge in a central local directory without placing secrets or confidential client data in Markdown. Use when the user asks to add information to the central KB, create a shared source of truth, document reusable project references, reconcile duplicate knowledge, or help another agent discover approved resources.
---

# Central Knowledge Base

Version-Timestamp: 2026-08-04 18:24:00 +05:00

## Purpose

Maintain a searchable, cross-agent source of truth at `D:\Servers\KB_Central` for stable, reusable, non-secret knowledge. Keep project requirements in their project repositories and keep credentials in an approved secret store.

## Classify before writing

Classify every proposed item into one category:

1. `Public or reusable`: patterns, capability catalogs, non-sensitive operating guidance, and public references. These may be stored in the central KB.
2. `Internal but non-secret`: project ownership, local paths, environment names, service inventory, and runbook links. Store only the minimum necessary detail.
3. `Secret`: passwords, tokens, API keys, private keys, session cookies, connection strings containing credentials, recovery codes, or confidential authentication material. Never store these in Markdown or source control.
4. `Project-specific`: volatile requirements, active defects, client data, and implementation state. Keep these in the project repository and place only a pointer in the central KB when useful.

If classification is uncertain, treat the item as confidential and do not copy it.

## Store secrets safely

For secret material:

- Use an approved operating-system credential store, environment variable, or secret manager.
- Put only a non-secret reference in the KB, such as the secret name, owner, intended system, rotation date, and retrieval procedure.
- Never echo a secret into terminal output, prompts, logs, screenshots, commits, reports, or generated fixtures.
- Never migrate an existing credential file into the KB. Recommend rotation if a secret appears in plaintext.

## Write or update knowledge

1. Inspect `D:\Servers\KB_Central` and its applicable local instructions before editing.
2. Search for an existing canonical page and aliases before creating a new file.
3. Prefer descriptive kebab-case filenames and stable topic folders.
4. Add a visible `Version-Timestamp` to maintained catalogs, reports, and exported references.
5. Record source, owner, scope, verification date, and links to the authoritative project or service.
6. Merge non-conflicting facts. Preserve disputed or obsolete facts with status and replacement notes instead of silently erasing history.
7. Verify that the result contains no secrets, unnecessary personal data, client records, or inaccessible local-only assumptions.

## Retrieve knowledge

1. Search the central KB before asking the user for information already documented there.
2. Treat the KB as a discovery layer, not automatic proof that volatile facts remain current.
3. Verify time-sensitive, security-sensitive, or production-impacting details against the authoritative system.
4. Report the source file and verification status when using KB information for a material decision.

## Resolve duplicates

- Choose one canonical page per topic.
- Replace duplicate pages with short pointers when safe.
- Preserve provenance and last verification dates.
- Do not delete conflicting records until the owner confirms which source is authoritative.

## Completion checks

- The item belongs in a cross-project KB.
- No secret or unnecessary confidential data was written.
- The canonical page is searchable and linked from the relevant catalog.
- Source, owner, and verification status are clear.
- Project-specific details remain in the project repository.

## Origin

- **Project:** Yaz Inc website agent configuration
- **Repo:** Local working copy, repository metadata unavailable
- **Commit:** Unavailable
- **Extracted:** 2026-08-04
- **Generalized:** Replaced plaintext credential storage guidance with secret references, minimum-necessary data handling, provenance, and verification controls.
