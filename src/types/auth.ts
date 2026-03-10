import type { UserRole } from "./user";

/** Payload for the login endpoint. */
export interface LoginCredentials {
    email: string;
    password: string;
}

/** Payload for the register endpoint. */
export interface RegisterPayload {
    name: string;
    email: string;
    phone: string;
    dob: string;
    bloodGroup: string;
    lastDonationDate: string;
    weight?: string;
    healthConditions?: string;
    province: string;
    city: string;
    area: string;
    address: string;
    password?: string;
    confirmPassword?: string;
    role: UserRole;
}

/** Shape of the `/auth/login` and `/auth/register` API response. */
export interface AuthResponse {
    user: import("./user").User;
    accessToken: string;
    /** Expiry in seconds from now. */
    expiresIn: number;
}
