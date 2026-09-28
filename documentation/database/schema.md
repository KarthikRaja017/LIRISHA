# Database Schema Overview

## 1. `schema_migrations` Table
Tracks applied migration files.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `version` | VARCHAR(255) | PRIMARY KEY | Migration filename (e.g., `001_initial_schema.sql`) |
| `applied_at` | TIMESTAMPTZ | DEFAULT NOW() | Timestamp when migration was applied |

## 2. `users` Table
Stores user account records.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Unique user ID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Hashed password |
| `first_name` | VARCHAR(100) | NOT NULL | First name |
| `last_name` | VARCHAR(100) | NOT NULL | Last name |
| `role` | VARCHAR(50) | NOT NULL, DEFAULT 'user' | User role |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Account active status |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Record last update timestamp |
