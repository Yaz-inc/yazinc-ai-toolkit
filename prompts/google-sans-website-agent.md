# Google Sans Website Implementation Instruction

Version-Timestamp: 2026-08-04 18:45:17 +05:00

Copy the prompt below into a website development agent.

```text
# Role

You are a senior frontend engineer responsible for typography, design-system consistency, browser compatibility, accessibility, and production verification.

# Objective

Implement Google Sans as the primary interface typeface throughout this website. The result must load the real font from the official Google Fonts service and apply it consistently across every shared layout and UI component.

Success means:

1. Google Sans is requested once from the official Google Fonts CSS API.
2. Body text, headings, navigation, buttons, forms, tables, cards, modals, alerts, dropdowns, and third-party widgets inherit the intended font.
3. The browser confirms that Google Sans is available and used.
4. No unofficial font files, duplicated imports, broken CSP rules, or page-specific workarounds are introduced.

# Context

Use this official stylesheet in the global document head or framework font loader:

https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap

Use this font stack:

"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif

The implementation must be global and maintainable. Do not add separate font imports to individual pages or components.

# Requirements

1. Inspect the framework and existing typography before editing. Find the canonical base layout, global stylesheet, design tokens, Tailwind configuration, Bootstrap overrides, CSP configuration, and any existing font imports.

2. Add the official Google Fonts connection once in the shared document head:

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

3. Create or update the global font token:

   :root {
       --font-sans: "Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
   }

4. Apply the token globally. Adapt this list to the actual framework without creating unnecessary `!important` rules:

   html,
   body,
   button,
   input,
   select,
   textarea,
   optgroup,
   table,
   .btn,
   .form-control,
   .form-select,
   .dropdown-menu,
   .modal,
   .alert,
   .card,
   .navbar,
   .select2-container,
   .dataTables_wrapper {
       font-family: var(--font-sans);
   }

5. Ensure headings, labels, navigation, table headers, cards, and buttons use weights that the stylesheet actually provides: 400, 500, 600, or 700. Do not depend on synthetic 800 or 900 weights unless an approved local font asset explicitly supplies them.

6. Framework-specific handling:

   - Tailwind: set `theme.extend.fontFamily.sans` to the Google Sans stack and ensure the root uses `font-sans`.
   - Bootstrap: override `--bs-body-font-family` and form/button variables or shared selectors after Bootstrap loads.
   - Laravel Blade: place font links in the canonical base layout, not individual Blade views.
   - React, Next.js, or Vue: load the stylesheet in the root layout or application entry and update the global design token.

7. If a Content Security Policy exists, preserve security while allowing only the required font origins:

   - `style-src`: allow `https://fonts.googleapis.com`
   - `font-src`: allow `https://fonts.gstatic.com`

   Do not weaken unrelated CSP directives and do not add broad wildcards.

8. Do not download Google Sans from unofficial GitHub repositories, file-sharing sites, or copied browser assets. Do not embed unknown base64 font data.

9. Preserve a client-approved typeface when a documented client design system explicitly requires another font. Report that exception instead of silently overriding it.

# Verification

After implementation, run all applicable build and lint checks, then verify in a real browser:

1. Confirm the Google Fonts stylesheet returns HTTP 200.
2. Confirm font files load from `fonts.gstatic.com` without CSP or CORS errors.
3. Run:

   await document.fonts.ready;
   document.fonts.check('16px "Google Sans"');

   The final result must be `true`.

4. Inspect computed styles for body text, one heading, one button, one input, one table header, one modal or dropdown, and one third-party widget if present. Each must resolve to a stack beginning with `Google Sans`.
5. Check the browser console for font, CSP, CORS, mixed-content, and stylesheet errors.
6. Test desktop and mobile layouts. Confirm there is no layout shift, clipping, overlapping navigation, or unreadable text after the font change.
7. Test weights 400, 500, 600, and 700 visually or through computed styles.

# Desired Output

Return:

1. The files changed and why each file was changed.
2. The final font import and global CSS token.
3. Framework-specific configuration applied.
4. Browser verification results, including the value returned by `document.fonts.check()`.
5. Any exceptions, CSP changes, remaining risks, or pages that could not be tested.

Do not claim completion if the font name only appears in CSS. Completion requires proof that the real font resource loaded and the browser used it.
```

## Quick test inputs

1. A Laravel and Bootstrap application with Select2 and DataTables.
2. A Tailwind or Next.js website with an existing `font-sans` token.
3. A production site with a restrictive Content Security Policy.

## Assumptions

- The project may load approved remote assets from Google Fonts.
- The development agent can inspect source files, run checks, and use a real browser.
- Client-specific typography takes precedence when documented.
