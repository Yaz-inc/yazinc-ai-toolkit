---
name: ci-cd-release-gates
description: Design and review continuous integration and delivery pipelines with build, test, security, artifact, approval, deployment, observability, and rollback gates. Use when creating or hardening release automation across application stacks.
---

# CI CD Release Gates

## Objective

Make releases repeatable, least-privileged, traceable, and recoverable.

## Workflow

1. Inspect the repository, environments, branch strategy, deployment targets, existing automation, secrets model, and release authority.
2. Define required gates for linting, unit tests, integration tests, browser tests, security scans, database checks, and builds.
3. Produce immutable versioned artifacts once, verify checksums or attestations, and promote the same artifact between environments.
4. Use least-privilege identities, protected environments, scoped secrets, concurrency controls, and explicit production approvals.
5. Plan migrations, maintenance behavior, feature flags, health checks, smoke tests, monitoring, and automatic or manual rollback.
6. Test pipeline failure paths and reruns. Ensure repeated execution is safe and partial failures are visible.
7. Document evidence retention, release ownership, recovery procedure, and the final go or no-go decision.

## Safety and authorization

- Do not deploy, rotate secrets, or alter protected environments without explicit authorization.
- Do not print secrets or pass them through command-line arguments when safer mechanisms exist.
- Do not allow a passing build to bypass required security, migration, backup, or rollback gates.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [GitHub Actions starter workflows](https://github.com/actions/starter-workflows)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
