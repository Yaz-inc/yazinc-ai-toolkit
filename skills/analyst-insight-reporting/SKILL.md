---
name: analyst-insight-reporting
description: Perform reproducible exploratory and decision-focused analysis, calculate business metrics, test assumptions, create accessible visualizations, and communicate findings with uncertainty and provenance. Use for analyst reports, dashboards, investigations, and executive insights.
---

# Analyst Insight Reporting

## Objective

Produce analysis that another reviewer can reproduce and that decision-makers can interpret without overstated certainty.

## Workflow

1. Define the decision, audience, questions, hypotheses, metric definitions, period, comparison, and material limitations.
2. Acquire only authorized data and record sources, extraction time, filters, grain, transformations, and quality status.
3. Profile and clean through a reproducible workflow while preserving raw inputs and exception evidence.
4. Calculate metrics with independent checks, appropriate denominators, confidence or uncertainty, and sensitivity analysis.
5. Choose charts that reveal the relationship honestly, use accessible labels and colors, and avoid distorted scales.
6. Separate observed facts, statistical results, assumptions, interpretations, and recommendations.
7. Deliver methods, definitions, sources, versioned artifacts, caveats, and the next decision or validation step.

## Safety and authorization

- Do not cherry-pick periods, segments, metrics, or charts to support a preferred conclusion.
- Do not expose personal or confidential records in notebooks, screenshots, exports, or prompts.
- Correlation, model output, and descriptive trends do not prove causation.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [JupyterLab](https://github.com/jupyterlab/jupyterlab)
- [Plotly](https://github.com/plotly/plotly.py)
- [Apache Superset](https://github.com/apache/superset)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
