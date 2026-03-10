// LanguageSelector component — appears after country selection
// Shows only the languages available for the currently selected country
// ALWAYS keeps English as the first/default option
// Selecting a language sets NEXT_LOCALE cookie → middleware loads correct translations

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { COUNTRIES, DEFAULT_LOCALE, LOCALE_DIR } from "@/i18n/config";
import type { Locale, LanguageOption } from "@/i18n/config";
import { STORAGE_COUNTRY_KEY, STORAGE_LOCALE_KEY } from "./CountrySelector";

interface LanguageSelectorProps {
    /** ISO country code to filter the language list */
    countryCode: string;
}

export default function LanguageSelector({ countryCode }: LanguageSelectorProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [activeLocale, setActiveLocale] = useState<Locale>(DEFAULT_LOCALE); // always start with English
    const [isMounted, setIsMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get the language options for the selected country
    const country = COUNTRIES.find((c) => c.code === countryCode);
    const availableLocales: LanguageOption[] = country?.availableLocales ?? [
        { locale: "en", label: "English", nativeLabel: "English" },
    ];

    // Load persisted locale on mount — but validate it against available locales
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_LOCALE_KEY) as Locale | null;
        const isAvailable = saved && availableLocales.some((l) => l.locale === saved);

        // If not explicitly saved or not available, strictly default to English
        const finalLocale = isAvailable ? saved! : DEFAULT_LOCALE;
        setActiveLocale(finalLocale);

        // Enforce the Next-Intl cookie fallback to English explicitly on first load
        if (!saved) {
            document.cookie = `NEXT_LOCALE=${DEFAULT_LOCALE}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
            localStorage.setItem(STORAGE_LOCALE_KEY, DEFAULT_LOCALE);
        }
    }, [countryCode]); // re-run when country changes

    // Close on outside click
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    // Close on Escape
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    function handleLocaleSelect(locale: Locale) {
        setActiveLocale(locale);
        setIsOpen(false);

        // Persist language selection
        localStorage.setItem(STORAGE_LOCALE_KEY, locale);

        // Set cookie so next-intl middleware picks up the locale on next request
        const dir = LOCALE_DIR[locale];
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

        // Apply RTL direction immediately to the document
        document.documentElement.dir = dir;
        document.documentElement.lang = locale;

        // Refresh so server components reload with the new locale
        router.refresh();
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render if the country only has one language (no point showing a selector)
    if (availableLocales.length <= 1) return null;

    if (!isMounted) {
        return <div className="h-8 w-[88px] rounded-full border border-gray-200 bg-gray-50 animate-pulse"></div>;
    }

    const currentLang = availableLocales.find((l) => l.locale === activeLocale) ?? availableLocales[0];

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger: native label + globe icon + chevron */}
            <button
                type="button"
                onClick={() => setIsOpen((p) => !p)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={`Selected language: ${currentLang.label}. Click to change.`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 bg-white transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-[#c41c1c] focus-visible:outline-offset-2"
            >
                {/* Globe icon */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="font-medium text-xs">{currentLang.nativeLabel}</span>
                <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                    <path d="M1.5 3.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown list — only shows languages for the current country */}
            {isOpen && (
                <ul
                    role="listbox"
                    aria-label="Select language"
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden z-50 py-1"
                >
                    {availableLocales.map((lang) => (
                        <li key={lang.locale} role="option" aria-selected={activeLocale === lang.locale}>
                            <button
                                type="button"
                                onClick={() => handleLocaleSelect(lang.locale)}
                                className={`flex items-center justify-between gap-3 w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#c41c1c08] hover:text-[#c41c1c] ${activeLocale === lang.locale ? "bg-[#c41c1c06] text-[#c41c1c] font-semibold" : "text-gray-700"}`}
                            >
                                <div className="flex flex-col">
                                    {/* English label */}
                                    <span className="text-xs text-gray-400">{lang.label}</span>
                                    {/* Native script label */}
                                    <span className="font-medium">{lang.nativeLabel}</span>
                                </div>
                                {/* Checkmark for active */}
                                {activeLocale === lang.locale && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
                                        <path d="M2 6l3 3 5-5" stroke="#c41c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
