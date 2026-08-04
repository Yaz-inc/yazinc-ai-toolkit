---
name: test-software-app
description: Profile, plan, execute, remediate, and report human-centered software application testing and pre-go-live audits. Use when Codex must test a web app, portal, API-backed product, internal system, SaaS product, mobile/PWA experience, or desktop application across CRUD data behavior, roles and tenant isolation, search, sort, filters, exports, email, chat, reports, integrations, security, regression, and deployment readiness. Supports selectable 3-stage, 4-stage, 5-stage, and 6-stage audit depth, including audit-only engagements, authorized fixes, database exclusions, QA record cleanup, and evidence-backed client certificates.
---

# Software App Testing and Audit

Version-Timestamp: 2026-08-04 17:36:47 +05:00

## Operating contract

1. Inspect the repository, running environment, available skills, browser controls, commands, connectors, and test facilities before choosing a method.
2. Announce the capabilities selected for the engagement. Use browser control for human workflow testing and `/review` for repeatable local code review when appropriate.
3. Confirm the authorization boundary before mutation:
   - `audit-only`: inspect and test, but do not change source code.
   - `audit-and-fix`: apply scoped fixes, then retest and record before/after evidence.
   - `deployment`: change production or external infrastructure only with explicit authorization.
4. Record database scope separately. Respect exclusions for migrations, schema, direct SQL, production data, or destructive cleanup.
5. Treat credentials, customer records, technical architecture, screenshots, exports, and audit evidence as confidential. Never place real secrets in reports, fixtures, prompts, logs, commits, or certificates.
6. Apply the four review pillars in this order: security, stability, reliability, compliance, then general correctness.
7. Do not claim that an app is secure, compliant, certified, accessible, or production-ready without defined criteria and supporting evidence.

## Profile the application

Complete the fields in [test-profile.md](references/test-profile.md). Discover answers from the app and repository before asking the user. Ask only for missing decisions that materially change scope, test depth, or risk.

Load the relevant references:

- App classification: [type-of-app.md](references/type-of-app.md)
- Server architecture: [back-end.md](references/back-end.md)
- Data layer: [database.md](references/database.md)
- Test coverage: [test-type.md](references/test-type.md)
- Stage depth: [stages.md](references/stages.md)
- Evidence and verdicts: [evidence-reporting.md](references/evidence-reporting.md)

## Select the stage depth

Choose the smallest depth that matches the blast radius. Never compress a production, customer-facing, multi-tenant, authentication, payment, personal-data, or system-of-record application below 5 stages without documenting the coverage gap.

| Depth | Use for | Output |
|---|---|---|
| 3 stages | Low-risk prototype or narrow feature check | Discover, test, report |
| 4 stages | Internal app or bounded release | Discover, prepare, test, report |
| 5 stages | Customer-facing release | Scope, baseline, workflows, risk/regression, release report |
| 6 stages | Pre-go-live, multi-role, sensitive, or client audit | Full discovery, controlled QA data, role journeys, integrations/security, regression/operations, evidence/certificate |

Read [stages.md](references/stages.md) for required gates and deliverables at each depth.

## Build one connected QA data chain

Prefer a single traceable record family over unrelated samples. Use a unique prefix such as `QA_AUDIT_YYYYMMDD` and create records in dependency order, for example:

1. Manufacturer and category
2. Model
3. Customer and customer portal account
4. Vendor and vendor portal account
5. Location
6. Asset linked to the customer, vendor, model, category, and location
7. Ticket linked to the asset
8. Replies, attachments, chat messages, notifications, and lifecycle events

Reuse these records across every role and workflow. Verify exact values after create, edit, reload, search, filter, export, delete, restore, and portal display. Ask for customer or vendor credentials only when the application cannot safely create controlled QA accounts.

If the client has a database backup and authorizes test mutations, preserve the QA record list for later deletion or restore. Do not run destructive cleanup automatically.

## Execute human workflow testing

Test what a real user sees and believes, not only HTTP status codes.

### Data behavior

- Verify valid create, read, update, archive/delete, restore, and duplicate prevention.
- Verify Unicode, punctuation, long values, blanks, boundary values, validation messages, and relationship persistence.
- Confirm the saved record appears exactly once and the UI reaches a clear stable state.
- Watch for stale modals, stale tables, misleading Add/Edit titles, repeated submissions, and success messages shown before persistence.

### Search, sort, filter, and export

- Test exact, partial, case, Unicode, blank, no-result, and clear-filter behavior.
- Test ascending/descending, newest/oldest, date boundaries, pagination, and server-side redraws.
- Combine filters and verify counts and rows after each processing cycle.
- Verify exported rows and fields match the visible filter scope. Confirm unrelated records are absent.

### Roles and tenant isolation

- Test login landing routes and direct URL access for every role.
- Verify portal users never receive staff dashboards, global counts, internal assignee lists, or unrelated tenant data.
- Test object-level authorization for details, attachments, exports, notes, replies, status changes, and guessed IDs.
- Confirm role labels, flags, middleware, queries, and server validation agree.

### Communication and time

- Verify email recipient, subject, reference code, linked record, body content, button URL, and actual inbox delivery.
- Preserve delivery screenshots as evidence when provided.
- Test chat polling, optimistic rendering, duplicate prevention, retry behavior, and failure state.
- Reconcile app, database, report, and email timestamps. Require an explicit configured timezone and reject negative duration metrics.

### Operations

- Inspect scheduler definitions, queue behavior, logging, backups, TLS, environment configuration, and cleanup commands.
- Use dry runs for cleanup and stateful maintenance where available.
- Distinguish application readiness from host readiness. A valid scheduled command is not proof that the operating-system scheduler runs it.

## Inspect and fix code only when authorized

For `audit-only`, diagnose and report without editing.

For `audit-and-fix`:

1. Trace the smallest credible cause.
2. Preserve unrelated work and existing configuration.
3. Add server-side authorization and validation even when the UI already restricts choices.
4. Prefer allow-lists, scoped queries, framework responses, idempotent state transitions, and explicit failure handling.
5. Avoid schema or migration changes when excluded.
6. Add focused tests for reusable business rules and security boundaries.
7. Run syntax, tests, route/build/view checks, and relevant browser retests before closing the finding.

## Maintain a canonical evidence register

Use one source of truth. Each finding must contain:

- Record ID and date
- Stage and test type
- Severity and status
- URL or surface
- Role
- Scenario
- Before finding
- Expected result
- Fix or verification
- User/business impact
- Reproduction evidence
- Files changed
- QA records used
- Retest result
- Owner and next action

Never overwrite the original finding. Append the fix and retest result so another agent can reconstruct the history.

## Issue a truthful verdict

Use the verdict rules in [evidence-reporting.md](references/evidence-reporting.md).

- `Pass`: all defined release gates pass and no blocking risk remains.
- `Conditional pass`: application testing passes, but a disclosed deployment or external gate remains.
- `Fail`: a critical/high release blocker remains or evidence is insufficient for the requested claim.

A model stamp may identify the AI-assisted auditor and evidence date. It must not imply statutory accreditation, third-party penetration testing, legal compliance, or independent certification beyond the performed scope.

## Finish the engagement

1. Reconcile open, passed, and deferred findings.
2. Confirm no accidental source, database, credential, or environment mutation remains.
3. Preserve or remove QA records according to client instruction and backup plan.
4. Provide the canonical evidence files and a prioritized release checklist.
5. Name the first remaining action that unlocks the next phase.

## Origin

- **Project:** CD Asset Manager pre-go-live audit
- **Repo:** Local working copy, repository metadata unavailable
- **Commit:** Unavailable
- **Extracted:** 2026-08-04
- **Generalized:** Removed credentials, client-specific data, record identifiers, URLs, and application-specific business names. Preserved the reusable audit method and evidence model.
