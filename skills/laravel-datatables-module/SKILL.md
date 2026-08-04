---
name: laravel-datatables-module
description: >-
  Builds server-side Yajra DataTables CRUD list modules in Laravel admin apps.
  Use when adding index pages with AJAX tables, filters, action columns, or
  migrating modal CRUD to separate index/create/edit pages.
---

# Laravel DataTables Module (Yajra)

Server-side DataTables pattern for Laravel 10 admin panels with jQuery and Bootstrap.

## When to use

- New module needs a sortable, searchable list with server-side pagination
- Replacing modal CRUD with dedicated pages
- Adding filter dropdowns that reload the table via AJAX

## Stack

- Laravel 10, PHP 8.1+
- `yajra/laravel-datatables-oracle` (^10)
- jQuery + DataTables 1.13.x CDN
- Shared layout partial for `window.datatableDefaultConfig`

## Do

- Use **separate pages**: `index` (table), `create`, `edit` — not modals for standard CRUD
- Detect AJAX in controller: `$request->ajax() || $request->has('draw')`
- Eager-load relations in the query; use `withCount` when needed
- Put HTML action buttons in `->addColumn('actions', ...)` and list in `->rawColumns(['actions'])`
- Gate action buttons by permission in the column callback
- Merge page config with `Object.assign({}, window.datatableDefaultConfig || {}, { ... })`
- Pass filter values in DataTables `ajax.data` callback

## Don't

- Don't return the full view on AJAX requests
- Don't forget CSRF on delete forms submitted via JS
- Don't hardcode permission checks only in the view — mirror in controller actions column

## Controller pattern

```php
public function index(Request $request)
{
    if ($request->ajax() || $request->has('draw')) {
        $query = Item::with(['category'])->query();

        if ($request->filled('filter_status')) {
            $query->where('status_id', $request->filter_status);
        }

        return DataTables::of($query)
            ->addColumn('category_name', fn ($row) => $row->category?->name ?? '-')
            ->addColumn('actions', function ($row) {
                // Build HTML menu; check auth()->user() permissions
                return $html;
            })
            ->rawColumns(['actions'])
            ->make(true);
    }

    return view('items.index', compact('filterOptions'));
}
```

## View pattern

```blade
@section('page-script')
<script>
$(function () {
    const table = $('#itemsTable').DataTable(
        Object.assign({}, window.datatableDefaultConfig || {}, {
            ajax: {
                url: '{{ route('items.index') }}',
                data: d => { d.filter_status = $('#filterStatus').val(); }
            },
            columns: [
                { data: 'name', name: 'name' },
                { data: 'actions', orderable: false, searchable: false }
            ],
            order: [[0, 'asc']]
        })
    );
    $('#filterStatus').on('change', () => table.ajax.reload());
});
</script>
@endsection
```

## File checklist

| File | Action |
|------|--------|
| `app/Http/Controllers/ItemController.php` | `index` AJAX branch + CRUD |
| `resources/views/items/index.blade.php` | Table + DataTables init |
| `resources/views/items/create.blade.php` | Create form |
| `resources/views/items/edit.blade.php` | Edit form |
| `routes/web.php` | Resource or explicit routes + permission middleware |
| `resources/views/layouts/sections/datatables-config.blade.php` | Shared defaults (include in layout) |

## Navigation helpers

```javascript
function editItem(id) {
    window.location.href = '/items/' + id + '/edit';
}
```

Delete via dynamic POST form with `_method=DELETE` and CSRF token.

## Origin

- **Origin:** Generalized Laravel application workflow
- **Extracted:** 2026-06-10
