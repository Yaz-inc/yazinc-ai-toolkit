---
name: laravel-vision-label-scan
description: >-
  Vision AI pipeline for Laravel — upload label photo, extract JSON fields,
  user reviews and applies to form (never auto-save). Use for OCR/VLM label
  scanning on admin forms, asset registration, or catalog model entry.
---

# Laravel Vision Label Scan

Image → AI JSON extraction → **review panel** → user applies selected fields. No auto-save.

## When to use

- Staff photograph equipment/shipping labels (serial, SKU, MAC, IMEI, PO)
- Reduce manual typing into admin forms
- Same scan UX on multiple entities (e.g. asset vs catalog model) with different field maps

## Stack

- Laravel 10, multipart upload, throttle (e.g. 10/min)
- `AiService::analyzeImage()` + `LabelScanService` (domain-agnostic name: `VisionFormScanService`)
- Shared Blade partial + JS modal (`label-scan` component pattern)
- Config: `config/ai.php` → `label_scan`

## User flow

```
[Scan label] → upload/camera → "Reading label…"
    → review table: Value | Suggested field | ☑ Apply
    → [Apply selected] → form fields update only
    → user clicks Save on form (required)
```

## API

```
POST /items/scan-label
Content-Type: multipart/form-data
Body: image (jpeg/png/webp, max 8MB)

Response 200:
{
  "success": true,
  "suggestions": [
    { "key": "serial_number", "label": "Serial", "value": "...", "confidence": "high" }
  ],
  "extras": [ ... unmapped fields ... ],
  "description_append": "--- Label scan ---\nMAC: ..."
}
```

## Service layers

| Layer | Role |
|-------|------|
| Controller | Validate image, permission, call service, JSON response |
| Scan service | Prompt, `analyzeImage()`, parse JSON, map to form keys, DB lookup (optional) |
| AiService | Vision + fallback chain (`label_scan` mode) |

## Prompt rules

- Ask for **JSON only** (no markdown fences in ideal case)
- `parseJsonResponse()`: strip ```json blocks, extract `{...}`, `json_decode`
- Context param (`asset` vs `model`) changes which fields are prioritized
- Include `asset_name` / display name so required fields can save immediately

## Field mapping

- Map extracted keys to form input `name` attributes
- Optional: lookup catalog record by SKU/UPC → suggest `model_id`
- Unmapped values → `description_append` or tags — not new DB columns in v1

## Do

- Throttle scan endpoints
- Show friendly error if JSON empty: "Try a clearer photo"
- Put Scan button in **page header**, not buried in modal tabs
- Default optional "save photo to gallery" checkbox — user choice

## Don't

- **Never auto-save** the parent record after scan
- Don't add columns for every label field in v1 — use description block for extras

## File checklist

| File | Action |
|------|--------|
| `config/ai.php` | `label_scan` block |
| `app/Services/*LabelScanService.php` | Extraction + mapping |
| `app/Http/Controllers/LabelScanController.php` | `scanAsset`, `scanModel` |
| `resources/views/components/label-scan.blade.php` | Modal + JS |
| `routes/web.php` | POST routes + throttle + permission |

## Related skills

- `laravel-ai-multi-provider` — vision fallback
- `laravel-json-ai-settings` — API keys

## Origin

- **Project:** Asset Manager (CDghl)
- **Repo:** Yaz-inc/Asset-Manager-V17-Final
- **Commit:** 0ee71e9
- **Extracted:** 2026-06-10
