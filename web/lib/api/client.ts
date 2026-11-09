import { APP_CONFIG } from "@/constants/config";
import { ApiResponse, RequestOptions } from "@/types/api";
import { ApiError } from "./errors";
import { getToken } from "@/lib/auth/token";

class ApiClient {
  private baseUrl?: string;

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl.replace(/\/$/, "");
    }
  }

  private getBaseUrl(): string {
    const raw = this.baseUrl || APP_CONFIG.apiUrl;
    return raw.replace(/\/$/, "");
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.getBaseUrl()}${cleanEndpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      method = "GET",
      params,
      body,
      headers: customHeaders = {},
      timeoutMs = APP_CONFIG.requestTimeoutMs,
      ...rest
    } = options;

    const url = this.buildUrl(endpoint, params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const token = getToken();
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    const headers: Record<string, string> = {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(customHeaders as Record<string, string>),
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
      try {
      response = await fetch(url, {
        method,
        headers,
        body: isFormData ? (body as any) : (body ? JSON.stringify(body) : undefined),
        signal: controller.signal,
        ...rest,
      });

      } catch (fetchErr: unknown) {
        // If local backend is down (connection refused / false-flag CORS error because server is not running),
        // seamlessly retry against the live production Render API
        if (
          url.includes("localhost:8000") ||
          url.includes("127.0.0.1:8000")
        ) {
          const fallbackUrl = url.replace(
            /https?:\/\/(localhost|127\.0\.0\.1):8000\/api\/v1/,
            "https://lirisha-api.onrender.com/api/v1"
          );
          console.warn(
            `[ApiClient] Local server offline at ${url}. Seamlessly falling back to live API: ${fallbackUrl}`
          );
          response = await fetch(fallbackUrl, {
            method,
            headers,
            body: isFormData ? (body as any) : (body ? JSON.stringify(body) : undefined),
            signal: controller.signal,
            ...rest,
          });
        } else {
          throw fetchErr;
        }
      }

      clearTimeout(timeoutId);

      if (response.status === 204) {
        return {} as T;
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        if (json && json.success === false) {
          throw ApiError.fromResponse(json, response.status);
        }
        throw new ApiError(
          response.statusText || "HTTP Request Failed",
          response.status,
          "HTTP_ERROR"
        );
      }

      const apiResponse = json as ApiResponse<T>;
      return apiResponse.data;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("Request timed out", 408, "TIMEOUT");
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error occurred",
        500,
        "NETWORK_ERROR"
      );
    }
  }

  public get<T>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  public put<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  public patch<T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PATCH", body });
  }

  public delete<T>(endpoint: string, options?: Omit<RequestOptions, "method">): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
