// middleware.ts — Handles both i18n locale routing AND auth protection
// next-intl createMiddleware runs first, then auth checks layer on top

import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { PROTECTED_ROUTES, AUTH_ROUTES, ROUTES } from "@/constants/routes";

// Create the next-intl middleware (handles locale detection + cookie persistence)
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Strip locale prefix for auth checks (e.g. /ur/dashboard → /dashboard) ──
    const cleanPath = pathname.replace(/^\/(en|ur|ar)/, "") || "/";

    // Check session cookie set by the API server on login
    const sessionCookie = request.cookies.get("sehatid_session");
    const isAuthenticated = Boolean(sessionCookie?.value);

    // ── Protect private routes ────────────────────────────────────────────────
    const isProtected = PROTECTED_ROUTES.some((route) => cleanPath.startsWith(route));
    if (isProtected && !isAuthenticated) {
        // Preserve the locale prefix from the incoming URL (e.g. "/ur") so that
        // next-intl doesn't add a second prefix and cause a redirect loop.
        const localeMatch = pathname.match(/^\/(en|ur|ar|zh)(?=\/|$)/);
        const localePrefix = localeMatch ? localeMatch[0] : "";
        const loginUrl = new URL(localePrefix + ROUTES.LOGIN, request.url);
        loginUrl.searchParams.set("redirect", cleanPath);
        return NextResponse.redirect(loginUrl);
    }

    // ── Redirect authenticated users away from login/register ─────────────────
    const isAuthRoute = AUTH_ROUTES.some((route) => cleanPath === route);
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    // ── Let next-intl handle locale routing ───────────────────────────────────
    return intlMiddleware(request);
}

export const config = {
    // Match all except Next.js internals, static assets, and API routes
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
    ],
};
