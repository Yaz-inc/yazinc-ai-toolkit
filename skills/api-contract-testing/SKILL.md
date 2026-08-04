---
name: api-contract-testing
description: Validate REST and HTTP APIs against OpenAPI contracts, authorization rules, data invariants, malformed inputs, error responses, pagination, concurrency, and backward compatibility. Use for API audits, automated contract tests, and pre-release verification.
---

# API Contract Testing

## Objective

Prove that documented API behavior, implementation behavior, and security boundaries agree.

## Workflow

1. Locate the canonical OpenAPI or API specification and confirm its environment, version, base URL, authentication scheme, and ownership.
2. Inventory operations, roles, schemas, status codes, pagination, filters, rate limits, idempotency rules, and external side effects.
3. Validate examples and schemas before generating tests. Flag undocumented fields or operations rather than normalizing them silently.
4. Test valid, boundary, malformed, missing, duplicate, and unauthorized inputs. Include object-level and tenant-level authorization cases.
5. Verify response bodies, headers, status codes, error consistency, data persistence, idempotency, and retry behavior.
6. Run property-based contract tests in an isolated environment with strict request limits and safe test data.
7. Publish reproducible requests, sanitized responses, specification gaps, and a release verdict.

## Safety and authorization

- Default to non-production environments and read-only operations until mutation is authorized.
- Never place API keys, bearer tokens, customer payloads, or credential-bearing URLs in fixtures or reports.
- Treat generated tests as untrusted input and cap request volume, recursion, payload size, and execution time.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Schemathesis](https://github.com/schemathesis/schemathesis)
- [OWASP API Security](https://github.com/OWASP/API-Security)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
