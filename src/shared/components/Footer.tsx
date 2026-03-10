"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import Logo from "./Logo";

export default function Footer() {
    const t = useTranslations("footer");

    const platformLinks = [
        { label: t("links.findBlood"), href: ROUTES.FIND_DONORS },
        { label: t("links.becomeDonor"), href: ROUTES.BECOME_DONOR },
        { label: t("links.bloodBanks"), href: ROUTES.BLOOD_BANKS },
        { label: t("links.emergency"), href: ROUTES.EMERGENCY },
        { label: t("links.stories"), href: ROUTES.ABOUT },
    ];

    const legalLinks = [
        { label: t("links.privacy"), href: ROUTES.PRIVACY },
        { label: t("links.terms"), href: ROUTES.TERMS },
        { label: t("links.cookies"), href: ROUTES.COOKIES },
        { label: t("links.dataCompliance"), href: ROUTES.DATA_COMPLIANCE },
        { label: t("links.healthcare"), href: ROUTES.STANDARDS },
    ];

    return (
        <footer className="border-t border-[#C41C1C]/10 bg-white">
            <div className="mx-auto w-full max-w-[1280px] px-6 py-16 pb-8">

                {/* 4-column grid */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* ── Brand column ── */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <Logo fontSize="text-2xl" iconWidth={36} iconHeight={36} />

                        {/* Tagline */}
                        <p className="text-sm leading-6 text-slate-600">
                            {t("tagline")}
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            <SocialButton label="Facebook">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </SocialButton>
                            <SocialButton label="Twitter / X">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </SocialButton>
                            <SocialButton label="Website">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </SocialButton>
                        </div>
                    </div>

                    {/* ── Platform links ── */}
                    <nav aria-label={t("sections.platform")}>
                        <h3 className="mb-6 text-base font-bold text-slate-900">{t("sections.platform")}</h3>
                        <ul className="space-y-3" role="list">
                            {platformLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-red-600">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ── Legal links ── */}
                    <nav aria-label={t("sections.legal")}>
                        <h3 className="mb-6 text-base font-bold text-slate-900">{t("sections.legal")}</h3>
                        <ul className="space-y-3" role="list">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-red-600">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ── Contact ── */}
                    <address className="not-italic">
                        <h3 className="mb-6 text-base font-bold text-slate-900">{t("sections.contact")}</h3>
                        <ul className="space-y-4" role="list">
                            <li className="flex items-start gap-3">
                                <ContactIcon>
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </ContactIcon>
                                <a href="mailto:support@sehatid.pk" className="text-sm text-slate-600 hover:text-[#C41C1C]">
                                    support@sehatid.pk
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon>
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </ContactIcon>
                                <a href="tel:+922134567890" className="text-sm text-slate-600 hover:text-[#C41C1C]">
                                    +92 21 3456 7890
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon>
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </ContactIcon>
                                <span className="text-sm text-slate-600 leading-5">
                                    {t("contact.address")}
                                </span>
                            </li>
                        </ul>
                    </address>
                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
                    <p className="text-xs text-slate-500">
                        {t("bottom.rights")}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="rounded-full bg-white border-2 border-slate-200 px-6 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center gap-1.5">
                            <svg width="11" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            {t("bottom.admin")}
                        </Link>
                        <div className="h-4 w-px bg-slate-300" aria-hidden="true" />
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400">
                            {t("bottom.secure")}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <button
            type="button"
            className="rounded-full bg-[#C41C1C] text-white transition-all hover:bg-[#A01717] hover:-translate-y-1 flex h-8 w-8 items-center justify-center shadow-lg shadow-red-200"
            aria-label={label}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                {children}
            </svg>
        </button>
    );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#C41C1C]" aria-hidden="true">
            {children}
        </svg>
    );
}
