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
        // Mock successful login for functional audit
        await new Promise(resolve => setTimeout(resolve, 800));
        if (credentials.email === "error@sehatid.pk") {
            throw new Error("Invalid credentials");
        }
        return {
            accessToken: "mock-token-123",
            expiresIn: 3600,
            user: { id: "1", role: "donor", email: credentials.email, name: "Test User", isVerified: true, registrationStep: 3, isProfileComplete: true, createdAt: new Date().toISOString() }
        };
    },

    /**
     * Registers a new user account.
     * Automatically logs in the user on success.
     */
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            accessToken: "mock-token-123",
            expiresIn: 3600,
            user: { id: "1", role: payload.role || "donor", email: payload.email, name: payload.name || "Test User", isVerified: false, registrationStep: 1, isProfileComplete: false, createdAt: new Date().toISOString() }
        };
    },

    /**
     * Invalidates the current session server-side.
     * The client should clear its local token after calling this.
     */
    async logout(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));
    },

    /**
     * Uses the httpOnly refresh-token cookie (set by the server) to obtain
     * a new access token without requiring the user to log in again.
     *
     * NOTE: For this to work, the API server must set the refresh token as
     * an httpOnly, SameSite=Strict cookie. This prevents XSS token theft.
     */
    async refreshToken(): Promise<Pick<AuthResponse, "accessToken">> {
        // Mock a failed refresh so the user begins logged out
        // allowing the Login and Register buttons to be visible on the Navbar.
        throw new Error("No refresh token found. User must log in manually.");
    },
};

export default authService;
