"""
Database Seed Script.
Populates initial sample user data safely.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

load_dotenv()

import psycopg
from psycopg.rows import dict_row
from werkzeug.security import generate_password_hash


def seed_data():
    """Seeds initial admin and regular user accounts if not present."""
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL environment variable is not set.")
        sys.exit(1)

    admin_email = "admin@lirisha.com"
    user_email = "user@example.com"
    default_password = generate_password_hash("Lirisha#Adm!n2026$Vault!", method="scrypt")

    try:
        with psycopg.connect(db_url, row_factory=dict_row) as conn:
            with conn.cursor() as cursor:
                # Seed Admin
                cursor.execute("SELECT id FROM users WHERE email = %s", (admin_email,))
                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
                        VALUES (%s, %s, %s, %s, %s, true)
                    """, (admin_email, default_password, "System", "Admin", "admin"))
                    print(f"Seeded admin user: {admin_email}")
                else:
                    print(f"Admin user {admin_email} already exists.")

                # Seed Regular User
                cursor.execute("SELECT id FROM users WHERE email = %s", (user_email,))
                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
                        VALUES (%s, %s, %s, %s, %s, true)
                    """, (user_email, default_password, "John", "Doe", "user"))
                    print(f"Seeded standard user: {user_email}")
                else:
                    print(f"User {user_email} already exists.")

                conn.commit()
        print("Seeding finished successfully.")
    except Exception as e:
        print(f"ERROR seeding data: {e}")
        sys.exit(1)


if __name__ == "__main__":
    seed_data()
