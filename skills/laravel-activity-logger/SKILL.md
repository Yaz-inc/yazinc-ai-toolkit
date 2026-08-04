---
name: laravel-activity-logger
description: >-
  Implements hybrid activity audit logging in Laravel — indexed columns for fast
  queries plus JSON payload for full context. Use when adding audit trails,
  activity log pages, or logging create/update/delete across admin modules.
---

# Laravel Activity Logger (Hybrid)

Production audit log: **indexed columns** for filtering + **JSON column** for complete action context.

## When to use

- Any admin module needs who-did-what-when tracking
- Compliance or support requires searchable history by user, module, or entity
- You want one logger service called from all controllers

## Stack

- Laravel 10, Eloquent
- Table: `activity_logs`
- Service: static `ActivityLogger::log()` + optional entity helpers

## Database schema

```php
Schema::create('activity_logs', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id')->nullable();
    $table->string('action_type', 50);   // create, update, delete, login, ...
    $table->string('module', 50)->nullable();
    $table->string('entity_type', 100)->nullable();
    $table->unsignedBigInteger('entity_id')->nullable();
    $table->string('entity_name')->nullable();
    $table->json('action');
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->timestamps();

    $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
    $table->index(['user_id', 'action_type', 'module', 'entity_type', 'entity_id', 'created_at']);
    $table->index(['entity_type', 'entity_id']);
    $table->index(['module', 'action_type']);
});
```

## Service pattern

```php
ActivityLogger::log(
    'update',           // action_type
    'vendors',          // module slug
    'Vendor',           // entity_type
    $vendor->id,
    $vendor->name,
    ['changes' => $changes]  // merged into JSON action blob
);
```

The service should capture in JSON: user snapshot, timestamp, IP, user agent, plus caller `$data`.

Add **convenience methods** per domain entity only when used repeatedly:

```php
ActivityLogger::logEntityCreated($model, 'items', 'Item', 'name');
```

## Controller usage

Call after successful create/update/delete:

```php
$item = Item::create($validated);
ActivityLogger::log('create', 'items', 'Item', $item->id, $item->name, [
    'data' => $validated,
]);
```

For updates, pass a `changes` array (old vs new).

## Activity log UI

- Admin page with its own server-side DataTable on `activity_logs`
- Filters: user, module, action_type, date range
- Detail view reads JSON `action` column

## Do

- Log after DB success, not before
- Use consistent `module` slugs matching permission modules
- Index columns you filter on in the UI

## Don't

- Don't store secrets or passwords in JSON payload
- Don't log read operations on every page view (volume) unless required

## File checklist

| File | Action |
|------|--------|
| `database/migrations/*_create_activity_logs_table.php` | Schema |
| `app/Models/ActivityLog.php` | Model, casts `action` => array |
| `app/Services/ActivityLogger.php` | Static log + helpers |
| Controllers | Call logger on mutations |
| `ActivityLogController` + view | Optional admin browser |

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
