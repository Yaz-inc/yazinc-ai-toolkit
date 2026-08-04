# Test Type

Version-Timestamp: 2026-08-04 17:36:47 +05:00

Select test types from the app profile and stage depth. Document included, excluded, passed, failed, and not-tested areas.

| Test type | Core questions |
|---|---|
| Smoke | Does the app boot, authenticate, route, and perform the primary action? |
| Human exploratory | Does the workflow make sense and reach a stable result without hidden recovery steps? |
| Functional | Does each requirement produce the expected result? |
| CRUD and data integrity | Do values and relationships persist exactly once across create, read, edit, delete/restore? |
| Search, sort, filters | Do exact, combined, empty, date, pagination, and clear states return correct records? |
| Export/import | Does file content match the requested visible scope and reject unsafe input? |
| RBAC and tenant isolation | Can each role access only allowed routes, objects, actions, fields, files, and counts? |
| Security review | Are authentication, authorization, validation, secrets, dependencies, storage, and unsafe defaults controlled? |
| API/integration | Are contracts, auth, retries, timeouts, idempotency, errors, and reconciliation correct? |
| Communication | Are email, SMS, chat, notifications, links, recipients, retries, and delivery evidence correct? |
| Reports/analytics | Are definitions, date boundaries, timezones, denominators, filters, and exports reconcilable? |
| UI/UX | Are titles, feedback, responsive layout, empty/loading/error states, and destructive actions understandable? |
| Accessibility | Do keyboard, focus, semantics, contrast, reflow, errors, and authentication target WCAG 2.2 AA? |
| Compatibility | Do supported browsers, devices, OS versions, and upgrade paths work? |
| Performance/load | Do agreed volumes, response targets, concurrency, and background processing remain stable? |
| Reliability/recovery | Are retries, duplicate prevention, queues, backups, soft deletion, restore, and rollback proven? |
| Regression | Do fixes preserve nearby and core workflows? |
| Deployment readiness | Are URL, TLS, timezone, cookies, logs, mail, queues, scheduler, storage, backup, and monitoring ready? |

Use NIST SSDF 1.1 as the lifecycle baseline, OWASP ASVS 5.0 for applicable web verification, current OWASP API guidance for APIs, current OWASP AI guidance for AI features, and WCAG 2.2 Level AA as the user-facing accessibility target. State evaluated controls and gaps. Do not claim formal compliance without evidence and qualified review where required.
