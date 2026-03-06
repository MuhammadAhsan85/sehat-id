/**
 * CountrySelector (Navbar edition)
 *
 * ▸ Pulls ALL world countries from the `country-state-city` package (no static list)
 * ▸ Shows flag emoji + ISO code on the compact trigger button
 * ▸ Dropdown has a search/filter input — essential when the list is 250+ countries
 * ▸ Syncs with the Zustand location store (selectedCountry → cascades city list)
 * ▸ Also writes to STORAGE_COUNTRY_KEY so the LanguageSelector stays in sync
 * ▸ onCountryChange prop lets the Navbar know which language options to show
 */

"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Country } from "country-state-city";
import type { ICountry } from "country-state-city";
import { useLocationStore } from "@/store/location.store";
import { COUNTRIES } from "@/i18n/config"; // used ONLY to gate LanguageSelector

// Storage key shared with LanguageSelector
export const STORAGE_COUNTRY_KEY = "sehatid_country";
export const STORAGE_LOCALE_KEY = "sehatid_locale";

// ── Flag helper (ISO alpha-2 → emoji) ─────────────────────────────────────────
function toFlagEmoji(isoCode: string): string {
    return isoCode
        .toUpperCase()
        .split("")
        .map((ch) => String.fromCodePoint(0x1f1e6 + ch.charCodeAt(0) - 65))
        .join("");
}

// ── Has multiple languages? (for LanguageSelector visibility) ─────────────────
export function hasMultipleLocales(countryCode: string): boolean {
    const entry = COUNTRIES.find((c) => c.code === countryCode);
    return (entry?.availableLocales.length ?? 0) > 1;
}

interface CountrySelectorProps {
    onCountryChange?: (countryCode: string) => void;
}

export default function CountrySelector({ onCountryChange }: CountrySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Global location store — single source of truth
    const { selectedCountry, setCountry } = useLocationStore();

    // Build full country list once
    const allCountries: ICountry[] = useMemo(() => Country.getAllCountries(), []);

    // Filter by search query
    const filtered = useMemo(
        () =>
            query.trim()
                ? allCountries.filter((c) =>
                    c.name.toLowerCase().includes(query.toLowerCase()) ||
                    c.isoCode.toLowerCase().includes(query.toLowerCase())
                )
                : allCountries,
        [allCountries, query]
    );

    // Derive current country info
    const current = useMemo(
        () => allCountries.find((c) => c.isoCode === selectedCountry) ?? allCountries.find((c) => c.isoCode === "PK") ?? allCountries[0],
        [allCountries, selectedCountry]
    );

    // Auto-focus search when dropdown opens
    useEffect(() => {
        if (isOpen) setTimeout(() => searchRef.current?.focus(), 40);
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close on Escape
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") { setIsOpen(false); setQuery(""); }
        }
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    function handleSelect(isoCode: string) {
        setIsOpen(false);
        setQuery("");
        // 1. Zustand store (cascades city list, persists sehatid_location)
        setCountry(isoCode);
        // 2. Legacy key (LanguageSelector reads this)
        localStorage.setItem(STORAGE_COUNTRY_KEY, isoCode);
        // 3. Tell Navbar which languages to offer
        onCountryChange?.(isoCode);
    }

    const flag = toFlagEmoji(current?.isoCode ?? "PK");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-8 w-[72px] rounded-full border border-gray-200 bg-gray-50 animate-pulse"></div>;
    }

    return (
        <div ref={dropdownRef} className="relative">
            {/* ── Compact trigger: flag + ISO code ── */}
            <button
                type="button"
                onClick={() => setIsOpen((p) => !p)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={`Country: ${current?.name ?? "Pakistan"}. Click to change.`}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[#c41c1c] focus-visible:outline-offset-2"
            >
                <span className="text-base leading-none" aria-hidden="true">{flag}</span>
                <span className="font-medium text-xs">{current?.isoCode ?? "PK"}</span>
                <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                    <path d="M1.5 3.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* ── Searchable dropdown ── */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                    role="dialog"
                    aria-label="Select country"
                >
                    {/* Search input */}
                    <div className="border-b border-gray-100 p-2">
                        <div className="relative">
                            <svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search country…"
                                aria-label="Filter countries"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-7 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#c41c1c]"
                            />
                        </div>
                    </div>

                    {/* Country list */}
                    <ul
                        role="listbox"
                        aria-label="Countries"
                        className="max-h-60 overflow-y-auto py-1"
                    >
                        {filtered.length === 0 ? (
                            <li className="px-4 py-3 text-center text-sm text-gray-400">
                                No countries found
                            </li>
                        ) : (
                            filtered.map((country) => {
                                const isSelected = selectedCountry === country.isoCode;
                                return (
                                    <li key={country.isoCode} role="option" aria-selected={isSelected}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(country.isoCode)}
                                            className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors hover:bg-red-50 hover:text-red-700 ${isSelected ? "bg-red-50 text-red-700 font-semibold" : "text-gray-700"}`}
                                        >
                                            <span className="text-base leading-none shrink-0" aria-hidden="true">
                                                {toFlagEmoji(country.isoCode)}
                                            </span>
                                            <span className="truncate">{country.name}</span>
                                            <span className="ml-auto shrink-0 text-[10px] font-bold tracking-wider text-gray-400">
                                                {country.isoCode}
                                            </span>
                                            {isSelected && (
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                                    <path d="M2 6l3 3 5-5" stroke="#c41c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
