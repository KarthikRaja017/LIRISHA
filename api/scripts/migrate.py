"""
Database Migration Script.
Applies raw SQL migrations in sequential order and tracks applied versions.
No ORM required.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure root api folder is in python path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

load_dotenv()

import psycopg
from psycopg.rows import dict_row


def run_migrations():
    """Reads SQL files in migrations/ and applies unapplied files in order."""
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL environment variable is not set.")
        sys.exit(1)

    migrations_dir = Path(__file__).resolve().parent.parent / "migrations"
    sql_files = sorted([f for f in migrations_dir.glob("*.sql")])

    print(f"Connecting to database to run migrations...")
    
    try:
        with psycopg.connect(db_url, row_factory=dict_row) as conn:
            with conn.cursor() as cursor:
                # Ensure schema_migrations table exists
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS schema_migrations (
                        version VARCHAR(255) PRIMARY KEY,
                        applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                conn.commit()

                # Get applied migrations
                cursor.execute("SELECT version FROM schema_migrations")
                applied = {row["version"] for row in cursor.fetchall()}

                for sql_file in sql_files:
                    filename = sql_file.name
                    if filename in applied:
                        print(f"  [SKIP] {filename} (already applied)")
                        continue

                    print(f"  [APPLYING] {filename}...")
                    sql_content = sql_file.read_text(encoding="utf-8")
                    
                    cursor.execute(sql_content)
                    cursor.execute(
                        "INSERT INTO schema_migrations (version) VALUES (%s)",
                        (filename,)
                    )
                    conn.commit()
                    print(f"  [SUCCESS] {filename}")

        print("All migrations completed successfully!")
    except Exception as e:
        print(f"ERROR applying migrations: {e}")
        sys.exit(1)


if __name__ == "__main__":
    run_migrations()
