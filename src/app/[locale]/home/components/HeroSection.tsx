"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { BLOOD_GROUPS } from "@/constants/site";

export default function HeroSection() {
    const t = useTranslations("home");

    return (
        <section className="relative overflow-hidden bg-white pt-20 pb-24 lg:pt-32 lg:pb-36">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" as const }}
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-50/50 blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.2 }}
                    className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-slate-50 blur-3xl"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                    className="mb-10 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/50 px-4 py-1.5 backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C41C1C] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C41C1C]"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C41C1C]">
                        {t("badge")}
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]"
                >
                    {t("heroTitle1")} <br />
                    <span className="text-[#C41C1C]">{t("heroTitle2")}</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
                    className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-500"
                >
                    {t("heroDesc")}
                </motion.p>

                {/* ── SEARCH WIDGET ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.3 }}
                    className="mx-auto mt-12 max-w-4xl"
                >
                    <div className="rounded-[32px] bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
                        <form className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            {/* Blood Group Select */}
                            <div className="relative w-full md:w-[30%] group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-slate-400 group-focus-within:text-[#C41C1C]">
                                    <span className="material-symbols-outlined text-xl leading-none">water_drop</span>
                                </div>
                                <select className="w-full bg-slate-50 border-none rounded-2xl h-14 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#C41C1C]/20 transition-all appearance-none cursor-pointer">
                                    <option value="" className="text-slate-500 font-medium">{t("searchWidget.bloodGroup")}</option>
                                    {BLOOD_GROUPS.map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-sm leading-none">expand_more</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-10 bg-slate-300 shrink-0"></div>

                            {/* Location Search */}
                            <div className="relative w-full md:flex-1 group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-slate-400 group-focus-within:text-[#C41C1C]">
                                    <span className="material-symbols-outlined text-xl leading-none">location_on</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder={t("searchWidget.locationPlaceholder")}
                                    className="w-full bg-slate-50 border-none rounded-2xl h-14 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#C41C1C]/20 transition-all placeholder:text-slate-500 placeholder:font-medium"
                                />
                            </div>

                            {/* Search Button */}
                            <button
                                type="button"
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full md:w-auto flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                            >
                                <span className="material-symbols-outlined text-lg leading-none">search</span>
                                {t("searchWidget.button")}
                            </button>
                        </form>
                    </div>

                    {/* Quick Stats / Social Proof */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <div className="flex -space-x-3">
                            {[
                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
                                "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                            ].map((src, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                                    className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-100"
                                >
                                    <img src={src} alt="donor" className="h-full w-full object-cover" />
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.9 }}
                                className="h-10 w-10 rounded-full border-2 border-white bg-[#C41C1C] flex items-center justify-center text-[10px] font-bold text-white"
                            >
                                12K+
                            </motion.div>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                            {t.rich("socialProof", {
                                count: "12,400+",
                                span: (chunks) => <span className="font-extrabold text-slate-900 underline decoration-[#C41C1C]/30 decoration-2">{chunks}</span>
                            })}
                        </p>
                    </div>
                </motion.div>

                {/* Primary Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.5 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 md:px-0"
                >
                    <Link
                        href={ROUTES.REGISTER}
                        className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full sm:w-auto"
                    >
                        {t("registerDonor")}
                    </Link>
                    <Link
                        href={ROUTES.HOW_IT_WORKS}
                        className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 w-full sm:w-auto"
                    >
                        {t("howItWorks")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
