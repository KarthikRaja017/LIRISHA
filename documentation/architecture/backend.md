# Backend Architecture

The Python backend (`api/`) uses Flask with a layered architecture: Route → Service → Repository → Database.

## Application Layers

### 1. Routes (`app/routes/`)
- HTTP handling, request parameter extraction, Pydantic validation invocation.
- Converts valid inputs into service calls and returns formatted JSON responses.
- **NO business logic or database queries allowed.**

### 2. Services (`app/services/`)
- Domain business logic, transaction orchestration, hashing, security logic, and validation error throwing.
- **NO direct database cursors or HTTP objects.**

### 3. Repositories (`app/repositories/`)
- Pure SQL database operations using `psycopg3`.
- Returns domain models or clean dictionary objects.
- **NO business logic or HTTP concepts.**

### 4. Extensions & Infrastructure
- Connection pooling via `psycopg_pool.ConnectionPool`.
- Centralized exception handlers converting exceptions to standard JSON error payloads.
