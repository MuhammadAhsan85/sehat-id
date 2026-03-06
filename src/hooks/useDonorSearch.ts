"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDonorStore } from "@/store/donor.store";
import type { DonorSearchFilters } from "@/types/donor";

const DEBOUNCE_MS = 400;

/**
 * Manages donor search state with debounced API calls.
 *
 * Usage:
 * ```tsx
 * const { filters, results, isLoading, updateFilter } = useDonorSearch();
 * ```
 */
export function useDonorSearch() {
    const { filters, results, total, isLoading, error, setFilters, fetchDonors, resetFilters } =
        useDonorStore();

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /** Updates a single filter field and debounces the API fetch. */
    const updateFilter = useCallback(
        (key: keyof DonorSearchFilters, value: DonorSearchFilters[typeof key]) => {
            setFilters({ [key]: value });

            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                fetchDonors();
            }, DEBOUNCE_MS);
        },
        [setFilters, fetchDonors],
    );

    /** Trigger initial fetch on component mount. */
    useEffect(() => {
        fetchDonors();
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        filters,
        results,
        total,
        isLoading,
        error,
        updateFilter,
        resetFilters,
        refetch: fetchDonors,
    };
}
