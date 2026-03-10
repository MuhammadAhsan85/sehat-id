"use client";

import React from 'react';
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from '@/constants/routes';

export default function FinalCTASection() {
    const t = useTranslations("home.finalCta");

    return (
        <section className="py-24 bg-white px-6">
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-[40px] bg-[#C41C1C] px-8 py-20 text-center shadow-2xl shadow-red-200 lg:px-16">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="0" cy="0" r="40" fill="white" />
                            <circle cx="100" cy="100" r="40" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <span className="text-red-200 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">
                            Join the movement
                        </span>
                        <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 leading-tight">
                            {t("title")}
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-red-50/80 mb-12 font-medium">
                            {t("subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href={ROUTES.REGISTER}
                                className="w-full sm:w-auto rounded-full bg-white px-12 py-5 text-base font-black text-[#C41C1C] shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all hover:bg-red-50 hover:-translate-y-1 active:scale-95"
                            >
                                {t("register")}
                            </Link>
                            <Link
                                href={ROUTES.FIND_DONORS}
                                className="w-full sm:sm:w-auto rounded-full border-2 border-white/40 px-12 py-5 text-base font-black text-white transition-all hover:bg-white/10 hover:-translate-y-1 active:scale-95"
                            >
                                {t("find")}
                            </Link>
                        </div>
                        <p className="mt-12 text-xs font-bold text-red-200/60 tracking-[0.2em] uppercase">
                            100% Free · Fully Secure · Verified Matches
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
