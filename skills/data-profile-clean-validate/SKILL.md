---
name: data-profile-clean-validate
description: Profile, clean, normalize, and validate structured or semi-structured datasets with reproducible transformations, schema checks, anomaly evidence, and before-and-after reconciliation. Use for CSV, spreadsheet, Parquet, JSON, dataframe, and extracted database data.
---

# Data Profile Clean Validate

## Objective

Improve data quality without silently changing meaning, losing records, or hiding uncertainty.

## Workflow

1. Copy or snapshot the authorized input and record its source, format, size, encoding, checksum, owner, and expected grain.
2. Profile schema, types, nulls, uniqueness, ranges, distributions, categories, dates, identifiers, duplicates, and cross-field rules.
3. Separate confirmed errors from unusual but valid values. Define cleaning rules with the data owner when meaning is ambiguous.
4. Apply deterministic transformations for parsing, trimming, normalization, mappings, deduplication, missing values, and invalid records.
5. Preserve raw values or a transformation log so every changed or rejected record is traceable.
6. Validate the cleaned output against explicit schemas, business rules, referential rules, and aggregate reconciliation.
7. Publish quality metrics, exceptions, assumptions, transformation code, and a reversible output artifact.

## Safety and authorization

- Never overwrite the only source copy or silently discard records.
- Do not impute, merge, normalize, or deduplicate identity fields without a documented rule and confidence threshold.
- Mask or minimize personal data in profiles, samples, charts, and reports.

## Evidence and completion

- Record source, owner, scope, environment, versions, grain, row counts, assumptions, exclusions, and authorization.
- Preserve reproducible queries or transformations without credentials or unnecessary confidential values.
- Reconcile inputs, outputs, rejected records, and high-value aggregates.
- Separate measured facts from inference and identify the first remaining action.

## Sources

- [Pandas](https://github.com/pandas-dev/pandas)
- [Polars](https://github.com/pola-rs/polars)
- [Pandera](https://github.com/unionai-oss/pandera)
- [OpenRefine](https://github.com/OpenRefine/OpenRefine)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above where applicable
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
