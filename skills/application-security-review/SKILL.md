---
name: application-security-review
description: Perform evidence-based security reviews of web applications and APIs using risk-appropriate threat modeling, OWASP ASVS and API guidance, static analysis, authorization testing, and remediation verification. Use before release or after material security changes.
---

# Application Security Review

## Objective

Identify credible exploitable weaknesses and verify practical fixes without claiming certification or penetration testing beyond the performed scope.

## Workflow

1. Define scope, data sensitivity, exposure, roles, integrations, exclusions, and authorization for active testing.
2. Build a lightweight threat model covering trust boundaries, assets, entry points, privilege changes, and likely abuse cases.
3. Review authentication, sessions, authorization, tenant isolation, input validation, output encoding, file handling, secrets, logging, cryptography, and error handling.
4. Run framework-aware static analysis and dependency checks. Confirm findings manually before reporting them as defects.
5. Test high-risk controls with safe requests, least privilege, rate limits, and non-production data.
6. Rank findings by impact, exploitability, affected users, and evidence. Separate blockers from hardening recommendations.
7. Retest remediations and document residual risk, untested areas, and specialist review needs.

## Safety and authorization

- Obtain explicit authorization before intrusive scanning, exploitation, privilege escalation, or production testing.
- Do not expose proof-of-concept secrets, personal data, or weaponized exploit detail beyond the authorized audience.
- Do not claim compliance, certification, or a complete penetration test without defined evidence and qualified scope.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [OWASP ASVS](https://github.com/OWASP/ASVS)
- [OWASP API Security](https://github.com/OWASP/API-Security)
- [Semgrep](https://github.com/semgrep/semgrep)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
