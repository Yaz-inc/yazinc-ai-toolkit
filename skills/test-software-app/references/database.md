# Database

Version-Timestamp: 2026-08-04 17:36:47 +05:00

## Record the database mode

Choose one:

- Production data, read-only audit
- Production-like restored backup
- Dedicated QA database
- Isolated automated-test database
- Database excluded
- Schema and migrations excluded, application reads/writes allowed

Never infer permission to alter schema, run migrations, truncate tables, or delete QA records from permission to test the UI.

## Data test matrix

For every important entity verify:

1. Create once with a unique QA prefix.
2. Read after save, modal close, table refresh, and full reload.
3. Edit fields and relationships, then verify all consuming views.
4. Search, sort, filter, paginate, and export.
5. Archive or soft-delete and verify active lists.
6. Restore and verify relationships, messages, attachments, and activity history.
7. Delete permanently only when explicitly authorized and recoverability is proven.

## Database-specific concerns

| Database | Watch for |
|---|---|
| MySQL/MariaDB | Collation/case behavior, strict mode, timezone conversion, unsigned values, transaction engine |
| PostgreSQL | Case-sensitive identifiers, JSON/array behavior, sequences, timezone-aware timestamps, row security |
| SQL Server | Identity handling, Unicode types, date precision, locking, collation, transaction isolation |
| SQLite | Development/production behavior gaps, foreign-key mode, concurrency, type affinity |
| NoSQL/document | Missing schema enforcement, partial documents, tenant keys, eventual consistency, index coverage |
| External system of record | API contract, retries, duplicate writes, reconciliation, ownership, outage behavior |

## Integrity rules

- Test the application data model, not assumptions. If organization contact values live in nested contacts, integrity checks must use those maintainable fields.
- Verify foreign relationships and ownership from every relevant role.
- Compare UI counts, report counts, exports, and direct application-level queries when authorized.
- Flag historical timestamp anomalies separately from current calculation defects.
- Use transactions, backups, or disposable databases for automated mutation tests where possible.
