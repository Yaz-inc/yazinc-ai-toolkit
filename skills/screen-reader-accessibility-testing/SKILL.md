---
name: screen-reader-accessibility-testing
description: Test websites and applications through screen readers, keyboard-only navigation, semantic inspection, and assistive-technology behavior. Use for NVDA, JAWS, VoiceOver, TalkBack, Narrator, machine-reader compatibility, accessible names and roles, live regions, focus management, forms, dialogs, data tables, dynamic updates, or WCAG 2.2 release evidence.
---

# Screen Reader Accessibility Testing

## Objective

Verify that people using screen readers or keyboard-only navigation can understand, operate, and recover from critical product journeys without relying on visual presentation.

## Test matrix

Select combinations proportionate to supported users and risk:

- Windows: NVDA with Firefox or Chrome. Add JAWS with Chrome or Edge when required.
- macOS and iOS: VoiceOver with Safari.
- Android: TalkBack with Chrome.
- Windows built-in coverage: Narrator with Edge when it is a supported combination.

Record assistive-technology, browser, operating-system, and application versions. Do not generalize one combination's result to every platform.

## Workflow

1. Define critical journeys, supported combinations, expected outcomes, test accounts, data, exclusions, and WCAG 2.2 Level AA target.
2. Test keyboard-only operation first. Verify logical order, visible focus, skip mechanisms, traps, menus, dialogs, popovers, grids, shortcuts, and recovery.
3. Navigate by headings, landmarks, links, controls, form fields, tables, and other relevant rotor or element lists. Verify structure and discoverability.
4. Check every control's accessible name, role, state, value, description, instructions, and error association. Confirm visual labels match spoken labels.
5. Exercise forms, validation, authentication, search, filters, sorting, pagination, uploads, notifications, destructive actions, and completion feedback.
6. Verify focus placement and announcement after route changes, modal open or close, validation, asynchronous loading, saved changes, inserted content, and errors.
7. Inspect semantic HTML and the accessibility tree to diagnose issues. Use ARIA only when native semantics cannot provide the required behavior.
8. Retest fixes with the same assistive-technology combinations and journey data.

## Reporting

For every finding, record:

- Affected user and practical impact.
- Page, component, journey, and test combination.
- Exact reproduction steps and observed spoken or keyboard behavior.
- Expected behavior and applicable WCAG criterion when known.
- Recommended semantic or interaction fix.
- Evidence and retest status.

## Quality rules

- Do not claim screen-reader compatibility from an automated scanner or accessibility-tree inspection alone.
- Do not require users to memorize undocumented shortcuts.
- Do not add redundant ARIA that conflicts with native HTML.
- Ensure status and error information is available without moving focus unnecessarily.
- Verify data-table headers, captions, sorting state, row context, and interactive controls with realistic data.

## Safety and authorization

- Use non-production accounts and non-sensitive test data unless production testing is explicitly authorized.
- Do not record a user's assistive-technology session or disability-related information without informed approval and minimum necessary collection.
- Do not purchase commercial assistive technology or publish conformance claims without authorization.

## Completion evidence

- Test matrix and critical journey coverage.
- Keyboard-only and screen-reader findings with reproducible evidence.
- Retest results for resolved barriers.
- Explicit residual risks, unsupported combinations, and release recommendation.

## Sources

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [NV Access NVDA](https://www.nvaccess.org/)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official references listed above. No third-party code bundled.
- **Commit:** Not applicable.
- **Extracted:** 2026-08-04
