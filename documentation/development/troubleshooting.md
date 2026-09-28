# Troubleshooting Guide

## Common Issues & Solutions

### 1. `psycopg.OperationalError: cannot connect to server`
- **Cause**: PostgreSQL is not running or credentials in `.env` are invalid.
- **Fix**: Verify PostgreSQL service status and check `DATABASE_URL` in `api/.env`.

### 2. CORS Error in Browser Console
- **Cause**: Backend CORS origin setting does not include frontend origin.
- **Fix**: Update `CORS_ORIGINS` in `api/.env` to include `http://localhost:3000`.

### 3. Missing `email-validator` error in Pydantic
- **Cause**: Pydantic EmailStr requiring email-validator package.
- **Fix**: Run `pip install "pydantic[email]" email-validator` in backend virtualenv.
