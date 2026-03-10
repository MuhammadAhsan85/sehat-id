"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AboutPage() {
    const t = useTranslations("about");

    return (
        <>
            <main className="bg-white text-slate-900 font-sans overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0" aria-hidden="true">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl"
                        ></motion.div>
                    </div>
                    <div className="max-w-5xl mx-auto relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 rounded-full bg-red-600/10 text-red-600 text-xs font-bold uppercase tracking-widest mb-6 border border-red-600/20"
                        >
                            {t("badge")}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]"
                        >
                            {t("title")}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            {t.rich("subtitle", {
                                span: (chunks) => <span className="text-red-600">{chunks}</span>
                            })}
                        </motion.p>
                    </div>
                </section>

                {/* Our Mission Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="py-20 bg-slate-50/50"
                >
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <span className="material-symbols-outlined text-red-600 text-5xl mb-6" aria-hidden="true">format_quote</span>
                        <h2 className="text-3xl md:text-4xl font-bold italic text-slate-800 leading-snug">
                            {t("mission")}
                        </h2>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-red-600/30"></div>
                            <p className="text-sm font-bold tracking-widest text-red-600 uppercase">{t("missionLabel")}</p>
                            <div className="h-px w-12 bg-red-600/30"></div>
                        </div>
                    </div>
                </motion.section>

                {/* Core Values Grid */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeIn}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-slate-900">{t("valuesTitle")}</h2>
                            <p className="text-slate-500 mt-2">{t("valuesSubtitle")}</p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {/* Value 1 */}
                            <motion.div variants={fadeIn} className="p-8 bg-white rounded-xl border border-slate-200 hover:border-red-600/30 transition-all group shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-600/10 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-red-600">lock</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t("values.privacy.title")}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {t("values.privacy.desc")}
                                </p>
                            </motion.div>
                            {/* Value 2 */}
                            <motion.div variants={fadeIn} className="p-8 bg-white rounded-xl border border-slate-200 hover:border-red-600/30 transition-all group shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-600/10 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-red-600">medical_services</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t("values.integrity.title")}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {t("values.integrity.desc")}
                                </p>
                            </motion.div>
                            {/* Value 3 */}
                            <motion.div variants={fadeIn} className="p-8 bg-white rounded-xl border border-slate-200 hover:border-red-600/30 transition-all group shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-600/10 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-red-600">handshake</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t("values.profit.title")}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {t("values.profit.desc")}
                                </p>
                            </motion.div>
                            {/* Value 4 */}
                            <motion.div variants={fadeIn} className="p-8 bg-white rounded-xl border border-slate-200 hover:border-red-600/30 transition-all group shadow-sm hover:shadow-md">
                                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-600/10 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-red-600">article</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{t("values.transparency.title")}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {t("values.transparency.desc")}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Problem vs Solution */}
                <section className="py-24 px-6 bg-slate-50/30">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={fadeIn}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-4xl font-black text-slate-900 leading-tight">{t("lifecycleTitle")}</h2>
                                    <p className="mt-4 text-slate-600">{t("lifecycleDesc")}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-xl border border-red-100 bg-red-50/50">
                                        <h4 className="text-red-700 font-bold flex items-center gap-2 mb-2 uppercase text-xs tracking-widest">
                                            <span className="material-symbols-outlined text-lg">warning</span> {t("reality.title")}
                                        </h4>
                                        <ul className="space-y-3 text-sm text-slate-600">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-500 text-sm">close</span> {t("reality.item1")}</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-500 text-sm">close</span> {t("reality.item2")}</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-500 text-sm">close</span> {t("reality.item3")}</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 rounded-xl border border-red-600/20 bg-red-600/5">
                                        <h4 className="text-red-600 font-bold flex items-center gap-2 mb-2 uppercase text-xs tracking-widest">
                                            <span className="material-symbols-outlined text-lg">verified</span> {t("solution.title")}
                                        </h4>
                                        <ul className="space-y-3 text-sm text-slate-700">
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-600 text-sm">check_circle</span> {t("solution.item1")}</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-600 text-sm">check_circle</span> {t("solution.item2")}</li>
                                            <li className="flex gap-2"><span className="material-symbols-outlined text-red-600 text-sm">check_circle</span> {t("solution.item3")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-600/10 flex items-center justify-center pointer-events-none">
                                    <span className="material-symbols-outlined text-red-600/20 drop-shadow-sm select-none" style={{ fontSize: '12rem' }}>bloodtype</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Reach & Impact */}
                <section className="py-12 border-y border-slate-200 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            <motion.div variants={fadeIn} className="text-center">
                                <div className="text-3xl font-black text-red-600 mb-1">25k+</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t("stats.donors")}</div>
                            </motion.div>
                            <motion.div variants={fadeIn} className="text-center">
                                <div className="text-3xl font-black text-red-600 mb-1">140+</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t("stats.cities")}</div>
                            </motion.div>
                            <motion.div variants={fadeIn} className="text-center">
                                <div className="text-3xl font-black text-red-600 mb-1">8.5k+</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t("stats.lives")}</div>
                            </motion.div>
                            <motion.div variants={fadeIn} className="text-center">
                                <div className="text-3xl font-black text-red-600 mb-1">50+</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{t("stats.hospitals")}</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-5xl mx-auto rounded-[2rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("cta.title")}</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                                {t("cta.desc")}
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link
                                    href={ROUTES.REGISTER}
                                    className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 text-center"
                                >
                                    {t("cta.register")}
                                </Link>
                                <Link
                                    href={ROUTES.FIND_DONORS}
                                    className="w-full md:w-auto px-10 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center"
                                >
                                    {t("cta.requests")}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </>
    );
}
