/**
 * Centralized application route constants.
 * Use these instead of hardcoding strings throughout the app.
 */
export const ROUTES = {
    HOME: "/",
    FIND_DONORS: "/find-donors",
    BECOME_DONOR: "/become-donor",
    HOW_IT_WORKS: "/how-it-works",
    ABOUT: "/about",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    ADMIN: "/admin",
    // Footer / supplemental routes
    BLOOD_BANKS: "/blood-banks",
    EMERGENCY: "/find-donors",   // Alias — redirects to find-donors for now
    STORIES: "/about",           // Alias — success stories part of about page
    PRIVACY: "/privacy",
    TERMS: "/terms",
    COOKIES: "/cookies",
    DATA_COMPLIANCE: "/data-compliance",
    STANDARDS: "/standards",
} as const;

/** Routes that require an authenticated session. */
export const PROTECTED_ROUTES: string[] = [ROUTES.DASHBOARD, ROUTES.PROFILE, ROUTES.ADMIN];

/** Routes that should redirect to dashboard if already authenticated. */
export const AUTH_ROUTES: string[] = [ROUTES.LOGIN, ROUTES.REGISTER];
