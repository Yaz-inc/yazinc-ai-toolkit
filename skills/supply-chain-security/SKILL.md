---
name: supply-chain-security
description: Assess software supply-chain risk across source repositories, secrets, dependencies, lockfiles, containers, infrastructure, SBOMs, licenses, and release artifacts. Use for dependency hygiene, pre-release gates, incident response, or third-party component review.
---

# Supply Chain Security

## Objective

Detect material dependency and artifact risk while producing a prioritized, reproducible remediation plan.

## Workflow

1. Inventory package managers, lockfiles, container images, generated artifacts, build services, registries, and third-party components.
2. Scan tracked content and history for secrets using redacted findings. Confirm whether exposed credentials require rotation.
3. Generate or inspect an SBOM and map direct and transitive dependencies to known vulnerabilities.
4. Scan containers, infrastructure definitions, and repository configuration for vulnerabilities and misconfigurations.
5. Evaluate exploitability, runtime reachability, maintenance, publisher trust, license obligations, and available fixed versions.
6. Apply upgrades in small reversible groups and run tests, builds, and deployment checks after each group.
7. Record accepted risk, compensating controls, owners, deadlines, and continuous scanning gates.

## Safety and authorization

- Do not upload proprietary repositories, lockfiles, SBOMs, or findings to unapproved services.
- Do not auto-upgrade major versions or production images without compatibility review and rollback.
- Treat scanner output as evidence to verify, not proof that every reported issue is exploitable.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Gitleaks](https://github.com/gitleaks/gitleaks)
- [OSV-Scanner](https://github.com/google/osv-scanner)
- [Trivy](https://github.com/aquasecurity/trivy)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
