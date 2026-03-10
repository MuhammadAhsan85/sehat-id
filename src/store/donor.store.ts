"use client";

import { create } from "zustand";
import type { Donor, DonorSearchFilters } from "@/types/donor";
import donorService from "@/services/donor.service";

interface DonorState {
    /** Current search filters shown in the UI. */
    filters: DonorSearchFilters;
    /** Fetched donor results. */
    results: Donor[];
    /** Total matching donors across all pages. */
    total: number;
    isLoading: boolean;
    error: string | null;

    // ─── Actions ───────────────────────────────────────────────────────────
    setFilters: (filters: Partial<DonorSearchFilters>) => void;
    fetchDonors: () => Promise<void>;
    resetFilters: () => void;
}

const DEFAULT_FILTERS: DonorSearchFilters = {
    bloodGroup: "",
    city: "",
    province: "",
    isUrgent: false,
    availableOnly: false,
    page: 1,
    limit: 12,
};

export const useDonorStore = create<DonorState>((set, get) => ({
    filters: DEFAULT_FILTERS,
    results: [],
    total: 0,
    isLoading: false,
    error: null,

    setFilters: (partial) =>
        set((state) => ({
            filters: { ...state.filters, ...partial, page: 1 }, // reset to page 1 on filter change
        })),

    fetchDonors: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await donorService.searchDonors(get().filters);
            set({ results: response.data, total: response.total, isLoading: false });
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to fetch donors.";
            set({ isLoading: false, error: message });
        }
    },

    resetFilters: () => set({ filters: DEFAULT_FILTERS, results: [], total: 0 }),
}));
