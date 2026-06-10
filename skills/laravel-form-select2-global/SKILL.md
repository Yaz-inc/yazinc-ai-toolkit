---
name: laravel-form-select2-global
description: >-
  App-wide consistent height and padding for Bootstrap form-control, form-select,
  and Select2 fields via CSS variables in the main layout stylesheet. Use when
  Select2 dropdowns look misaligned on some pages but not others in Bootstrap 5 admin UIs.
---

# Laravel Global Form + Select2 Consistency

One CSS source of truth in the **layout stylesheet** — all pages inherit the same field height. No per-page Select2 padding hacks.

## When to use

- Bootstrap 5 + Select2 4.x + bootstrap-5 theme
- Mixed native `<select>` and Select2-enhanced selects look different heights
- DataTable filter dropdowns, modals, and forms should align visually

## Stack

- CSS variables in `resources/views/layouts/sections/styles.blade.php` (or compiled SCSS)
- Select2 CDN + `select2-bootstrap-5-theme`
- Init Select2 in layout/scripts or page scripts — styling is global regardless

## Core pattern

```css
:root {
    --cd-field-padding-y:    0.4375rem;
    --cd-field-padding-x:    0.875rem;
    --cd-field-padding-y-sm: 0.25rem;
    --cd-field-padding-x-sm: 0.625rem;
    --cd-field-height:    calc((var(--cd-field-padding-y) * 2) + (1.5 * 1em) + 2px);
    --cd-field-height-sm: calc((var(--cd-field-padding-y-sm) * 2) + (1.5 * 0.875em) + 2px);
}

/* Native selects match computed height */
.form-select:not(.select2-hidden-accessible):not([multiple]) {
    min-height: var(--cd-field-height);
}

/* Select2 bootstrap-5 theme */
.select2-container--bootstrap-5 .select2-selection--single {
    height: var(--cd-field-height);
    min-height: var(--cd-field-height);
}
.select2-container--bootstrap-5 .select2-selection--single .select2-selection__rendered {
    line-height: calc(var(--cd-field-height) - 2px);
    padding-left: var(--cd-field-padding-x);
    padding-right: 2rem;
}
.select2-container--bootstrap-5 .select2-selection--single .select2-selection__arrow {
    height: var(--cd-field-height);
}
```

Template snippet: [templates/form-field-heights.css.example](../../templates/form-field-heights.css.example)

## Do

- Define variables once in global layout CSS
- Match `.form-control` padding to the same variables where needed
- Set Select2 `dropdownParent` to modal when selects inside modals (JS — separate from height CSS)
- Exclude DataTables internal length/order selects from Select2 enhancement if they break

## Don't

- Don't copy Select2 height overrides into individual page Blade files
- Don't fight Select2 with page-specific `!important` unless documenting exception in comment

## Exceptions

- `.datatable-filters` may use fixed 38px if filter bar design differs — document why
- `.form-floating-outline` variants need nested rules tied to same `--cd-field-height`

## File checklist

| File | Action |
|------|--------|
| `layouts/sections/styles.blade.php` | CSS variables + Select2 rules |
| Remove page-level duplicates | Audit `**/index.blade.php` for local Select2 CSS |
| Optional `.cursor/rules/` | Project rule: "no page-specific Select2 height overrides" |

## Origin

- **Project:** Asset Manager (CDghl)
- **Repo:** Yaz-inc/Asset-Manager-V17-Final
- **Commit:** 0ee71e9
- **Extracted:** 2026-06-10
