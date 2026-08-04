---
name: ai-evaluation-red-team
description: Design and execute repeatable evaluations and authorized red-team tests for prompts, models, agents, tools, and RAG systems across quality, safety, security, reliability, cost, and latency. Use before releasing or materially changing AI behavior.
---

# AI Evaluation Red Team

## Objective

Replace subjective AI approval with versioned datasets, measurable assertions, adversarial scenarios, and explicit release thresholds.

## Workflow

1. Define the AI task, users, model and tool boundaries, failure impact, prohibited behavior, data sensitivity, and release criteria.
2. Build representative and edge-case datasets with expected outcomes, rubrics, deterministic assertions, and human review samples.
3. Measure task quality, groundedness, refusal behavior, format compliance, latency, cost, and consistency across candidate configurations.
4. Create authorized adversarial cases for prompt injection, data extraction, tool misuse, privilege escalation, unsafe output handling, and denial of service.
5. Separate model, prompt, retrieval, tool, policy, and infrastructure failures so remediation targets the correct layer.
6. Run evaluations with fixed versions and controlled randomness, then compare against an approved baseline.
7. Publish failed cases, severity, reproducibility, residual risk, and the release decision without exposing sensitive prompts or data.

## Safety and authorization

- Use synthetic or explicitly approved datasets and providers. Treat sending prompts to a provider as data publication.
- Do not probe third-party systems, accounts, or models beyond authorized terms and scope.
- Do not use evaluator-model scores as the only evidence for high-impact safety or compliance claims.

## Evidence and completion

- Record scope, versions, datasets, environments, assumptions, exclusions, and authorization.
- Preserve aggregate metrics and sanitized failure examples needed to reproduce conclusions.
- Separate measured results, evaluator judgments, human judgments, and inference.
- State release thresholds, residual risk, and the first remaining corrective action.

## Sources

- [Promptfoo](https://github.com/promptfoo/promptfoo)
- [NVIDIA Garak](https://github.com/NVIDIA/garak)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
