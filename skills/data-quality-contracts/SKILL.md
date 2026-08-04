---
name: data-quality-contracts
description: Define and enforce versioned data contracts for schemas, keys, nullability, domains, freshness, volume, ownership, compatibility, quality thresholds, and incident response. Use between data producers and consumers or before publishing analytical data.
---

# Data Quality Contracts

## Objective

Turn important data assumptions into owned, executable, and change-controlled agreements.

## Workflow

1. Identify producer, consumers, business purpose, grain, schema, delivery method, sensitivity, service objectives, and owners.
2. Define fields, types, required values, keys, relationships, accepted domains, units, timezones, and semantic meaning.
3. Add freshness, completeness, uniqueness, distribution, volume, referential, and business-rule expectations.
4. Classify backward-compatible, additive, deprecating, and breaking changes with version and notification rules.
5. Implement checks close to the producer and before consumer publication, with quarantine or stop behavior proportionate to risk.
6. Route failures to owners with affected datasets, evidence, severity, recovery, and consumer communication.
7. Review contracts on schema, business, source, or ownership changes and preserve historical versions.

## Safety and authorization

- Do not make every anomaly a pipeline outage. Align enforcement with business impact.
- Do not encode sensitive example values in contract files or public reports.
- A schema contract must include semantic and operational expectations, not types alone.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [Great Expectations](https://github.com/fivetran/great_expectations)
- [Data Contract CLI](https://github.com/datacontract/datacontract-cli)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
