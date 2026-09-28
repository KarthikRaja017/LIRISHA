# SQL Query Guidelines

## Rules for SQL Writing

1. **ALWAYS Use Parameterized SQL**
   - Use `%s` placeholders for all dynamic parameters.
   - **NEVER** use string concatenation or f-strings to format queries.

   ✅ **Good**:
   ```python
   cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
   ```

   ❌ **Bad (CRITICAL VULNERABILITY)**:
   ```python
   cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
   ```

2. **Use Dict Rows**
   - Access query columns by field name (`row["email"]`), never positional indices (`row[0]`).

3. **Explicit Columns**
   - Specify explicit column names in `SELECT` statements (`SELECT id, email, first_name ...`) instead of `SELECT *` in production queries.
