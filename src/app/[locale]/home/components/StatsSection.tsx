"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function StatsSection() {
    const t = useTranslations("home");

    const stats = [
        {
            id: "donors",
            value: "2,847",
            label: t("statsActivedonors"),
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            id: "matches",
            value: "438",
            label: t("statsMatched"),
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            ),
        },
        {
            id: "cities",
            value: "6",
            label: t("statsCities"),
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 22V4c0-.5.5-1 1-1h10c.5 0 1 .5 1 1v18" />
                    <path d="M6 18h12" />
                    <path d="M10 22v-4h4v4" />
                    <path d="M2 22h20" />
                    <path d="M9 6h1" />
                    <path d="M14 6h1" />
                    <path d="M9 10h1" />
                    <path d="M14 10h1" />
                    <path d="M9 14h1" />
                    <path d="M14 14h1" />
                </svg>
            ),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-50"
            >
                <div className="grid grid-cols-1 divide-y divide-slate-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            variants={itemVariants}
                            className="flex flex-col items-center gap-4 px-12 py-16 text-center hover:bg-slate-50/50 transition-colors duration-300"
                        >
                            <div className="text-[#C41C1C] scale-125 mb-2">{stat.icon}</div>
                            <p className="text-5xl font-extrabold tracking-tight text-slate-900">
                                {stat.value}
                            </p>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
