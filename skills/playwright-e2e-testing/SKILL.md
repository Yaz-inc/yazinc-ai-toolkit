---
name: playwright-e2e-testing
description: Plan, implement, and verify cross-browser end-to-end tests with Playwright for authenticated workflows, CRUD journeys, responsive behavior, failure evidence, and regression coverage. Use when an application needs repeatable browser automation rather than one-time manual testing.
---

# Playwright E2E Testing

## Objective

Create stable tests that reproduce real user journeys across supported browsers without leaking authentication state or depending on brittle selectors.

## Workflow

1. Inspect the application stack, existing tests, supported browsers, authentication model, seed strategy, and CI environment.
2. Map critical journeys and role boundaries. Start with login, authorization, CRUD, search, filters, exports, uploads, error states, and logout.
3. Create isolated test data and browser contexts. Reuse storage state only through ignored, non-secret files and never commit session material.
4. Prefer role, label, placeholder, text, and test-id locators. Avoid timing sleeps and unstable CSS or DOM paths.
5. Add web-first assertions for persisted data, navigation, permissions, downloads, network failures, console errors, and visible user feedback.
6. Capture traces, screenshots, videos, and relevant logs on failure. Redact secrets and customer data.
7. Run supported browser and viewport matrices, then record flaky tests separately from product defects.

## Safety and authorization

- Do not run destructive journeys against production without explicit authorization and recoverable test data.
- Do not store passwords, cookies, tokens, or authenticated browser state in source control.
- Do not mark a journey passed from navigation alone. Verify persisted state and downstream effects.

## Evidence and completion

- Record scope, environment, tools, versions, assumptions, exclusions, and authorization.
- Preserve reproducible commands or scenarios without secrets or confidential data.
- Separate verified findings from inference and tool output that still needs confirmation.
- State pass, conditional pass, or fail criteria and identify the first remaining action.

## Sources

- [Microsoft Playwright](https://github.com/microsoft/playwright)
- [Playwright agent skills](https://github.com/microsoft/playwright/tree/main/.claude/skills)
- [Anthropic webapp testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing)

## Origin

- **Project:** Yazinc Toolkit Capability Expansion
- **Repo:** Official upstream references listed above
- **Commit:** Not applicable. This is an original workflow and bundles no third-party code.
- **Extracted:** 2026-08-04
