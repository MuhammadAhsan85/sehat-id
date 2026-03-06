"use client";

import { useState, useEffect } from "react";
import statsService, { MOCK_STATS, type ApiStat } from "@/services/stats.service";

interface UseStatsResult {
    stats: ApiStat[];
    isLoading: boolean;
    error: string | null;
    /** Whether the displayed data is from the API (true) or mock fallback (false). */
    isLive: boolean;
}

/**
 * Fetches platform statistics on mount, falls back to mock data
 * if the API is unreachable (e.g., during development).
 */
export function useStats(): UseStatsResult {
    const [stats, setStats] = useState<ApiStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setIsLoading(true);
            setError(null);
            try {
                const data = await statsService.getStats();
                if (!cancelled) {
                    setStats(data);
                    setIsLive(true);
                }
            } catch {
                if (!cancelled) {
                    // Graceful degradation — show mock data with no user-visible error.
                    setStats(MOCK_STATS);
                    setIsLive(false);
                    setError(null);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { stats, isLoading, error, isLive };
}
