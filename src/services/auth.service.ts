import apiClient from "@/lib/axios";
import type { AuthResponse } from "@/types/auth";
import type { LoginCredentials, RegisterPayload } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

/**
 * Authentication service — wraps all /auth endpoints.
 */
const authService = {
    /**
     * Authenticates a user with email + password.
     * Returns a JWT access token and user profile.
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            credentials,
        );
        return data.data;
    },

    /**
     * Registers a new user account.
     * Automatically logs in the user on success.
     */
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
            "/auth/register",
            payload,
        );
        return data.data;
    },

    /**
     * Invalidates the current session server-side.
     * The client should clear its local token after calling this.
     */
    async logout(): Promise<void> {
        await apiClient.post("/auth/logout");
    },

    /**
     * Uses the httpOnly refresh-token cookie (set by the server) to obtain
     * a new access token without requiring the user to log in again.
     *
     * NOTE: For this to work, the API server must set the refresh token as
     * an httpOnly, SameSite=Strict cookie. This prevents XSS token theft.
     */
    async refreshToken(): Promise<Pick<AuthResponse, "accessToken">> {
        const { data } = await apiClient.post<ApiResponse<Pick<AuthResponse, "accessToken">>>(
            "/auth/refresh",
        );
        return data.data;
    },
};

export default authService;
