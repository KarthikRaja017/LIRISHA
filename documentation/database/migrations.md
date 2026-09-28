# Database Migrations Guide

Database schema changes are managed via raw SQL migration files located in `api/migrations/`.

## Creating a New Migration

1. Add a new `.sql` file in `api/migrations/` using sequential numbers:
   `003_add_products_table.sql`
2. Write clean PostgreSQL DDL queries:
   ```sql
   CREATE TABLE IF NOT EXISTS products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price NUMERIC(10, 2) NOT NULL
   );
   ```
3. Run the migration script:
   ```bash
   python scripts/migrate.py
   ```
