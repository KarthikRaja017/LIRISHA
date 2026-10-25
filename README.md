# Full Stack Application Template

> **Next.js (TypeScript) + Python Flask + PostgreSQL (Raw SQL / No ORM)**

A production-ready, reusable full-stack project template designed to serve as the foundational starting point for building ANY web application (CRM, ERP, SaaS, E-commerce, Healthcare, Analytics, etc.).

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Next.js Client                        │
│                           (web/)                            │
│                                                             │
│  Pages → Feature Modules → Feature Services → API Client    │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        Flask Backend                        │
│                           (api/)                            │
│                                                             │
│         Routes (/api/v1/) → Services → Repositories         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Parameterized Raw SQL (%s)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Technologies

- **Frontend:** Next.js (App Router), TypeScript (Strict), Tailwind CSS
- **Backend:** Python Flask (Application Factory pattern), Pydantic v2
- **Database:** PostgreSQL via `psycopg3` and `psycopg_pool` (**NO ORM**)
- **Security:** Scrypt password hashing, JWT Bearer tokens, Parameterized SQL against injection, strict CORS
- **No Docker**: Designed to run natively on host systems and deployment VMs.

---

## Project Structure

```text
project-root/
│
├── web/                      # Next.js Frontend
│   ├── app/                  # App Router pages & global layout
│   ├── components/           # Reusable UI foundation & layout components
│   ├── features/             # Modular feature domains (e.g. users/)
│   ├── hooks/                # Global React custom hooks (useAuth, useDebounce)
│   ├── lib/                  # API client, Auth token helpers
│   ├── services/             # Base services
│   ├── types/                # Shared TypeScript definitions
│   ├── utils/                # Utility helpers
│   ├── constants/            # Configuration and route constants
│   ├── styles/               # Global CSS & Tailwind configuration
│   ├── public/               # Static assets
│   ├── middleware.ts         # Security headers & edge middleware
│   ├── next.config.ts        # Next.js configuration
│   ├── tsconfig.json         # Strict TypeScript configuration
│   ├── package.json          # Node dependencies & scripts
│   ├── .env.example          # Environment variables template
│   └── README.md             # Frontend documentation
│
├── api/                      # Flask Backend
│   ├── app/
│   │   ├── __init__.py       # Application factory
│   │   ├── config/           # Configuration environments
│   │   ├── extensions/       # Database pool & CORS extensions
│   │   ├── middleware/       # Auth decorators & request logger
│   │   ├── routes/           # Versioned API routes (/api/v1/)
│   │   ├── services/         # Domain business logic
│   │   ├── repositories/     # Parameterized raw SQL execution
│   │   ├── models/           # Plain dataclass entities
│   │   ├── schemas/          # Pydantic input validation
│   │   ├── utils/            # Security, formatting, pagination
│   │   ├── constants/        # HTTP & error constants
│   │   └── errors/           # Centralized exception handlers
│   │
│   ├── migrations/           # Sequential raw SQL migration scripts
│   ├── scripts/              # Migration runner & seeding scripts
│   ├── tests/                # Pytest unit & integration test suite
│   ├── requirements.txt      # Python dependencies
│   ├── main.py               # Entry point
│   ├── .env.example          # Environment variables template
│   └── README.md             # Backend documentation
│
├── documentation/            # Comprehensive Documentation Suite
│   ├── architecture/         # High level, frontend, backend & database architecture
│   ├── database/             # Schemas, migrations & SQL guidelines
│   ├── api/                  # Endpoints, authentication & JSON response format
│   ├── frontend/             # Folder structure, components & state management
│   ├── authentication/       # Security overview
│   ├── development/          # Setup, standards & troubleshooting
│   ├── deployment/           # Production Linux deployment guide
│   └── README.md             # Documentation sitemap
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## Default Demo Credentials & Unified Login

The platform provides a single dedicated **Sign In** page at [`/login`](http://localhost:3000/login):

| Role | Email | Password | Access Level & Destination |
| :--- | :--- | :--- | :--- |
| **Administrator (CMS)** | `admin@lirisha.com` | `Lirisha#Adm!n2026$Vault!` | Routes to `/admin` — Full CMS access to edit pages, contact information, office locations, blogs, footer settings, branding, Dropbox Cloud Studio, and User Account management. |
| **Client (Customer)** | `user@example.com` | `Password123!` | Routes to `/portal` — Private client portal to review retouched deliverable batches (sets of photos), inspect high-resolution images in the lightbox, download individual or all photos, and approve work. |

### Authentication & Account Features
- **Dedicated Sign-In**: Enter credentials on a single screen without manual role switches. The system automatically inspects your role and directs administrators to `/admin` and clients to `/portal`.
- **Admin User Provisioning Only**: User self-registration is completely disabled. Only administrators can create new client accounts and manage credentials in `/admin` under **Security, Credentials & User Accounts**.
- **Deliverables as Sets of Files (Batches)**: Deliverables are structured as project sets/batches containing multiple photos. Clients can inspect each photo in the interactive lightbox and download individual photos or download the entire batch.

---

## Quick Setup Guide

### Prerequisites

- Node.js v18+
- Python 3.10+
- PostgreSQL server

---

### 1. Database Setup

Create a local PostgreSQL database:

```sql
CREATE DATABASE project_db;
```

---

### 2. Backend Startup (`api/`)

Open terminal in `api/`:

```bash
cd api
```

**Create Virtual Environment:**

- **Windows:**
  ```bash
  python -m venv venv
  venv\Scripts\activate
  ```
- **Linux/macOS:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

**Install Dependencies:**

```bash
pip install -r requirements.txt
```

**Configure Environment:**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure `DATABASE_URL` matches your local PostgreSQL instance credentials.

**Run Migrations & Seed Data:**

```bash
python scripts/migrate.py
python scripts/seed.py
```

**Run Flask Backend:**

```bash
python main.py
```

API server will run on `http://localhost:8000`.

---

### 3. Frontend Startup (`web/`)

Open a new terminal in `web/`:

```bash
cd web
```

**Install Dependencies:**

```bash
npm install
```

**Configure Environment:**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

**Run Frontend Development Server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing & Quality Control

### Backend Tests (Pytest)

```bash
cd api
.\venv\Scripts\pytest.exe
```

### Frontend Type-Checking

```bash
cd web
npm run type-check
```

---

## How to Adapt This Template for a New Project

1. **Clone/Copy Template** into your new project repository.
2. **Update Project Name** in `web/package.json` and `.env` files.
3. **Configure Database**: Update `DATABASE_URL` in `api/.env`.
4. **Remove Example Feature**:
   - Delete `web/features/users/` (or adapt it for your application's user model).
   - Update or replace `api/app/routes/users.py`, `user_service.py`, and `user_repository.py`.
5. **Create New Features**:
   - Add new migration files in `api/migrations/`.
   - Create Route -> Service -> Repository -> Pydantic Schema in `api/app/`.
   - Add feature domain folder in `web/features/<your-feature>/`.
