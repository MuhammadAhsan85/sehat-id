// /src/i18n/routing.ts — next-intl routing configuration
// Updated to include zh locale

import { defineRouting } from "next-intl/routing";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./config";

export const routing = defineRouting({
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    // as-needed: English URLs have no prefix (/home), others get prefix (/ar/home)
    localePrefix: "as-needed",
});
