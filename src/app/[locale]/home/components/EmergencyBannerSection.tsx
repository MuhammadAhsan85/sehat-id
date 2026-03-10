"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

const URGENT_TAGS = [
    { label: "B− Karachi", urgency: "critical" },
    { label: "O+ Lahore", urgency: "moderate" },
    { label: "A− Islamabad", urgency: "critical" },
    { label: "AB+ Peshawar", urgency: "critical" },
    { label: "O− Quetta", urgency: "critical" },
    { label: "A+ Multan", urgency: "critical" },
] as const;

// Bell icon
function BellIcon() {
    return (
        <svg width="16" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/90" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="0" />
        </svg>
    );
}

// Blood drop icon for tags
function BloodDropIcon({ className }: { className?: string }) {
    return (
        <svg width="14" height="16" viewBox="0 0 24 30" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 0C12 0 1 12 1 19c0 6.075 4.924 11 11 11s11-4.925 11-11C23 12 12 0 12 0Z" />
        </svg>
    );
}

export default function EmergencyBannerSection() {
    const t = useTranslations("home.emergency");

    return (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-[#f8f6f6]" aria-label="Active blood request alerts">
            {/* Red emergency card */}
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#B71C1C] p-10 shadow-2xl shadow-red-200">

                {/* Decorative radial glow — top-right */}
                <div
                    className="pointer-events-none absolute right-0 top-0 h-96 w-[500px] opacity-20"
                    style={{
                        background:
                            "radial-gradient(ellipse 70.71% 70.71% at 50% 50%, white 0%, transparent 100%)",
                    }}
                    aria-hidden="true"
                />

                {/* Top row: heading + CTA */}
                <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4">
                        {/* "Urgent Emergency" eyebrow */}
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">
                                {t("badge")}
                            </span>
                        </div>

                        <h2 className="text-3xl font-black text-white leading-tight sm:text-4xl">
                            {t("title1")} <br />
                            <span className="text-red-200">{t("title2")}</span>
                        </h2>

                        <p className="max-w-xl text-lg text-red-50/80 leading-relaxed font-medium">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                        <Link
                            href={ROUTES.FIND_DONORS}
                            className="inline-flex items-center rounded-full bg-white px-10 py-4 text-sm font-black text-[#B71C1C] shadow-xl transition-all hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-white"
                        >
                            {t("button")}
                            <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Scrollable urgency tags */}
                <div className="relative mt-12 overflow-hidden px-2">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
                        {URGENT_TAGS.map(({ label, urgency }) => (
                            <div
                                key={label}
                                className="flex h-14 shrink-0 items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-8 backdrop-blur-md snap-center"
                                role="status"
                                aria-label={`Urgent request: ${label}`}
                            >
                                <BloodDropIcon
                                    className={urgency === "moderate" ? "text-yellow-300" : "text-white"}
                                />
                                <span className="text-sm font-black text-white whitespace-nowrap tracking-wide">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
