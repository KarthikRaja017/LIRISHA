import { APP_CONFIG } from "@/constants/config";
import { ApiResponse, RequestOptions } from "@/types/api";
import { ApiError } from "./errors";
import { getToken } from "@/lib/auth/token";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = APP_CONFIG.apiUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${cleanEndpoint}`);

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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(customHeaders as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...rest,
      });

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
