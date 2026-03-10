import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add locales here to match the routing setup (e.g. en, ur)
const locales = ['en', 'ur'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect root to default locale to prevent 404 DefaultLayout hydration errors
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${locales[0]}`, request.url));
    }

    // Check if the current route is one of the protected routes (ignoring locale prefix)
    const isProtectedRoute = locales.some(locale =>
        pathname.startsWith(`/${locale}/dashboard`) ||
        pathname.startsWith(`/${locale}/admin`) ||
        pathname.startsWith(`/${locale}/requests`)
    ) || pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/requests');

    if (isProtectedRoute) {
        // [TEMPORARY DEBUGGING] Bypass auth guards to verify i18n routing UI
        // return NextResponse.next(); // Uncomment to bypass

        // Read the cookies set by auth.store.ts
        const hasSession = request.cookies.has('sehatid_session');
        const isVerified = request.cookies.get('sehatid_verified')?.value === 'true';

        // 1. If not logged in at all -> redirect to login
        if (!hasSession) {
            // Find the active locale
            const activeLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || 'en';
            const loginUrl = new URL(`/${activeLocale}/login`, request.url);
            // Optionally append a redirect parameter
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // 2. If logged in but NOT verified -> redirect to /verify
        if (!isVerified) {
            // Prevent infinite loops if they are already on /verify, but /verify isn't in protected routes
            const activeLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || 'en';
            if (!pathname.includes('/verify')) {
                return NextResponse.redirect(new URL(`/${activeLocale}/verify`, request.url));
            }
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
