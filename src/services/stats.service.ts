import apiClient from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

/** Raw stat shape returned by the /stats endpoint. */
export interface ApiStat {
    key: string;
    value: string;
    label: string;
}

/** Mock data used as a fallback when the API is unavailable. */
export const MOCK_STATS: ApiStat[] = [
    { key: "active_donors", value: "2,847", label: "Active Donors" },
    { key: "requests_matched", value: "438", label: "Requests Matched" },
    { key: "major_cities", value: "6", label: "Major Cities" },
];

/**
 * Stats service — fetches live platform metrics.
 */
const statsService = {
    /**
     * Returns platform-wide statistics (donors, matches, cities).
     * Falls back to mock data if the request fails.
     */
    async getStats(): Promise<ApiStat[]> {
        const { data } = await apiClient.get<ApiResponse<ApiStat[]>>("/stats");
        return data.data;
    },
};

export default statsService;
