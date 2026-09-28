# Flask Backend API

Production-ready Python Flask backend with raw PostgreSQL access via `psycopg` (v3).

## Architecture

- **`main.py`**: Entry point.
- **`app/`**: Application package built using Flask Application Factory pattern (`create_app`).
  - **`config/`**: Configuration management.
  - **`extensions/`**: Connection pool and CORS initialization.
  - **`middleware/`**: Authentication decorators and request timing logger.
  - **`routes/`**: Versioned API route handlers (`/api/v1/...`).
  - **`services/`**: Business logic layer.
  - **`repositories/`**: Parameterized raw SQL execution (NO ORM).
  - **`models/`**: Domain models / dataclasses.
  - **`schemas/`**: Pydantic input validation models.
  - **`utils/`**: Security (passwords, JWT), response formatters, pagination.
  - **`errors/`**: Centralized error handlers and custom exceptions.

## Quick Start (Local Setup)

### 1. Create Virtual Environment

Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

Linux/macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env` and fill in your PostgreSQL credentials:

```bash
cp .env.example .env
```

### 4. Run Migrations

Ensure PostgreSQL is running and your target database exists, then run:

```bash
python scripts/migrate.py
python scripts/seed.py
```

### 5. Start Server

```bash
python main.py
```

Server runs on `http://localhost:8000`.

## Testing & Linting

Run test suite:
```bash
pytest
```

Run linter:
```bash
ruff check .
```
