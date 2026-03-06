"use client";

import { useState, useEffect } from "react";

interface LocationResult {
    city: string;
    province: string;
    isLoading: boolean;
    /** Coordinates if successfully obtained, null otherwise. */
    coords: { latitude: number; longitude: number } | null;
}

const FALLBACK_LOCATION = { city: "Karachi", province: "Sindh" };

/**
 * Uses the browser Geolocation API to get the user's approximate city.
 *
 * Reverse geocoding uses the free Nominatim API (no API key required).
 * Falls back to "Karachi, Sindh" if:
 * - The user denies permission.
 * - The browser doesn't support geolocation.
 * - The reverse geocode request fails.
 *
 * @returns city name, province, loading state, and raw coordinates.
 */
export function useLocation(): LocationResult {
    const [city, setCity] = useState(FALLBACK_LOCATION.city);
    const [province, setProvince] = useState(FALLBACK_LOCATION.province);
    const [isLoading, setIsLoading] = useState(false);
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !("geolocation" in navigator)) return;

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ latitude, longitude });

                try {
                    // Nominatim reverse geocoding — free, no API key needed.
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                        { headers: { "Accept-Language": "en" } },
                    );
                    const json = await res.json();
                    const addr = json.address ?? {};
                    setCity(addr.city ?? addr.town ?? addr.village ?? FALLBACK_LOCATION.city);
                    setProvince(addr.state ?? FALLBACK_LOCATION.province);
                } catch {
                    // Reverse geocode failed — keep defaults.
                } finally {
                    setIsLoading(false);
                }
            },
            () => {
                // User denied or geolocation failed — keep fallback.
                setIsLoading(false);
            },
            { timeout: 8000, maximumAge: 300_000 }, // 5-minute cache
        );
    }, []);

    return { city, province, isLoading, coords };
}
