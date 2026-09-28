# Local Setup Guide

## Prerequisites

- Node.js (v18+)
- Python (3.10+)
- PostgreSQL installed and running locally

## Step 1: Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE project_db;
```

## Step 2: Backend Setup (`api/`)

1. Open terminal in `api/`:
   ```bash
   cd api
   ```
2. Create and activate virtual environment:
   - Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - Linux / macOS:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and set `DATABASE_URL`.
5. Run migrations & seed data:
   ```bash
   python scripts/migrate.py
   python scripts/seed.py
   ```
6. Start backend server:
   ```bash
   python main.py
   ```

## Step 3: Frontend Setup (`web/`)

1. Open terminal in `web/`:
   ```bash
   cd web
   ```
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local`.
4. Start Next.js dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.
