---
name: accessibility-audit
description: Audit web accessibility using automated checks and human keyboard, focus, zoom, reflow, semantic, form, contrast, authentication, and assistive-technology workflows. Use for WCAG 2.2 Level AA quality targets and release verification.
---

# Accessibility Audit

## Objective

Find barriers that prevent people with disabilities from completing real tasks and verify practical remediation.

## Workflow

1. Define target pages, user journeys, components, browsers, assistive technologies, and applicable WCAG target.
2. Run automated checks as an initial signal and manually verify every reported issue.
3. Test keyboard-only operation, focus order, focus visibility, bypass mechanisms, dialogs, menus, and dynamic updates.
4. Inspect semantics, names, roles, states, headings, landmarks, labels, instructions, errors, and status messages.
5. Test contrast, text resizing, zoom, responsive reflow, orientation, motion, timing, and accessible authentication.
6. Exercise critical journeys with representative screen-reader checks where risk warrants it.
7. Report the affected user, success criterion, reproduction steps, remediation, evidence, and retest result.

## Safety and authorization

- Do not claim conformance from automated scanning alone.
- Do not remove functionality as a shortcut for accessibility unless the product owner approves an equivalent accessible path.
- Avoid collecting assistive-technology recordings or personal data beyond the authorized evidence scope.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [axe-core](https://github.com/dequelabs/axe-core)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
