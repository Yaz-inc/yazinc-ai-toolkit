---
name: observability-incident-response
description: Design and assess application observability and incident response across logs, metrics, traces, correlation, alerting, runbooks, recovery, and post-incident learning. Use for production readiness, reliability improvement, or active incident diagnosis.
---

# Observability Incident Response

## Objective

Make important failures detectable, diagnosable, recoverable, and learnable without leaking sensitive data.

## Workflow

1. Map critical services, dependencies, user journeys, objectives, failure modes, owners, and escalation paths.
2. Define structured logs, metrics, traces, correlation IDs, health checks, and business signals around those risks.
3. Set service objectives and alerts that indicate user impact, not only infrastructure noise.
4. Ensure telemetry captures enough context to diagnose failures while redacting credentials and personal data.
5. Create runbooks with triage, containment, communication, recovery, verification, and rollback steps.
6. Exercise representative failures and confirm alerts, dashboards, ownership, and recovery evidence.
7. After incidents, build a factual timeline, contributing factors, corrective actions, owners, and follow-up verification.

## Safety and authorization

- Do not log secrets, full tokens, sensitive payloads, or unnecessary personal data.
- Do not change production state during diagnosis without authorization, backup, and a rollback path.
- Avoid blame-focused reporting. Record system conditions, decisions, evidence, and preventive actions.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
