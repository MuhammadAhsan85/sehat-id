"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { NavLink } from "@/types/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import CountrySelector from "./CountrySelector";
import LanguageSelector from "./LanguageSelector";
import { useLocationStore } from "@/store/location.store";

export default function Navbar() {
    const t = useTranslations("navbar");
    const pathname = usePathname();
    const { isAuthenticated, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    // Desktop navigation links translated
    const navLinks: NavLink[] = [
        { label: t("links.findDonors"), href: ROUTES.FIND_DONORS },
        { label: t("links.becomeDonor"), href: ROUTES.BECOME_DONOR },
        { label: t("links.howItWorks"), href: ROUTES.HOW_IT_WORKS },
        { label: t("links.aboutUs"), href: ROUTES.ABOUT },
    ];

    // Country comes from the global location store — CountrySelector writes it there
    const { selectedCountry } = useLocationStore();

    // Close mobile menu on navigation
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    // Close mobile menu on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setMenuOpen(false);
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300"
            ref={headerRef}
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
                aria-label={t("aria.mainNav")}
            >
                {/* ── Logo ── */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* ── Desktop nav links ── */}
                <ul className="hidden items-center gap-8 md:flex" role="list">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className={`text-sm font-semibold transition-colors duration-200 ${pathname === link.href ? "text-[#C41C1C]" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* ── Desktop right side: Country + Language + Auth ── */}
                <div className="hidden items-center gap-2 md:flex">
                    {/* Country selector — writes to global location store */}
                    <CountrySelector />

                    {/* Language selector — only visible when country has multiple languages */}
                    <LanguageSelector countryCode={selectedCountry} />

                    {/* Divider */}
                    <div className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true" />

                    {/* Auth buttons */}
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-gray-600">
                                {t("auth.hi")} <strong className="text-gray-900">{user?.name?.split(" ")[0]}</strong>
                            </span>
                            <Link
                                href={ROUTES.DASHBOARD}
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1"
                            >
                                {t("auth.dashboard")}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={ROUTES.LOGIN}
                                className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                            >
                                {t("auth.login")}
                            </Link>
                            <Link
                                href={ROUTES.REGISTER}
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1"
                            >
                                {t("auth.register")}
                            </Link>
                        </>
                    )}
                </div>

                {/* ── Hamburger (mobile only) ── */}
                <button
                    type="button"
                    aria-label={menuOpen ? t("aria.closeMenu") : t("aria.openMenu")}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
                </button>
            </nav>

            {/* ── Mobile dropdown ── */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    role="dialog"
                    aria-label={t("aria.navMenu")}
                    className="animate-fade-in border-t border-gray-100 bg-white px-4 pb-6 pt-4 md:hidden"
                >
                    {/* Mobile nav links */}
                    <ul className="space-y-1" role="list">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === link.href ? "bg-red-50 text-[#C41C1C]" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile auth buttons */}
                    <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
                        {isAuthenticated ? (
                            <Link
                                href={ROUTES.DASHBOARD}
                                className="block rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 text-center"
                            >
                                {t("auth.dashboard")}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={ROUTES.LOGIN}
                                    className="block rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 text-center"
                                >
                                    {t("auth.login")}
                                </Link>
                                <Link
                                    href={ROUTES.REGISTER}
                                    className="block rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 text-center"
                                >
                                    {t("auth.register")}
                                </Link>
                            </>
                        )}

                        {/* Country + Language selectors in mobile menu */}
                        <div className="flex items-center justify-center gap-2 pt-1">
                            <CountrySelector />
                            <LanguageSelector countryCode={selectedCountry} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

// ── Icons ─────────────────────────────────────────────────────────────────

function HamburgerIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
