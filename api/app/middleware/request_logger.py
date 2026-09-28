"""
Request Logger Middleware.
Logs incoming requests, status codes, and execution duration.
"""
import time
import logging
from flask import Flask, request, g

logger = logging.getLogger("app.request")


def register_request_logger(app: Flask) -> None:
    """Registers before_request and after_request hooks for logging."""

    @app.before_request
    def start_timer():
        g.start_time = time.time()

    @app.after_request
    def log_request(response):
        if request.path.startswith("/api/"):
            start_time = getattr(g, "start_time", time.time())
            duration_ms = (time.time() - start_time) * 1000
            
            logger.info(
                f"{request.method} {request.path} | "
                f"Status: {response.status_code} | "
                f"Duration: {duration_ms:.2f}ms | "
                f"IP: {request.remote_addr}"
            )
        return response
