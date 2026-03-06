/**
 * User-related type definitions.
 */

/** Roles available in the system — drives RBAC. */
export type UserRole = "donor" | "patient" | "admin";

/** Core user profile returned by the API. */
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    /** ISO-8601 date string */
    createdAt: string;
    /** Whether the user's identity has been verified by an admin. */
    isVerified: boolean;
}

/** JWT token pair returned after successful authentication. */
export interface AuthToken {
    accessToken: string;
    /** Used to refresh the access token; stored in httpOnly cookie server-side. */
    refreshToken: string;
    /** Unix timestamp (seconds) when the access token expires. */
    expiresAt: number;
}
