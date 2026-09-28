# Database Migrations

This directory contains raw SQL migration files applied in numerical order.

## Migration Structure

- SQL migration files follow the naming convention: `NNN_description.sql` (e.g. `001_initial_schema.sql`).
- All migrations are tracked in the `schema_migrations` table in PostgreSQL.

## How to Apply Migrations

Run the Python migration script from the `api/` directory:

```bash
python scripts/migrate.py
```

This will:
1. Ensure the `schema_migrations` table exists.
2. Read all `.sql` files in `migrations/`.
3. Check which files have not yet been executed.
4. Execute missing migrations inside a database transaction.
5. Record applied migration filenames in `schema_migrations`.
