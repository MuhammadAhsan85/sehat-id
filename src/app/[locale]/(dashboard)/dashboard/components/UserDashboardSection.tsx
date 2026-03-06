"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";

interface StatCardProps {
    label: string;
    value: string;
    sub?: string;
    accent?: boolean;
    index: number;
}

interface BloodRequest {
    id: string;
    patient: string;
    bloodGroup: string;
    city: string;
    urgency: "critical" | "moderate" | "low";
    postedAt: string;
}

const BLOOD_REQUESTS: BloodRequest[] = [
    { id: "1", patient: "Ahmad R.", bloodGroup: "B+", city: "Karachi", urgency: "critical", postedAt: "2 hrs ago" },
    { id: "2", patient: "Sara K.", bloodGroup: "O−", city: "Lahore", urgency: "moderate", postedAt: "5 hrs ago" },
    { id: "3", patient: "Usman T.", bloodGroup: "A+", city: "Islamabad", urgency: "low", postedAt: "1 day ago" },
];

function StatCardItem({ label, value, sub, accent, index }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 ${accent ? "border-red-100" : "border-slate-100"}`}
        >
            <p className={`text-4xl font-black tracking-tight ${accent ? "text-[#C41C1C]" : "text-slate-900"}`}>{value}</p>
            <p className="mt-2 text-sm font-bold text-slate-700">{label}</p>
            {sub && <p className="mt-1 text-xs font-medium text-slate-400">{sub}</p>}
        </motion.div>
    );
}

export function UserDashboardSection() {
    const t = useTranslations("dashboard");

    const STATS = [
        { label: t("stats.totalDonations"), value: "0", sub: t("stats.totalDonationsSub") },
        { label: t("stats.requestsHelped"), value: "0", sub: t("stats.requestsHelpedSub") },
        { label: t("stats.daysUntilEligible"), value: "—", sub: t("stats.daysUntilEligibleSub"), accent: true },
        { label: t("stats.donorRank"), value: t("stats.rankNew"), sub: t("stats.donorRankSub") },
    ];

    const URGENCY_STYLES: Record<BloodRequest["urgency"], string> = {
        critical: "bg-red-50 text-red-700 ring-1 ring-red-200",
        moderate: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    };

    return (
        <section className="w-full flex-1 px-4 py-12 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="mx-auto max-w-7xl space-y-12">

                {/* Welcome */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C41C1C] ml-1">{t("badge")}</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{t("welcome")}</h1>
                        <p className="mt-3 text-base font-medium text-slate-500 max-w-2xl">{t("subtitle")}</p>
                    </div>
                    <Link href={ROUTES.BECOME_DONOR} className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center gap-2 group">
                        {t("updateProfile")}
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </motion.div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <StatCardItem key={s.label} {...s} index={i} />
                    ))}
                </div>

                {/* Table + Quick Actions */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-white">
                                <h2 className="text-lg font-black text-slate-900">{t("activeRequests.title")}</h2>
                                <Link href={ROUTES.FIND_DONORS} className="text-sm font-bold text-[#C41C1C] hover:text-[#A01717] transition-colors">{t("activeRequests.viewAll")} →</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-50 bg-slate-50/50 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                                            <th className="px-8 py-4">{t("activeRequests.table.patient")}</th>
                                            <th className="px-8 py-4">{t("activeRequests.table.group")}</th>
                                            <th className="px-8 py-4">{t("activeRequests.table.city")}</th>
                                            <th className="px-8 py-4">{t("activeRequests.table.urgency")}</th>
                                            <th className="px-8 py-4">{t("activeRequests.table.posted")}</th>
                                            <th className="px-8 py-4 sr-only">{t("activeRequests.table.action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {BLOOD_REQUESTS.map((req) => (
                                            <tr key={req.id} className="transition-colors hover:bg-slate-50/30 group">
                                                <td className="px-8 py-5 font-bold text-slate-800">{req.patient}</td>
                                                <td className="px-8 py-5">
                                                    <span className="rounded-xl bg-red-50 px-3 py-1 text-xs font-black text-[#C41C1C] ring-1 ring-red-100">
                                                        {req.bloodGroup}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 font-medium text-slate-600">{req.city}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`inline-flex items-center rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-wider ${URGENCY_STYLES[req.urgency]}`}>
                                                        {t(`activeRequests.urgency.${req.urgency}`)}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 font-medium text-slate-400">
                                                    {req.postedAt}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button type="button" className="text-sm font-bold text-[#C41C1C] hover:text-[#A01717] transition-all opacity-0 group-hover:opacity-100">
                                                        {t("activeRequests.table.action")}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <aside className="flex flex-col gap-6">
                        <h2 className="text-lg font-black text-slate-900 ml-1">{t("quickActions.title")}</h2>
                        {[
                            { title: t("quickActions.findDonors.title"), desc: t("quickActions.findDonors.desc"), href: ROUTES.FIND_DONORS, cta: t("quickActions.findDonors.cta") },
                            { title: t("quickActions.becomeDonor.title"), desc: t("quickActions.becomeDonor.desc"), href: ROUTES.BECOME_DONOR, cta: t("quickActions.becomeDonor.cta") },
                            { title: t("quickActions.myProfile.title"), desc: t("quickActions.myProfile.desc"), href: ROUTES.PROFILE, cta: t("quickActions.myProfile.cta") },
                        ].map((a, i) => (
                            <motion.div
                                key={a.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200"
                            >
                                <h3 className="text-base font-bold text-slate-900">{a.title}</h3>
                                <p className="mt-1 text-sm font-medium text-slate-500 leading-relaxed">{a.desc}</p>
                                <Link href={a.href} className="mt-4 inline-flex items-center text-sm font-bold text-[#C41C1C] hover:text-[#A01717] transition-colors group">
                                    {a.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </aside>
                </div>
            </div>
        </section>
    );
}
