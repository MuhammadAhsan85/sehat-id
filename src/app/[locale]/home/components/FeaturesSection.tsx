"use client";

import React from 'react';
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
    const t = useTranslations("home.features");

    const features = [
        {
            title: t("items.verified.title"),
            desc: t("items.verified.desc"),
            icon: "verified_user"
        },
        {
            title: t("items.privacy.title"),
            desc: t("items.privacy.desc"),
            icon: "lock"
        },
        {
            title: t("items.speed.title"),
            desc: t("items.speed.desc"),
            icon: "speed"
        }
    ];

    return (
        <section className="bg-white py-32 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <div className="flex-1">
                        <span className="text-[#C41C1C] font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">
                            {t("badge")}
                        </span>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-8 leading-tight">
                            {t("title1")} <br />
                            <span className="text-[#C41C1C]">{t("title2")}</span>
                        </h2>
                        <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                            {t("subtitle")}
                        </p>

                        <div className="space-y-12">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex gap-6 group">
                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-red-50 flex items-center justify-center text-[#C41C1C] group-hover:bg-[#C41C1C] group-hover:text-white transition-all duration-300">
                                        <span className="material-symbols-outlined text-2xl">
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl font-black text-slate-900 leading-none">{feature.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="aspect-square rounded-[60px] bg-slate-50/50 overflow-hidden flex items-center justify-center p-16 relative group">
                            {/* Decorative background atoms */}
                            <div className="absolute inset-0 grid grid-cols-4 gap-4 p-8 opacity-5">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="rounded-2xl bg-[#C41C1C]" />
                                ))}
                            </div>

                            <div className="relative z-10">
                                <div className="h-64 w-64 rounded-full bg-white flex items-center justify-center shadow-[0_30px_60px_rgba(196,28,28,0.15)] relative animate-heartbeat-fast">
                                    <div className="absolute inset-0 rounded-full border-4 border-[#C41C1C]/10 border-dashed animate-spin-slow" />
                                    <span className="material-symbols-outlined text-[#C41C1C] text-[120px] font-thin">
                                        verified_user
                                    </span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-bounce">
                                    <span className="material-symbols-outlined text-emerald-500 text-4xl">shield</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
