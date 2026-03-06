// /src/i18n/config.ts — Supported locales and country/language configuration
// Add new locales or countries here as the platform expands

export const SUPPORTED_LOCALES = ["en", "ur", "ar", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** Default locale — English is always the fallback */
export const DEFAULT_LOCALE: Locale = "en";

/** Text direction per locale — controls dir="rtl" in the layout */
export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
    en: "ltr",
    ur: "rtl",
    ar: "rtl",
    zh: "ltr",
};

/** Language option shown in the Language selector dropdown */
export interface LanguageOption {
    locale: Locale;
    label: string;        // English label, e.g. "Arabic"
    nativeLabel: string;  // Label in own script, e.g. "العربية"
}

/** Country definition with its own list of available languages */
export interface Country {
    code: string;                       // ISO 3166-1 alpha-2
    flag: string;                       // emoji flag
    name: string;                       // English country name
    availableLocales: LanguageOption[]; // languages offered for this country
}

/** All selectable countries with their language options */
export const COUNTRIES: Country[] = [
    {
        code: "PK",
        flag: "🇵🇰",
        name: "Pakistan",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
            { locale: "ur", label: "Urdu", nativeLabel: "اردو" },
        ],
    },
    {
        code: "US",
        flag: "🇺🇸",
        name: "United States",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
        ],
    },
    {
        code: "GB",
        flag: "🇬🇧",
        name: "United Kingdom",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
        ],
    },
    {
        code: "SA",
        flag: "🇸🇦",
        name: "Saudi Arabia",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
            { locale: "ar", label: "Arabic", nativeLabel: "العربية" },
        ],
    },
    {
        code: "IN",
        flag: "🇮🇳",
        name: "India",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
        ],
    },
    {
        code: "CA",
        flag: "🇨🇦",
        name: "Canada",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
        ],
    },
    {
        code: "CN",
        flag: "🇨🇳",
        name: "China",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
            { locale: "zh", label: "Chinese (Simplified)", nativeLabel: "中文(简体)" },
        ],
    },
    {
        code: "AE",
        flag: "🇦🇪",
        name: "United Arab Emirates",
        availableLocales: [
            { locale: "en", label: "English", nativeLabel: "English" },
            { locale: "ar", label: "Arabic", nativeLabel: "العربية" },
        ],
    },
];

/** Look up a country by its ISO code. Returns undefined if not found. */
export function getCountry(code: string): Country | undefined {
    return COUNTRIES.find((c) => c.code === code);
}
