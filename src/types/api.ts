/**
 * Generic API response wrappers used across all services.
 */

/** Standard successful API response envelope. */
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

/** Standard API error shape returned by the server. */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

/** Paginated list response. */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
