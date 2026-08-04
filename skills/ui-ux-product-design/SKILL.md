---
name: ui-ux-product-design
description: Design, review, and improve usable product experiences from user goals through information architecture, flows, wireframes, visual systems, interaction states, responsive behavior, accessibility, prototypes, usability testing, and developer handoff. Use when creating or redesigning websites, dashboards, portals, mobile apps, forms, onboarding, navigation, design systems, or any user-facing workflow.
---

# UI/UX Product Design

## Objective

Create coherent product experiences that help real users complete important tasks accurately, efficiently, accessibly, and with appropriate confidence.

## Workflow

1. Inspect the product context before designing. Identify users, business outcome, supported platforms, current implementation, design system, brand assets, analytics, constraints, content, risk, and measurable success criteria.
2. Define the experience model. Document primary user groups, jobs, critical scenarios, task frequency, entry points, permissions, failure consequences, and the smallest useful scope. Separate verified evidence from assumptions.
3. Map information architecture and user flows. Cover the happy path plus empty, loading, partial, validation, permission, offline, timeout, destructive, recovery, and completion states. Remove unnecessary steps and repeated input.
4. Produce low-fidelity structure before visual polish. Establish content hierarchy, navigation, page regions, progressive disclosure, form grouping, action priority, responsive behavior, and meaningful system feedback.
5. Apply the visual system. Reuse approved tokens and components first. Define typography, spacing, color, elevation, shape, iconography, density, motion, and responsive rules only where the existing system is insufficient. Preserve brand consistency without sacrificing readability.
6. Design interaction and accessibility details. Specify keyboard order, visible focus, labels, instructions, errors, target sizes, contrast, reduced motion, zoom, screen-reader semantics, localization expansion, and non-color status cues. Target WCAG 2.2 Level AA unless the project requires a higher bar.
7. Prototype and evaluate critical tasks with representative content. Run heuristic review and usability testing proportional to risk. Record task completion, errors, hesitation, comprehension, accessibility barriers, and recovery behavior. Iterate on observed problems rather than preference alone.
8. Prepare implementation-ready handoff. Provide component mappings, tokens, responsive rules, interaction states, content, acceptance criteria, analytics events, open questions, and traceable design decisions. Review the implemented interface in a real browser or device before completion.

## Deliverables

Choose only what the task needs:

- Product brief with users, outcomes, constraints, assumptions, and success measures.
- Journey map, task flow, sitemap, navigation model, or service blueprint.
- Annotated wireframes or production-ready screen designs.
- Component inventory, design tokens, variants, and interaction-state matrix.
- Content hierarchy, labels, microcopy, validation, empty states, and recovery messages.
- Responsive and accessibility specifications.
- Prototype, usability test plan, findings, and prioritized revisions.
- Developer handoff with acceptance criteria and implementation review notes.

## Decision rules

- Prefer evidence from users, support cases, analytics, and observed behavior over stakeholder preference.
- Preserve established platform conventions when they reduce learning cost and errors.
- Reuse existing components before introducing variants. Add a component only when a recurring product need justifies its maintenance cost.
- Keep the primary action visually and semantically clear. Distinguish secondary, destructive, unavailable, and in-progress actions.
- Do not hide essential information behind hover, color alone, unexplained icons, or gestures without alternatives.
- Do not use placeholder content to approve layouts when real content length, data density, errors, or localization could change the design.
- Treat authentication, payments, personal data, destructive actions, and system-of-record workflows as high-risk experiences requiring stronger confirmation, recovery, and testing.

## Evidence and completion

Do not declare the design ready because screens look polished. Completion requires:

- Critical user flows and failure states are documented.
- Responsive behavior is defined at content-driven breakpoints.
- Keyboard, focus, contrast, labels, errors, zoom, and reduced motion are verified.
- Representative content and realistic data density have been tested.
- Major findings have an owner, priority, disposition, and retest result.
- The implemented experience has been reviewed in its actual runtime.
- Known assumptions, exclusions, and unresolved risks are explicit.

## Safety and authorization

- Do not expose customer data, credentials, analytics identifiers, or confidential research in prototypes or design artifacts.
- Do not publish, message users, alter production configuration, or run research with external participants without authorization.
- Obtain consent and minimize data when recording sessions or collecting personal information.
- Preserve client-approved brand and platform requirements unless a documented usability, accessibility, security, or compliance issue requires escalation.

## Sources

- [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C Designing for Web Accessibility](https://www.w3.org/WAI/tips/designing/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official references listed above
- **Commit:** Not applicable. Original workflow, no third-party code bundled.
- **Extracted:** 2026-08-04
