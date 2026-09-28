# Database Architecture

The application uses PostgreSQL with direct, parameterized raw SQL queries (**NO ORM**).

## Why No ORM?

- **Performance**: Zero ORM query translation overhead.
- **Predictability**: Developers write exact SQL queries, indexes are explicitly utilized.
- **Maintainability**: Easy to debug slow queries directly using standard PostgreSQL tools (`EXPLAIN ANALYZE`).

## Connection Pooling

Database connections are managed via `psycopg_pool.ConnectionPool`:
- Reuses active database connections across HTTP request threads.
- Configurable `DB_MIN_CONN` and `DB_MAX_CONN` parameters.
- Built-in transaction management with automatic commit/rollback context managers (`get_db_cursor()`).
