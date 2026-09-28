"""
Pytest Fixtures for Backend Testing.
"""
import pytest
from app import create_app
from app.config.config import TestingConfig


@pytest.fixture
def app():
    """Creates Flask application instance configured for testing."""
    app = create_app(TestingConfig)
    app.config["TESTING"] = True
    return app


@pytest.fixture
def client(app):
    """Creates a test client for simulating HTTP requests."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Creates a CLI runner for testing Flask CLI commands."""
    return app.test_cli_runner()
