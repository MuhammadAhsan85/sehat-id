import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SITE } from "@/constants/site";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Viewport } from "next";
import { LOCALE_DIR } from "@/i18n/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // Load all weights used across the project
  weight: ["400", "500", "600", "700", "800", "900"],
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: `${SITE.NAME} — ${SITE.TAGLINE}`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
  keywords: [
    "blood donation Pakistan",
    "blood donors Karachi",
    "blood bank Pakistan",
    "emergency blood",
    "SehatID",
  ],
  authors: [{ name: SITE.NAME, url: SITE.URL }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE.URL,
    siteName: SITE.NAME,
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
    images: [{ url: SITE.OG_IMAGE, width: 1200, height: 630, alt: `${SITE.NAME} — ${SITE.TAGLINE}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
    site: SITE.TWITTER_HANDLE,
    images: [SITE.OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.NAME,
  description: SITE.DESCRIPTION,
  url: SITE.URL,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.CONTACT.PHONE,
    contactType: "customer support",
    areaServed: "PK",
    availableLanguage: ["English", "Urdu"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
};

import { Toaster } from "sonner";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = LOCALE_DIR[locale as keyof typeof LOCALE_DIR] || "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased flex flex-col min-h-screen bg-[#FAFAFA]`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-right"
              expand={false}
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: '1.25rem',
                  padding: '1rem',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                },
                className: "font-sans font-medium",
              }}
            />
          </AuthProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
