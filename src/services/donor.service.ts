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
        // Mock data with more variation to test filters
        const MOCK_DONORS: Donor[] = [
            { id: "1", name: 'Ahmed R.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'O+', lastDonationDate: '2023-11-15', donationCount: 12, isAvailable: true, isUrgent: true, phone: '+92 300 1112223' },
            { id: "2", name: 'Sara K.', isVerified: true, city: 'Karachi', province: 'Sindh', bloodGroup: 'B-', lastDonationDate: '2023-09-10', donationCount: 4, isAvailable: true, isUrgent: false, phone: '+92 300 4445556' },
            { id: "3", name: 'Zubair M.', isVerified: true, city: 'Lahore', province: 'Punjab', bloodGroup: 'AB+', lastDonationDate: '2024-01-20', donationCount: 8, isAvailable: true, isUrgent: true, phone: '+92 311 7778889' },
            { id: "4", name: 'Fatima L.', isVerified: true, city: 'Islamabad', province: 'ICT', bloodGroup: 'O-', lastDonationDate: null, donationCount: 0, isAvailable: true, isUrgent: false, phone: '+92 333 0001112' },
            { id: "5", name: 'Kamran S.', isVerified: false, city: 'Karachi', province: 'Sindh', bloodGroup: 'B+', lastDonationDate: '2023-12-01', donationCount: 3, isAvailable: true, isUrgent: true, phone: '+92 344 3334445' },
            { id: "6", name: 'Mariam A.', isVerified: true, city: 'Faisalabad', province: 'Punjab', bloodGroup: 'A+', lastDonationDate: '2023-10-10', donationCount: 6, isAvailable: true, isUrgent: false, phone: '+92 322 6667778' },
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

                if (filters.isUrgent !== undefined) {
                    filtered = filtered.filter(d => d.isUrgent === filters.isUrgent);
                }

                if (filters.availableOnly) {
                    filtered = filtered.filter(d => d.isAvailable);
                }

                // Simulate distance filtering if radius is provided (mock logic)
                if (filters.distance) {
                    filtered = filtered.slice(0, Math.max(1, Math.floor(filtered.length * (filters.distance / 100))));
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
    async updateProfile(userId: string, updates: Partial<Donor>): Promise<void> {
        console.log(`[donorService] UPDATING PROFILE for ${userId}:`, updates);
        await new Promise(resolve => setTimeout(resolve, 1000));
    },
};

export default donorService;
