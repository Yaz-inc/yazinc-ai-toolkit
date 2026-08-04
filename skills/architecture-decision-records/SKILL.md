---
name: architecture-decision-records
description: Create and maintain concise architecture decision records that capture context, options, decision drivers, consequences, security, operations, reversibility, and follow-up evidence. Use for material technical choices and changes with lasting cost.
---

# Architecture Decision Records

## Objective

Preserve why a decision was made so future teams can evaluate, operate, or replace it intelligently.

## Workflow

1. State the problem, affected users, constraints, current state, decision deadline, and success measures.
2. Identify realistic options, including keeping the current design, and document assumptions requiring verification.
3. Compare maintainability, security, reliability, compliance, accessibility, performance, team fit, cost, and exit risk.
4. Choose the smallest maintainable option that meets the requirement and explain why alternatives were rejected.
5. Record consequences, operational responsibilities, migration, rollback, observability, testing, and residual risk.
6. Assign status, owner, date, superseded records, review triggers, and implementation follow-ups.
7. Update status when evidence changes. Do not rewrite the historical reasoning silently.

## Safety and authorization

- Do not present preference as fact or hide material tradeoffs.
- Do not include credentials, confidential customer details, or volatile implementation logs.
- An ADR records a decision. It does not replace implementation plans, threat models, or runbooks.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Architecture Decision Records](https://github.com/architecture-decision-record/architecture-decision-record)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
