# Test Profile

Version-Timestamp: 2026-08-04 17:36:47 +05:00

Complete this profile from available evidence. Ask only for fields that cannot be discovered safely and materially change the plan.

```markdown
# Application Test Profile

- Application name:
- Version/build:
- Type of app:
- Business outcome:
- Primary users:
- User roles and tenants:
- Back end/framework/version:
- Front end:
- Database and mode:
- Database/migration scope:
- Hosting/deployment model:
- Authentication method:
- Integrations and communication channels:
- Data sensitivity:
- Production or local URL:
- Audit authority: audit-only | audit-and-fix | deployment
- Test type(s):
- Stage depth: 3 | 4 | 5 | 6
- Backup/rollback evidence:
- QA record prefix:
- Controlled inbox/phone destination:
- Success criteria:
- Explicit exclusions:
- Evidence outputs:
- QA cleanup/restore decision:
```

Recommended default for a customer-facing Laravel/MySQL multi-role pre-go-live audit:

- Stage depth: 6
- Database mode: restored backup with application-level writes
- Migrations/schema: excluded unless explicitly authorized
- Test types: human exploratory, functional, CRUD/data integrity, RBAC/tenant isolation, search/sort/filter/export, communication, reports, regression, deployment readiness
- Evidence: canonical CSV plus readable workbook/report and conditional certificate when required
