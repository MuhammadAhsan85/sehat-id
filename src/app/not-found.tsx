import { Link } from "@/i18n/navigation";

export default function GlobalNotFound() {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className="antialiased min-h-screen bg-[#FAFAFA]" style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '1rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1 }}>404</h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', marginTop: '1rem', marginBottom: '2rem', fontWeight: 500 }}>
                        This page could not be found.
                    </p>
                    <Link
                        href="/en"
                        style={{ backgroundColor: '#C41C1C', color: 'white', padding: '0.875rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}
                    >
                        Return Home
                    </Link>
                </div>
            </body>
        </html>
    );
}
