"use client";

import React from 'react';
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from '@/constants/routes';

export default function ProcessSnippetSection() {
    const t = useTranslations("home.process");

    const steps = [
        {
            id: "01",
            title: t("steps.step1.title"),
            desc: t("steps.step1.desc"),
            icon: "how_to_reg"
        },
        {
            id: "02",
            title: t("steps.step2.title"),
            desc: t("steps.step2.desc"),
            icon: "location_searching"
        },
        {
            id: "03",
            title: t("steps.step3.title"),
            desc: t("steps.step3.desc"),
            icon: "handshake"
        }
    ];

    return (
        <section className="bg-[#f8f6f6] py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-[#C41C1C] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                        {t("badge")}
                    </span>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                        {t("title1")} <span className="text-[#C41C1C]">{t("title2")}</span> {t("title3")}
                    </h2>
                    <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.id} className="relative group text-center">
                            <div className="bg-white rounded-[40px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-slate-100/40 select-none group-hover:text-[#C41C1C]/10 transition-colors duration-500">
                                    {step.id}
                                </span>
                                <div className="h-20 w-20 rounded-3xl bg-red-50 mx-auto flex items-center justify-center text-[#C41C1C] mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-4xl font-light">
                                        {step.icon}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href={ROUTES.HOW_IT_WORKS}
                        className="text-[#C41C1C] font-bold hover:underline inline-flex items-center gap-2"
                    >
                        {t("viewFull")}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
