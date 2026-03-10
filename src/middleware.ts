import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check for protected routes (ignoring locale prefix)
    const isProtectedRoute = routing.locales.some(locale =>
        pathname.startsWith(`/${locale}/dashboard`) ||
        pathname.startsWith(`/${locale}/admin`) ||
        pathname.startsWith(`/${locale}/requests`)
    ) || pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/requests');

    if (isProtectedRoute) {
        // [TEMPORARY DEBUGGING] Bypass auth guards to verify i18n routing UI
        // return intlMiddleware(request); 

        const hasSession = request.cookies.has('sehatid_session');
        const isVerified = request.cookies.get('sehatid_verified')?.value === 'true';

        // Find the active locale or default
        const activeLocale = routing.locales.find(locale => pathname.startsWith(`/${locale}/`)) || routing.defaultLocale;

        // Redirect to login if no session
        if (!hasSession) {
            const loginUrl = new URL(`/${activeLocale}/login`, request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Redirect to verify if not verified (and not already on verify)
        if (!isVerified && !pathname.includes('/verify')) {
            return NextResponse.redirect(new URL(`/${activeLocale}/verify`, request.url));
        }
    }

    // 2. Delegate to next-intl for all other routing/locale logic
    return intlMiddleware(request);
}

export const config = {
    // Match all paths except static assets and API
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg|.*\\.png$).*)'],
};
