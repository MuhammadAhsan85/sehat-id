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
    phone?: string;
    role: UserRole;
    /** Current step in the registration/onboarding flow (1-3) */
    registrationStep: number;
    /** Whether the user's identity/phone has been verified via OTP. */
    isVerified: boolean;
    /** Whether the user's profile is fully complete (CNIC, Blood Group, etc.) */
    isProfileComplete: boolean;
    /** ISO-8601 date string */
    createdAt: string;

    // Optional details collected during registration
    bloodGroup?: string;
    lastDonationDate?: string;
    lastDonatedAt?: string | null;
    city?: string;
    area?: string;
    weight?: string;
    /** Whether the donor is currently open for blood requests. */
    isAvailable?: boolean;
}

/** JWT token pair returned after successful authentication. */
export interface AuthToken {
    accessToken: string;
    /** Used to refresh the access token; stored in httpOnly cookie server-side. */
    refreshToken: string;
    /** Unix timestamp (seconds) when the access token expires. */
    expiresAt: number;
}
