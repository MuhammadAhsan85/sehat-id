"use client";

import { useAuth } from "@/hooks/useAuth";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { User as UserIcon, Heart, Search, CheckCircle2, Droplets } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const t = useTranslations("profile");

    // Derive initials from user name (fall back to "U")
    const initials = user?.name
        ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
        : "U";

    const displayName = user?.name ?? "Donor";
    const displayEmail = user?.email ?? "";
    const bloodGroup = (user as { bloodGroup?: string } | null)?.bloodGroup ?? "—";

    return (
        <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
            <main id="main-content" className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-10"
                >
                    {/* Profile card */}
                    <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-bl-full -mr-8 -mt-8 opacity-40"></div>

                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#C41C1C] text-4xl font-black text-white shadow-xl shadow-red-200 rotate-3"
                            aria-label={`Profile picture for ${displayName}`}
                        >
                            {initials}
                        </motion.div>

                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{displayName}</h1>
                        {displayEmail && (
                            <p className="mt-1 text-base font-medium text-slate-400">{displayEmail}</p>
                        )}

                        <div className="mt-4 inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-2xl">
                            <Droplets className="text-[#C41C1C]" size={18} />
                            <p className="text-sm font-black text-slate-700">
                                {t("bloodGroup")}: <span className="text-[#C41C1C]">{bloodGroup}</span>
                            </p>
                        </div>

                        {/* Status pills */}
                        <div className="mt-6 flex items-center justify-center gap-3" aria-label="Donor status">
                            <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                                <CheckCircle2 size={14} /> {t("verifiedDonor")}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-xl bg-[#C41C1C]/5 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#C41C1C] ring-1 ring-red-100">
                                <span className="w-2 h-2 rounded-full bg-[#C41C1C] animate-pulse"></span> {t("available")}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
                            {[
                                { label: t("stats.lastDonated"), value: "—", color: "bg-slate-50 text-slate-900" },
                                { label: t("stats.totalDonations"), value: "0", color: "bg-slate-50 text-slate-900" },
                                { label: t("stats.eligibility"), value: t("stats.eligibleNow"), color: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
                            ].map(({ label, value, color }) => (
                                <div key={label} className={`rounded-2xl p-5 ${color} transition-transform hover:-translate-y-1 duration-300`}>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
                                    <p className="mt-2 text-lg font-black">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-xl font-black text-slate-900 tracking-tight ml-2">{t("quickActions.title")}</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Link
                                href={ROUTES.BECOME_DONOR}
                                className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-red-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#C41C1C] shadow-sm group-hover:bg-[#C41C1C] group-hover:text-white transition-colors">
                                        <Heart size={20} />
                                    </div>
                                    <span className="text-sm font-black text-slate-700">{t("quickActions.updateInfo")}</span>
                                </div>
                                <svg className="h-5 w-5 text-slate-300 group-hover:text-[#C41C1C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href={ROUTES.FIND_DONORS}
                                className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-red-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#C41C1C] shadow-sm group-hover:bg-[#C41C1C] group-hover:text-white transition-colors">
                                        <Search size={20} />
                                    </div>
                                    <span className="text-sm font-black text-slate-700">{t("quickActions.findDonors")}</span>
                                </div>
                                <svg className="h-5 w-5 text-slate-300 group-hover:text-[#C41C1C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
