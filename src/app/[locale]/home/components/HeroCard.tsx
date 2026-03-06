"use client";

import { motion } from "framer-motion";

export default function HeroCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative h-[500px] w-full max-w-[440px] rounded-[40px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:ml-auto"
        >
            {/* ── Location Badge ── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -left-6 top-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-slate-200/50"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-[#C41C1C]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Current Location
                    </p>
                    <p className="text-sm font-bold text-slate-900">Lahore, Punjab</p>
                </div>
            </motion.div>

            {/* ── Illustration ── */}
            <div className="flex h-full items-center justify-center pt-8">
                <div className="relative">
                    {/* Background Soft Heart */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="relative"
                    >
                        <motion.svg
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            width="220" height="200" viewBox="0 0 220 200" fill="none" className="drop-shadow-sm"
                        >
                            <path d="M110 180C110 180 30 130 30 75C30 50 50 30 75 30C92 30 102 40 110 52C118 40 128 30 145 30C170 30 190 50 190 75C190 130 110 180 110 180Z" fill="#fef2f2" stroke="#fee2e2" strokeWidth="4" />
                        </motion.svg>

                        {/* Inner Blood Drop Card */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, type: "spring", delay: 1 }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C41C1C] shadow-lg shadow-red-200"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                                    <path d="M12 5v14m-7-7h14" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── Verification Badge ── */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -right-4 bottom-16 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-slate-200/50"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Verification
                    </p>
                    <p className="text-sm font-bold text-slate-900">Donor Verified</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
