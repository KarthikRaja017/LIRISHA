"""
Application Entry Point.
Initializes and runs the Flask application factory.
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from app import create_app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("FLASK_DEBUG", "false").lower() in ("true", "1", "t")
    app.run(host="0.0.0.0", port=port, debug=debug)
