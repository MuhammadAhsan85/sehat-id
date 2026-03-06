/** Valid blood groups accepted by the platform. */
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

/** A registered blood donor's public profile. */
export interface Donor {
    id: string;
    name: string;
    bloodGroup: BloodGroup;
    city: string;
    province: string;
    isAvailable: boolean;
    lastDonationDate: string | null;
    donationCount: number;
    isVerified: boolean;
}

/** Filters used in the donor search UI and API query. */
export interface DonorSearchFilters {
    bloodGroup: BloodGroup | "";
    city: string;
    province: string;
    availableOnly: boolean;
    page: number;
    limit: number;
}

/** Payload to register a new donor profile. */
export interface DonorRegistrationPayload {
    bloodGroup: BloodGroup;
    city: string;
    province: string;
    dateOfBirth: string;
    weight: number;
    hasChronicIllness: boolean;
    lastDonationDate?: string;
}
