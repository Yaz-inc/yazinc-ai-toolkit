---
name: laravel-rbac-permissions
description: >-
  Implements module-based RBAC in Laravel admin apps with permission middleware,
  user_permissions table, super_admin bypass, and route groups. Use when adding
  role-based access, gating routes by module read/write, or staff vs portal users.
---

# Laravel RBAC Permissions

Module-level access control: **`permission:module,read`** / **`permission:module,write`** on routes, backed by `user_permissions` rows per user.

## When to use

- Admin app with multiple modules and staff roles
- Need read vs write separation (view list vs create/edit/delete)
- Super admin bypass; optional separate portal/customer user type blocked from admin

## Stack

- Laravel 10, session auth
- Middleware: `CheckPermission`, `SuperAdminOnly`
- Model: `UserPermission` + `User::hasPermission()`

## Roles (simple enum on users.role)

| Role | Behavior |
|------|----------|
| `super_admin` | Passes all permission checks |
| `manager` | Module permissions from DB |
| `data_view_only` | Read-only via permissions |

Adjust role names per project.

## Database

```php
Schema::create('user_permissions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('module', 50);
    $table->boolean('can_read')->default(false);
    $table->boolean('can_write')->default(false);
    $table->boolean('can_view')->default(false);
    $table->boolean('can_access')->default(false); // for report-only modules
    $table->timestamps();
    $table->unique(['user_id', 'module']);
});
```

Define module slugs in `UserPermission::getModules()` — use kebab/snake slugs matching routes.

## Register middleware

```php
// app/Http/Kernel.php
'permission' => \App\Http\Middleware\CheckPermission::class,
'super_admin' => \App\Http\Middleware\SuperAdminOnly::class,
```

## CheckPermission logic

1. Guest → redirect login
2. Portal/customer user → 403 on admin modules (optional)
3. `super_admin` → pass
4. Else `hasPermission($module, $type)` or 403

Usage:

```php
Route::middleware('permission:vendors,read')->group(function () {
    Route::get('/vendors', [VendorController::class, 'index']);
});
Route::middleware('permission:vendors,write')->group(function () {
    Route::post('/vendors', [VendorController::class, 'store']);
});
Route::middleware('super_admin')->group(function () {
    Route::get('/settings/system', ...);
});
```

## User model

```php
public function hasPermission(string $module, string $type = 'read'): bool
{
    if ($this->isSuperAdmin()) {
        return true;
    }
    $permission = $this->permissions()->where('module', $module)->first();
    if (!$permission) {
        return false;
    }
    return match ($type) {
        'read' => $permission->can_read,
        'write' => $permission->can_write,
        'view' => $permission->can_view,
        default => false,
    };
}
```

## UI / DataTables

In action column callbacks, check `hasPermission('vendors', 'write')` before showing edit/delete — mirror route gates.

User management UI: matrix of modules × read/write checkboxes; save as `UserPermission` rows.

## Do

- Use consistent module slugs in routes, permissions table, and UI
- Default new staff to minimal permissions; expand explicitly
- Block customer/portal users at middleware level, not only in views

## Don't

- Don't hardcode permission checks only in Blade — always protect routes
- Don't give write without considering related delete/restore flows

## File checklist

| File | Action |
|------|--------|
| `app/Http/Middleware/CheckPermission.php` | Module + type gate |
| `app/Http/Middleware/SuperAdminOnly.php` | Settings-only routes |
| `app/Models/UserPermission.php` | Module registry + types |
| `app/Models/User.php` | `hasPermission`, `isSuperAdmin` |
| `routes/web.php` | Wrap groups with `permission:` / `super_admin` |
| User admin views | Permission matrix on create/edit |

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
