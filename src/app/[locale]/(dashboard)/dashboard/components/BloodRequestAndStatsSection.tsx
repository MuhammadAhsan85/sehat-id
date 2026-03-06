// BloodRequestAndStatsSection — dashboard footer (responsive 4-col layout)
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const PLATFORM_LINKS = [
    { label: "Find Blood Donors", href: ROUTES.FIND_DONORS },
    { label: "Become a Donor", href: ROUTES.BECOME_DONOR },
    { label: "Blood Bank Directory", href: "#" },
    { label: "Emergency Requests", href: "#" },
    { label: "Success Stories", href: "#" },
];

const LEGAL_LINKS = [
    { label: "Privacy Policy", href: ROUTES.PRIVACY ?? "#" },
    { label: "Terms of Service", href: ROUTES.TERMS ?? "#" },
    { label: "Cookie Policy", href: ROUTES.COOKIES ?? "#" },
    { label: "Data Compliance", href: ROUTES.DATA_COMPLIANCE ?? "#" },
    { label: "Healthcare Standards", href: ROUTES.STANDARDS ?? "#" },
];

export function BloodRequestAndStatsSection() {
    return (
        <footer className="w-full border-t border-[#C41C1C1a] bg-white" aria-label="Site footer">
            <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="flex flex-col gap-5">
                        <Link href={ROUTES.HOME} className="flex w-fit items-center gap-2.5" aria-label="SehatID Home">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C41C1C]">
                                <svg width="22" height="27" viewBox="0 0 22 27" fill="white" aria-hidden="true">
                                    <path d="M11 0C11 0 0 11 0 18c0 6.075 4.924 11 11 11s11-4.925 11-11C22 11 11 0 11 0Z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold leading-none">
                                <span className="text-slate-900">Sehat</span>
                                <span className="text-[#C41C1C]">ID</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-600">
                            Empowering Pakistan through secure blood donation connectivity. Bridging the gap between donors and those in urgent need.
                        </p>
                    </div>

                    {/* Platform */}
                    <nav aria-label="Platform">
                        <h2 className="mb-6 text-base font-bold text-slate-900">Platform</h2>
                        <ul className="flex flex-col gap-3">
                            {PLATFORM_LINKS.map((l) => (
                                <li key={l.label}><Link href={l.href} className="text-sm text-slate-600 transition-colors hover:text-[#C41C1C]">{l.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    {/* Legal */}
                    <nav aria-label="Legal">
                        <h2 className="mb-6 text-base font-bold text-slate-900">Legal</h2>
                        <ul className="flex flex-col gap-3">
                            {LEGAL_LINKS.map((l) => (
                                <li key={l.label}><Link href={l.href} className="text-sm text-slate-600 transition-colors hover:text-[#C41C1C]">{l.label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <address className="not-italic">
                        <h2 className="mb-6 text-base font-bold text-slate-900">Contact</h2>
                        <ul className="flex flex-col gap-4 text-sm text-slate-600">
                            <li><a href="mailto:support@sehatid.pk" className="hover:text-[#C41C1C]">support@sehatid.pk</a></li>
                            <li><a href="tel:+922134567890" className="hover:text-[#C41C1C]">+92 21 3456 7890</a></li>
                            <li>Karachi Innovation Center,<br />Sindh, Pakistan</li>
                        </ul>
                    </address>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
                    <p className="text-xs text-slate-500">© 2024 Sehat ID. All rights reserved. Registered Life-Saving Organization in Pakistan.</p>
                    <div className="flex items-center gap-6">
                        <Link href={ROUTES.ADMIN ?? "/admin"} className="text-xs font-medium text-slate-500 hover:text-[#C41C1C]">Admin Login</Link>
                        <div className="h-4 w-px bg-slate-300" aria-hidden="true" />
                        <span className="text-[10px] font-semibold tracking-wider text-slate-400">VERIFIED SECURE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
