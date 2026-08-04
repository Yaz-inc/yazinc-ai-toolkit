# Stages

Version-Timestamp: 2026-08-04 17:36:47 +05:00

## 3-stage audit

Use for prototypes, demos, one feature, or low-risk internal tools.

1. **Discover:** identify app type, stack, primary user, success path, environment, and mutation boundary.
2. **Test:** run smoke plus the requested functional/human workflow and capture failures.
3. **Report:** provide evidence, severity, verdict, limitations, and next action.

Gate: do not label a production app ready from a 3-stage audit. State the limited scope.

## 4-stage audit

Use for internal applications and bounded releases.

1. **Discover:** profile app, backend, database, roles, integrations, and risks.
2. **Prepare:** verify backup/test environment and create controlled QA records.
3. **Test:** run core CRUD, roles, filters, error states, and selected integrations.
4. **Report:** reconcile findings, retests, cleanup, and release conditions.

Gate: include at least one non-admin role and one recovery test.

## 5-stage audit

Use for normal customer-facing releases.

1. **Scope:** define requirements, roles, data boundaries, standards, exclusions, and success criteria.
2. **Baseline:** confirm app boot, backup, logs, test accounts, environment, and current defects.
3. **Workflows:** create a connected QA chain and test CRUD, search, sort, filters, export, and role journeys.
4. **Risk and regression:** inspect authorization, integrations, accessibility, reliability, code causes, fixes, and neighboring behavior.
5. **Release report:** issue a pass/conditional pass/fail verdict, cleanup plan, evidence register, and prioritized deployment checklist.

Gate: no critical finding may remain open for a pass or conditional pass.

## 6-stage audit

Use for pre-go-live, client delivery, multi-tenant, authentication, sensitive data, payment, system-of-record, or high-blast-radius applications.

1. **Engagement and discovery**
   - Confirm authorization, audit-only versus fix scope, app type, stack, data classification, users, integrations, standards, and exclusions.
2. **Controlled baseline and QA data**
   - Verify backup/rollback, capture environment health, create named test accounts, and build one connected QA record chain.
3. **Human business journeys**
   - Test every role through creation, read/write, linked records, search, sort, filters, exports, communication, delete/restore, and usability states.
4. **Security, integration, and data assurance**
   - Test route/object/field authorization, tenant isolation, attachments, reports, timezones, email/chat, APIs, retries, integrity rules, and sensitive data handling.
5. **Remediation, regression, and operations**
   - Apply only authorized fixes, run focused and broad regression, verify logs/build/tests, and validate deployment URL, TLS, sessions, mail, queues, scheduler, backups, and monitoring.
6. **Evidence, cleanup, and client decision**
   - Reconcile the canonical register, retain or remove QA records by instruction, issue the verdict, disclose limitations, produce report/certificate artifacts, and identify the first remaining action.

Release gates:

- Critical open: fail.
- High application blocker open: fail.
- Application passes but external host action remains: conditional pass.
- Missing evidence for a claimed control: mark not tested or insufficient evidence.
- Database/migrations excluded: state the exclusion in the report and certificate.
