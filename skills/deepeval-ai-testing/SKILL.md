---
name: deepeval-ai-testing
description: Create maintainable AI regression tests with DeepEval, versioned datasets, task-appropriate metrics, pytest integration, traces, thresholds, and failure analysis. Use when an AI application needs repeatable local or CI evaluation.
---

# DeepEval AI Testing

## Objective

Turn important AI behavior into reviewable tests that can detect regressions across prompts, models, retrieval, and agents.

## Workflow

1. Identify the target component, expected inputs and outputs, provider boundaries, test environment, and acceptable evaluation cost.
2. Build or reuse a versioned dataset containing representative, boundary, multilingual, malformed, and adversarial cases.
3. Choose the smallest set of metrics that reflect the task, such as correctness, relevance, faithfulness, tool accuracy, or safety.
4. Implement local tests with explicit thresholds and deterministic assertions where possible. Isolate network-dependent tests.
5. Instrument traces only with approved fields and redact prompts, retrieval context, credentials, and personal data as required.
6. Run a baseline, inspect individual failures, calibrate thresholds with human judgment, and prevent score-only tuning.
7. Add CI execution, cost controls, result retention, and a documented process for accepting intentional behavior changes.

## Safety and authorization

- Do not run hosted reporting or telemetry without approval of its data flow, retention, account, and access scope.
- Keep provider keys in approved secret storage and never in test files or evaluation datasets.
- Pin tool and model versions for comparisons and disclose non-determinism.

## Evidence and completion

- Record scope, versions, datasets, environments, assumptions, exclusions, and authorization.
- Preserve aggregate metrics and sanitized failure examples needed to reproduce conclusions.
- Separate measured results, evaluator judgments, human judgments, and inference.
- State release thresholds, residual risk, and the first remaining corrective action.

## Sources

- [DeepEval](https://github.com/confident-ai/deepeval)
- [Official DeepEval skills](https://github.com/confident-ai/deepeval/tree/main/skills)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
