---
name: laravel-soft-delete-trash
description: >-
  Unified soft-delete trash dashboard with deleted_by tracking, 30-day expiry,
  restore, and scheduled force-delete. Use when adding SoftDeletes across modules,
  recycle bin UI, or trash:cleanup artisan command.
---

# Laravel Soft Delete + Unified Trash

Cross-module recycle bin: soft delete with **who deleted**, unified admin trash page, optional **30-day auto purge**.

## When to use

- Multiple modules need delete with undo
- Super admin manages all trashed records in one place
- Compliance: retention period before permanent delete

## Stack

- Laravel `SoftDeletes` via custom `TracksSoftDeletes` trait
- `TrashController` + `trash:cleanup` command
- Pairs with `laravel-activity-logger` for audit on restore/purge

## TracksSoftDeletes trait

Extends `SoftDeletes` to:

- Set `deleted_by` from `auth()->id()` on soft delete (`saveQuietly`)
- Clear `deleted_by` on restore
- Optional `hasProtectedRelationships()` — block delete if children exist
- Scopes: `expiredTrash($days)`, `withinSafetyPeriod($days)`
- Methods: `getTrashDisplayName()`, `getTrashModuleName()` (override per model)

Template: [templates/TracksSoftDeletes.php.example](../../templates/TracksSoftDeletes.php.example)

## Migration per model

```php
$table->softDeletes();
$table->unsignedBigInteger('deleted_by')->nullable();
$table->foreign('deleted_by')->references('id')->on('users')->nullOnDelete();
```

Model:

```php
use App\Traits\TracksSoftDeletes;

class Item extends Model
{
    use TracksSoftDeletes;
}
```

## TrashController pattern

- `$trashableModels` map: slug => Model::class
- `index`: loop `onlyTrashed()->with('deletedByUser')`, compute days until expiry
- `restore($module, $id)`: `$model->restore()`, log via ActivityLogger
- `forceDelete($module, $id)`: delete files + `forceDelete()`, super admin only
- Constructor middleware: super admin only (or dedicated permission)

## Cleanup command

```bash
php artisan trash:cleanup           # interactive confirm
php artisan trash:cleanup --force   # scheduler
php artisan trash:cleanup --dry-run
```

Schedule daily in `app/Console/Kernel.php`:

```php
$schedule->command('trash:cleanup --force')->daily();
```

Command uses `Model::expiredTrash(30)`, deletes associated storage files, then `forceDelete()`.

## Do

- Override `getTrashDisplayName()` on models with non-standard name fields
- Log restore and bulk cleanup to activity log
- Show expiry countdown in trash UI (`expires_in = 30 - days_in_trash`)

## Don't

- Don't soft-delete without `deleted_by` column if audit matters
- Don't force-delete without cleaning storage/media first

## File checklist

| File | Action |
|------|--------|
| `app/Traits/TracksSoftDeletes.php` | Trait |
| Models | `use TracksSoftDeletes` + migration |
| `app/Http/Controllers/TrashController.php` | Unified UI |
| `resources/views/trash/index.blade.php` | Module filter + restore buttons |
| `app/Console/Commands/CleanupExpiredTrash.php` | Expiry purge |
| `routes/web.php` | Trash routes under `super_admin` |

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
