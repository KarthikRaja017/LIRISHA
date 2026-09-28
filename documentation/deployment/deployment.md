# Production Deployment Guide (No Docker)

This guide details how to deploy the frontend, backend, and PostgreSQL database directly on production Linux servers (Ubuntu/Debian) without Docker.

## 1. PostgreSQL Database Setup

1. Install PostgreSQL:
   ```bash
   sudo apt update && sudo apt install -y postgresql postgresql-contrib
   ```
2. Create production database and user:
   ```bash
   sudo -u postgres psql -c "CREATE DATABASE project_prod;"
   sudo -u postgres psql -c "CREATE USER app_user WITH PASSWORD 'secure_password';"
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE project_prod TO app_user;"
   ```

## 2. Flask Backend Deployment

1. Clone repository to `/var/www/api`.
2. Setup virtual environment:
   ```bash
   cd /var/www/api
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt gunicorn
   ```
3. Copy and configure `.env`:
   ```bash
   cp .env.example .env
   ```
4. Run migrations:
   ```bash
   python scripts/migrate.py
   ```
5. Configure systemd service (`/etc/systemd/system/flask-api.service`):
   ```ini
   [Unit]
   Description=Flask API Backend Service
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/var/www/api
   ExecStart=/var/www/api/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 main:app
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
6. Start systemd service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start flask-api
   sudo systemctl enable flask-api
   ```

## 3. Next.js Frontend Deployment

1. Clone repository to `/var/www/web`.
2. Install & build:
   ```bash
   cd /var/www/web
   npm install
   npm run build
   ```
3. Configure systemd service (`/etc/systemd/system/next-web.service`):
   ```ini
   [Unit]
   Description=Next.js Web Frontend Service
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/var/www/web
   ExecStart=/usr/bin/npm run start
   Restart=always
   Environment=NODE_ENV=production

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable and start:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl start next-web
   sudo systemctl enable next-web
   ```

## 4. Nginx Reverse Proxy Setup

Configure Nginx to route traffic to frontend (port 3000) and API (port 8000):

```nginx
server {
    listen 80;
    server_name example.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
