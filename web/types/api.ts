export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorDetail {
  code: string;
  details?: Record<string, string | string[]>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: ApiErrorDetail;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  timeoutMs?: number;
}
