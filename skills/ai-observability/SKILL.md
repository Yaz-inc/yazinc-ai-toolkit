---
name: ai-observability
description: Design privacy-aware observability for AI applications across prompts, models, retrieval, agents, tools, quality, latency, cost, tokens, errors, traces, feedback, and evaluation results. Use for production readiness and AI incident diagnosis.
---

# AI Observability

## Objective

Make AI behavior diagnosable and measurable without turning telemetry into a sensitive-data store.

## Workflow

1. Map AI components, providers, prompts, datasets, tools, users, trust boundaries, objectives, and material failure modes.
2. Define trace and span structure for requests, model calls, retrieval, reranking, tools, guardrails, and final output.
3. Capture versions, latency, tokens, cost, status, structured errors, quality signals, and correlation IDs.
4. Apply field-level allowlists, redaction, sampling, retention, access control, and regional requirements before collecting content.
5. Build dashboards and alerts around user impact, quality regressions, provider failure, cost anomalies, and unsafe tool behavior.
6. Connect production signals to versioned evaluation cases and incident workflows without silently training on user data.
7. Test telemetry failure, provider outage, partial traces, and redaction effectiveness, then document evidence and residual blind spots.

## Safety and authorization

- Do not collect prompts, completions, retrieval context, or user identifiers by default. Justify every content field.
- Review hosted observability data flows, subprocessors, retention, and access before enabling export.
- Observability must degrade safely and must not block the user journey unless the security policy requires it.

## Evidence and completion

- Record scope, versions, datasets, environments, assumptions, exclusions, and authorization.
- Preserve aggregate metrics and sanitized failure examples needed to reproduce conclusions.
- Separate measured results, evaluator judgments, human judgments, and inference.
- State release thresholds, residual risk, and the first remaining corrective action.

## Sources

- [Langfuse](https://github.com/langfuse/langfuse)
- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
