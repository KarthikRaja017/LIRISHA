"""
CORS (Cross-Origin Resource Sharing) Configuration Extension.
"""
from flask import Flask, request, make_response
from flask_cors import CORS


def init_cors(app: Flask) -> None:
    """
    Configures universal CORS support:
    1. Supports all Vercel domains (production & preview branches: *.vercel.app)
    2. Supports local development (localhost, 127.0.0.1 on any port)
    3. Handles preflight OPTIONS requests instantly with 204 status
    4. Guarantees CORS headers even on error responses
    """
    # Initialize Flask-CORS with regex matching all origins
    CORS(
        app,
        resources={r"/api/.*": {"origins": r".*"}},
        supports_credentials=True,
        allow_headers=[
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Cache-Control",
            "Pragma",
        ],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        max_age=86400,
    )

    # Fast preflight OPTIONS interceptor before route evaluation
    @app.before_request
    def handle_preflight_options():
        if request.method == "OPTIONS":
            response = make_response("", 204)
            origin = request.headers.get("Origin") or "*"
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            req_headers = request.headers.get("Access-Control-Request-Headers")
            response.headers["Access-Control-Allow-Headers"] = (
                req_headers
                if req_headers
                else "Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma"
            )
            response.headers["Access-Control-Max-Age"] = "86400"
            return response

    # Dynamic origin reflection on every response (guarantees CORS headers on 200, 4xx, and 5xx)
    @app.after_request
    def add_cors_headers_after_request(response):
        origin = request.headers.get("Origin")
        if origin:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            if "Access-Control-Allow-Headers" not in response.headers:
                response.headers["Access-Control-Allow-Headers"] = (
                    "Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma"
                )
            response.headers["Access-Control-Max-Age"] = "86400"
        return response
