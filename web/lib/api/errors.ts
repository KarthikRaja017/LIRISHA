import { ApiErrorResponse } from "@/types/api";

export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details?: Record<string, string | string[]>;

  constructor(
    message: string,
    status: number = 500,
    code: string = "UNKNOWN_ERROR",
    details?: Record<string, string | string[]>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  public static fromResponse(res: ApiErrorResponse, status: number): ApiError {
    return new ApiError(
      res.message || "An API error occurred",
      status,
      res.error?.code || "API_ERROR",
      res.error?.details
    );
  }
}
