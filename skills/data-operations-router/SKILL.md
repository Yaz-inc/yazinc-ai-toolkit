---
name: data-operations-router
description: Classify data requests by objective, source, scale, sensitivity, mutation risk, and evidence needs, then route work to the correct specialized toolkit skill. Use before cleaning, querying, migrating, validating, analyzing, or operating unfamiliar data.
---

# Data Operations Router

## Objective

Choose the smallest safe workflow and toolset before touching data.

## Workflow

1. Clarify the business question, decision, deliverable, audience, success criteria, deadline, and authorization.
2. Inventory sources, formats, engines, schemas, owners, sizes, update frequency, environments, and data sensitivity without exposing values.
3. Classify the task as profiling and cleaning, SQL, NoSQL, reconciliation, analytics modeling, big-data processing, orchestration, quality contracts, lineage, or reporting.
4. Assess whether the work is read-only, reversible, stateful, production-impacting, or externally published.
5. Select the specialized skill, local tool, sampling strategy, validation method, and rollback requirement.
6. Define evidence, privacy controls, resource limits, and stop conditions before execution.
7. Record the routing decision and hand off only the minimum required context.

## Safety and authorization

- Default to metadata inspection and read-only sampling.
- Do not move confidential data between systems or providers as part of routing.
- Do not use a distributed platform when a local database or dataframe can complete the work safely.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- Toolkit-authored decision workflow with no external runtime dependency.

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
