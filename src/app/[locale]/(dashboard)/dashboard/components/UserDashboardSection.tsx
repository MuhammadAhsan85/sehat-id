"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
    Search, MapPin, Edit3, Heart, Droplet,
    Activity, CheckCircle2, Clock, Loader2
} from 'lucide-react';
import { useAuthStore } from "@/store/auth.store";
import { useRequestStore } from "@/store/request.store";
import { EditProfileModal } from "./EditProfileModal";
import { toast } from "sonner";

export function UserDashboardSection() {
    const router = useRouter();
    const { user, updateProfile } = useAuthStore();
    const { requests } = useRequestStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);

    // For a real dashboard, we'd fetch actual nearby requests from an API
    const [nearbyRequests, setNearbyRequests] = useState<any[]>([]);

    useEffect(() => {
        // Simulate fetching nearby requests
        const timer = setTimeout(() => {
            setNearbyRequests([
                { type: 'A+ POSITIVE', status: 'URGENT', name: 'Saba Khan', hospital: 'Ziauddin Hospital', distance: '1.2km', time: '2h ago' },
                { type: 'O- NEGATIVE', status: 'STABLE', name: 'Mohammed Ali', hospital: 'Civil Hospital', distance: '4.5km', time: '5h ago' },
                { type: 'B- NEGATIVE', status: 'URGENT', name: 'Zainab Bibi', hospital: 'LNH Hospital', distance: '0.8km', time: '10m ago' },
            ]);
            setIsLoadingRequests(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const isAvailable = user?.isAvailable ?? true;

    // 90-Day Cooldown Utility
    const calculateCooldown = (dateStr?: string | null) => {
        if (!dateStr) return { isCoolingDown: false, daysLeft: 0 };
        const lastDonation = new Date(dateStr);
        if (isNaN(lastDonation.getTime())) return { isCoolingDown: false, daysLeft: 0 };
        const diffTime = Math.abs(new Date().getTime() - lastDonation.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 90) return { isCoolingDown: true, daysLeft: 90 - diffDays };
        return { isCoolingDown: false, daysLeft: 0 };
    };

    const { isCoolingDown, daysLeft } = calculateCooldown(user?.lastDonatedAt || user?.lastDonationDate);

    const handleToggleAvailability = () => {
        if (isCoolingDown) {
            toast.error(`You are in a medical recovery period. You can donate again in ${daysLeft} days.`);
            return;
        }
        const newStatus = !isAvailable;
        updateProfile({ isAvailable: newStatus });
        toast.info(`Status updated to ${newStatus ? 'Available' : 'Unavailable'}`);
    };

    return (
        <div className="w-full font-sans text-slate-900 selection:bg-red-100 selection:text-red-900 px-4 py-10 sm:px-6 lg:px-8">
            <main className="max-w-6xl mx-auto space-y-10">

                {/* Greeting Section */}
                <motion.section
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Assalamualaikum{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-slate-500 font-medium">
                            <span>Your Health Dashboard</span>
                            {user?.bloodGroup && (
                                <span className="bg-red-50 border border-red-100 text-[#C41C1C] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                                    Blood Group: {user.bloodGroup}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="rounded-full bg-white border border-slate-200 px-8 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm flex items-center justify-center gap-2 group"
                    >
                        <Edit3 size={16} className="text-slate-400 group-hover:text-[#C41C1C] transition-colors" />
                        Edit Profile
                    </button>
                </motion.section>

                {/* Emergency Banner */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-gradient-to-r from-[#C41C1C] to-[#A01717] rounded-3xl p-8 text-white shadow-xl shadow-red-200/40 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <Droplet size={200} className="absolute -right-8 -top-12 text-white opacity-[0.05] pointer-events-none" />

                    <div className="relative z-10 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-red-100 font-bold text-xs tracking-widest uppercase mb-3">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            <span>Urgent Emergency</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black mb-3 text-white">Urgent: B- Required</h2>
                        <p className="text-red-50 flex items-center font-medium">
                            <MapPin size={16} className="mr-2 opacity-80" />
                            Indus Hospital, Karachi • 2.4 km away
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/find-donors")}
                        className="w-full md:w-auto rounded-full bg-white px-10 py-4 text-sm font-bold text-[#C41C1C] shadow-lg transition-all hover:bg-slate-50 hover:-translate-y-1 flex items-center justify-center gap-2 relative z-10 shrink-0"
                    >
                        <Heart size={18} fill="currentColor" />
                        Donate Now
                    </button>
                </motion.section>

                {/* Status & Need Blood Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Availability Status */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`bg-white rounded-3xl p-8 border ${isCoolingDown ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'} shadow-sm hover:shadow-md transition-shadow flex items-center justify-between`}
                    >
                        <div className="pr-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Availability Status</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                                {isCoolingDown
                                    ? `In Recovery - Eligible to donate in ${daysLeft} days. Thank you for your recent donation.`
                                    : 'Toggle your status to let hospitals know you are ready to save a life today.'}
                            </p>
                            <div className="flex items-center mt-6 gap-2">
                                {isCoolingDown ? (
                                    <>
                                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-600">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-sm text-amber-600">Cooldown Active</span>
                                    </>
                                ) : (
                                    <>
                                        <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                        <span className={`font-bold text-sm transition-colors ${isAvailable ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {isAvailable ? 'Available to Donate' : 'Currently Unavailable'}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Custom Toggle Switch */}
                        <div
                            onClick={handleToggleAvailability}
                            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 
                                ${isCoolingDown ? 'bg-slate-200 cursor-not-allowed opacity-50' : isAvailable ? 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer' : 'bg-slate-200 hover:bg-slate-300 cursor-pointer'}`}
                            role="switch"
                            aria-checked={isCoolingDown ? false : isAvailable}
                            tabIndex={0}
                            onKeyDown={(e) => { if (!isCoolingDown && (e.key === 'Enter' || e.key === ' ')) handleToggleAvailability(); }}
                        >
                            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${!isCoolingDown && isAvailable ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                    </motion.div>

                    {/* Need Blood */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-900 rounded-3xl p-8 shadow-xl flex flex-col justify-center items-start relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-slate-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 relative z-10">Need blood for a loved one?</h3>
                        <button
                            onClick={() => router.push("/find-donors")}
                            className="rounded-full bg-[#C41C1C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center gap-2 relative z-10 w-full sm:w-auto justify-center"
                        >
                            <Search size={18} />
                            Find Blood Donor
                        </button>
                    </motion.div>

                </section>

                {/* Nearby Requests */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Nearby Requests</h3>
                        <button
                            onClick={() => router.push("/active-requests")}
                            className="text-[#C41C1C] font-bold text-sm hover:text-[#A01717] transition-colors hover:underline underline-offset-4 decoration-2"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoadingRequests ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse">
                                    <div className="flex justify-between mb-5">
                                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                        <div className="h-4 w-12 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="h-6 w-3/4 bg-slate-200 rounded mb-5"></div>
                                    <div className="space-y-3 mb-6">
                                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                                        <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                                    </div>
                                    <div className="h-10 w-full bg-slate-100 rounded-full"></div>
                                </div>
                            ))
                        ) : (
                            nearbyRequests.map((req, idx) => (
                                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 flex flex-col h-full group">
                                    <div className="flex justify-between items-start mb-5">
                                        <span className="text-xs font-black text-slate-400 tracking-widest uppercase">{req.type}</span>
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${req.status === 'URGENT' ? 'bg-red-50 text-red-600 ring-1 ring-red-100' : 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'}`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-black text-slate-900 leading-tight mb-5 flex-1">
                                        {req.name}
                                    </h4>

                                    <div className="space-y-3 mb-6 text-sm font-medium text-slate-500">
                                        <p className="flex items-start">
                                            <MapPin size={16} className="mr-2 mt-0.5 text-slate-400 shrink-0" />
                                            <span>{req.hospital} • {req.distance}</span>
                                        </p>
                                        <p className="flex items-center">
                                            <Activity size={16} className="mr-2 text-slate-400 shrink-0" />
                                            <span>Requested {req.time}</span>
                                        </p>
                                    </div>

                                    <button className="w-full rounded-full bg-slate-50 border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 group-hover:border-slate-300">
                                        View Details
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </motion.section>

                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />

                {/* Stats Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                    <div className="bg-[#FFF5F5] border border-red-100 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute -right-4 -bottom-4 bg-red-100 rounded-full w-32 h-32 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center gap-2 text-[#C41C1C] font-bold mb-3 relative z-10">
                            <Heart size={20} className="fill-current opacity-80" />
                            <span>Lives Impacted</span>
                        </div>
                        <p className="text-5xl font-black text-slate-900 relative z-10">12</p>
                    </div>

                    <div className="bg-[#F0F7FF] border border-blue-100 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute -right-4 -bottom-4 bg-blue-100 rounded-full w-32 h-32 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-3 relative z-10">
                            <CheckCircle2 size={20} className="opacity-80" />
                            <span>Last Donation</span>
                        </div>
                        <p className="text-5xl font-black text-slate-900 relative z-10">
                            45<span className="text-3xl font-extrabold text-slate-500 ml-1">days ago</span>
                        </p>
                    </div>
                </motion.section>

            </main>
        </div>
    );
}
