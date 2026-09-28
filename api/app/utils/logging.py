"""
Logging Utility.
Configures structured application logging using standard Python logging.
"""
import logging
import sys
from flask import Flask


def setup_logging(app: Flask) -> None:
    """Configures root and application loggers."""
    log_level_str = app.config.get("LOG_LEVEL", "INFO").upper()
    log_level = getattr(logging, log_level_str, logging.INFO)

    log_format = (
        "[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] - %(message)s"
    )

    formatter = logging.Formatter(log_format)

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)
    handler.setLevel(log_level)

    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Avoid duplicate handlers on re-initialization
    if not root_logger.handlers:
        root_logger.addHandler(handler)

    logger = logging.getLogger("app")
    logger.setLevel(log_level)
    logger.info(f"Logging initialized at level {log_level_str}")
