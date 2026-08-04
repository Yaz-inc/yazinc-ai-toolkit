# Evidence and Reporting

Version-Timestamp: 2026-08-04 17:36:47 +05:00

## Severity

- **Critical:** credible cross-tenant disclosure, authentication bypass, destructive data loss, secret exposure, payment compromise, or total core-flow failure.
- **High:** major authorization, integrity, export, workflow, or operational defect likely to affect users or release safety.
- **Medium:** material UX, validation, calculation, accessibility, or reliability issue with a workaround or limited impact.
- **Low:** bounded defect with minor impact.
- **Info:** verified behavior, evidence, or improvement recommendation.

Severity is impact plus likelihood. Do not inflate severity to make the audit appear stronger.

## Finding structure

Write findings so another tester can reproduce them without chat history:

```markdown
ID:
Severity:
Status:
Role:
Surface/URL:
Scenario:
Before finding:
Expected result:
Business/user impact:
Evidence:
Cause (if inspected):
Fix (if authorized):
Files changed:
QA records:
Retest result:
Owner/next action:
```

## Status

- Open
- In progress
- Ready for retest
- Partial pass
- Passed
- Deferred with accepted risk
- Not tested
- Insufficient evidence

## Evidence hierarchy

Prefer multiple independent signals for material findings:

1. Human-visible result or screenshot
2. Persisted application state after reload
3. Cross-role/consumer verification
4. Request/response, export, email, or log evidence
5. Code-level cause and automated test

Never include passwords, tokens, database credentials, private customer content, or unnecessary personal information.

## Verdict

### Pass

Use only when all defined release gates pass, no critical/high blocker remains, required production controls are verified, and evidence supports the scope.

### Conditional pass

Use when tested application behavior passes but a named external, deployment, client acceptance, or infrastructure condition remains. Put the condition beside the verdict, not in fine print.

### Fail

Use when a critical/high blocker remains, core data cannot be trusted, tenant isolation fails, rollback is unsafe, or evidence is too weak for the requested assurance.

## Client report or certificate

Include:

- Application name and tested version
- Version-Timestamp
- Certificate/report ID
- Audit date and timezone
- Test stage depth and scope
- Counts by status and severity
- Material risks resolved
- Open gates
- Explicit exclusions
- Evidence source and optional hash
- AI model/tool attribution when requested
- Client acceptance area when appropriate

Use `AI-assisted application audit` or `Audited with OpenAI Codex`. Add a statement that the artifact is not statutory accreditation unless a qualified certification body performed the relevant work.

Do not call a report independent if the same agent implemented fixes without clearly disclosing that it both remediated and retested them.
