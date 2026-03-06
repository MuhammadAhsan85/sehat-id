/**
 * Location Zustand store — updated to use country-state-city for global coverage
 *
 * getCitiesForCountry now calls City.getCitiesOfCountry() so ALL 250+ countries
 * work, not just the 8 we had in the old static locationData.ts.
 *
 * Persists selectedCountry + selectedCity to localStorage via Zustand persist.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { City } from "country-state-city";
import type { ICity } from "country-state-city";

// Re-export CityRecord type so existing consumers don't break
export type CityRecord = Pick<ICity, "name" | "stateCode">;

interface LocationState {
    selectedCountry: string;       // ISO alpha-2, e.g. "JP"
    selectedCity: string;          // city name, e.g. "Tokyo"
    availableCities: CityRecord[]; // cities for the selected country

    setCountry: (countryCode: string) => void;
    setCity: (city: string) => void;
}

/** Get all cities for a country from country-state-city */
function getCitiesForCountry(countryCode: string): CityRecord[] {
    const cities = City.getCitiesOfCountry(countryCode) ?? [];
    // Deduplicate by city name (the package sometimes has duplicates)
    const seen = new Set<string>();
    return cities.filter((c) => {
        if (seen.has(c.name)) return false;
        seen.add(c.name);
        return true;
    });
}

export const useLocationStore = create<LocationState>()(
    persist(
        (set) => ({
            selectedCountry: "PK",
            selectedCity: "Karachi",
            availableCities: getCitiesForCountry("PK"),

            setCountry(countryCode: string) {
                const cities = getCitiesForCountry(countryCode);
                set({
                    selectedCountry: countryCode,
                    availableCities: cities,
                    // Reset city to first in the new country's list
                    selectedCity: cities[0]?.name ?? "",
                });
            },

            setCity(city: string) {
                set({ selectedCity: city });
            },
        }),
        {
            name: "sehatid_location",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                selectedCountry: state.selectedCountry,
                selectedCity: state.selectedCity,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.availableCities = getCitiesForCountry(state.selectedCountry);
                }
            },
        }
    )
);
