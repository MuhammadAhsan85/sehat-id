"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ImpactStorySection() {
    const t = useTranslations("home.stories");

    return (
        <section className="bg-slate-50 py-24 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C41C1C] mb-6">
                            {t("badge")}
                        </span>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {t("subtitle")}
                        </p>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-red-100" aria-hidden="true">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.5693 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.5693 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.5693 13 2.017 13H0.017C-0.535282 13 -1.017 12.5523 -1.017 12V9C-1.017 7.34315 0.326142 6 2.017 6H8.017C9.67386 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
                                </svg>
                            </div>

                            <p className="text-xl italic text-slate-800 mb-8 relative z-10">
                                "{t("story1.text")}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                                    <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" alt="Ahmed" width={48} height={48} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t("story1.name")}</h4>
                                    <p className="text-sm text-slate-500">{t("story1.location")}, Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-[40px] bg-red-100 overflow-hidden relative shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1579152276503-6090709f195d?auto=format&fit=crop&q=80&w=800"
                                alt="Medical Support"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay glass card */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                                <p className="text-sm font-medium mb-1">Impact Made</p>
                                <p className="text-2xl font-black">Connecting Lives Since 2024</p>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-slate-100 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
