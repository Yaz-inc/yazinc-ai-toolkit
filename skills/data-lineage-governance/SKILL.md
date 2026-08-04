---
name: data-lineage-governance
description: Document and operate data lineage, cataloging, ownership, classifications, retention, quality, access, impact analysis, and governance for data and AI systems. Use when datasets have multiple producers, transformations, consumers, or regulatory and contractual obligations.
---

# Data Lineage Governance

## Objective

Make data origin, meaning, responsibility, movement, and downstream impact discoverable and trustworthy.

## Workflow

1. Inventory systems, datasets, models, reports, AI consumers, owners, stewards, environments, and criticality.
2. Capture source-to-target lineage at dataset and important field levels, including transformations, schedules, and code references.
3. Classify sensitivity, personal data, contractual restrictions, retention, deletion, residency, and approved purposes.
4. Link quality status, data contracts, incidents, service objectives, access controls, and business definitions.
5. Establish ownership workflows for access, changes, deprecation, deletion, and incident response.
6. Use lineage for impact analysis before schema, pipeline, metric, model, or source changes.
7. Verify metadata freshness and adoption, then retire stale or duplicate catalog entries through owner approval.

## Safety and authorization

- Do not copy data values into metadata catalogs when classification and pointers are sufficient.
- Do not infer legal obligations without qualified review and applicable context.
- Catalog access must not reveal sensitive schema or lineage to unauthorized users.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [OpenLineage](https://github.com/OpenLineage/OpenLineage)
- [DataHub](https://github.com/datahub-project/datahub)
- [OpenMetadata](https://github.com/open-metadata/OpenMetadata)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
