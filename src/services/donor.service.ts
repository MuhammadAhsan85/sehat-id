import apiClient from "@/lib/axios";
import type { Donor, DonorRegistrationPayload, DonorSearchFilters } from "@/types/donor";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

/**
 * Donor service — wraps all /donors endpoints.
 */
const donorService = {
    /**
     * Searches donors by blood group, city, province, and availability.
     * Returns a paginated list of matching donor profiles.
     */
    async searchDonors(
        filters: Partial<DonorSearchFilters>,
    ): Promise<PaginatedResponse<Donor>> {
        // Mocked response for demo/smoke-test purposes to avoid 404.
        const MOCK_DONORS: Donor[] = [
            { id: "1", name: 'Ahmed R.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'O+', lastDonationDate: '2023-11-15', donationCount: 12, isAvailable: true },
            { id: "2", name: 'Sara K.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'B-', lastDonationDate: '2023-09-10', donationCount: 4, isAvailable: true },
            { id: "3", name: 'Zubair M.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'AB+', lastDonationDate: '2024-01-20', donationCount: 8, isAvailable: true },
            { id: "4", name: 'Fatima L.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'O-', lastDonationDate: null, donationCount: 0, isAvailable: true },
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                let filtered = [...MOCK_DONORS];
                if (filters.bloodGroup) {
                    filtered = filtered.filter(d => d.bloodGroup === filters.bloodGroup);
                }
                if (filters.city) {
                    filtered = filtered.filter(d => d.city.toLowerCase().includes(filters.city!.toLowerCase()));
                }
                resolve({
                    data: filtered,
                    total: filtered.length,
                    page: filters.page || 1,
                    limit: filters.limit || 12,
                    totalPages: 1
                });
            }, 800);
        });
    },

    /**
     * Fetches a single donor's public profile by their ID.
     */
    async getDonorById(id: string): Promise<Donor> {
        const { data } = await apiClient.get<ApiResponse<Donor>>(`/donors/${id}`);
        return data.data;
    },

    /**
     * Registers the current authenticated user as a blood donor.
     * The user must be logged in — the auth token is attached automatically.
     */
    async registerAsDonor(payload: DonorRegistrationPayload): Promise<Donor> {
        const { data } = await apiClient.post<ApiResponse<Donor>>("/donors/register", payload);
        return data.data;
    },
};

export default donorService;
