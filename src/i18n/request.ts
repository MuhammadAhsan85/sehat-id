// /src/i18n/request.ts — Server-side request configuration for next-intl
// Runs on each request to load the correct locale messages

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
    // Get the locale for this request
    let locale = await requestLocale;

    // Fall back to default if locale is invalid
    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale;
    }

    // Load the translation messages for this locale
    const messages = await import(`../../messages/${locale}/common.json`);

    return {
        locale,
        messages: messages.default,
    };
});
