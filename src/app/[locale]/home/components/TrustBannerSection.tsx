"use client";

import React from 'react';
import { useTranslations } from "next-intl";

export default function TrustBannerSection() {
    const t = useTranslations("home.trust");

    const stats = [
        { label: t("verifiedDonors"), value: "12,400+", icon: "person_check" },
        { label: t("citiesCovered"), value: "50+", icon: "location_city" },
        { label: t("emergencyMatches"), value: "150+", icon: "favorite" },
        { label: t("verificationRate"), value: "99.8%", icon: "verified" },
    ];

    return (
        <section className="bg-white py-16 border-b border-gray-100 relative z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center text-center space-y-4 group">
                            <div className="h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#C41C1C] group-hover:bg-[#C41C1C] group-hover:text-white transition-all duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-4xl">
                                    {stat.icon}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-4xl font-black text-slate-900 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-tight px-4">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
