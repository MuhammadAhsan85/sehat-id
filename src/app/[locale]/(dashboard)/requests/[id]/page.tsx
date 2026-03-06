"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
    Bell, User, MapPin, Clock,
    ChevronRight, CheckCircle2, Droplets,
    AlertCircle, Phone, Navigation, MoreHorizontal,
    LayoutDashboard, Heart, History, Settings, LogOut
} from 'lucide-react';
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export default function RequestTrackingPage() {
    const { user } = useAuth();
    const t = useTranslations();
    const [activeStep] = useState(2); // 0: Requested, 1: Finding Matches, 2: Donor On the Way, 3: Completed

    const timelineSteps = [
        { title: t('tracking.timeline.received'), time: '10:30 AM', status: 'completed' },
        { title: t('tracking.timeline.finding'), time: '10:45 AM', status: 'completed' },
        { title: t('tracking.timeline.committed'), time: '11:15 AM', status: 'active' },
        { title: t('tracking.timeline.transfusion'), time: t('tracking.timeline.pending'), status: 'upcoming' },
    ];

    const activityLog = [
        { id: 1, action: t('tracking.activity.requestCreated'), time: '2 hours ago', icon: <Droplets className="text-[#C41C1C]" size={14} />, color: 'bg-red-50' },
        { id: 2, action: t('tracking.activity.matchesNotified', { count: 5 }), time: '1.5 hours ago', icon: <Bell className="text-blue-500" size={14} />, color: 'bg-blue-50' },
        { id: 3, action: t('tracking.activity.donorAccepted', { name: 'Ahmed R.' }), time: '45 mins ago', icon: <CheckCircle2 className="text-green-500" size={14} />, color: 'bg-green-50' },
        { id: 4, action: t('tracking.activity.donorDistance', { distance: '2.4km' }), time: 'Just now', icon: <Navigation className="text-orange-500" size={14} />, color: 'bg-orange-50' },
    ];

    const matches = [
        { id: 1, name: 'Ahmed R.', distance: '2.4 km', eta: '8 mins', status: 'On the way' },
        { id: 2, name: 'Sara K.', distance: '3.8 km', eta: 'Matched', status: 'Available' },
    ];

    const sidebarLinks = [
        { icon: <LayoutDashboard size={18} />, label: t('sidebar.dashboard'), href: ROUTES.DASHBOARD, active: false },
        { icon: <Heart size={18} />, label: t('sidebar.requests'), href: '#', active: true },
        { icon: <History size={18} />, label: t('sidebar.history'), href: '#', active: false },
        { icon: <Settings size={18} />, label: t('sidebar.settings'), href: '#', active: false },
    ];

    return (
        <div className="min-h-screen bg-[#fdfdfd] font-sans">
            <Navbar />

            <div className="max-w-[1440px] mx-auto flex h-full min-h-[calc(100vh-72px)]">

                {/* DASHBOARD SIDEBAR (DESKTOP) */}
                <aside className="hidden lg:flex w-80 border-r border-slate-100 bg-white flex-col p-8 sticky top-[72px] h-[calc(100vh-72px)] shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-3xl mb-10 border border-slate-100"
                    >
                        <Image
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-white shadow-sm"
                            alt="Profile"
                        />
                        <div>
                            <p className="text-sm font-black text-slate-900">{user?.name || "Donor"}</p>
                            <p className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest">{t('sidebar.premium')}</p>
                        </div>
                    </motion.div>

                    <nav className="space-y-2 flex-1">
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest ${link.active
                                    ? 'text-white bg-[#C41C1C] shadow-xl shadow-red-100 border-2 border-[#C41C1C]'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 border-2 border-transparent'
                                    }`}
                            >
                                {link.icon} {link.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="flex items-center gap-4 text-slate-400 p-4 hover:text-[#C41C1C] transition-all font-black text-[10px] uppercase tracking-widest mt-auto border-t border-slate-50 pt-8 group">
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> {t('sidebar.logout')}
                    </button>
                </aside>

                {/* MAIN DASHBOARD CONTENT */}
                <main className="flex-1 p-4 lg:p-12 overflow-y-auto">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 ml-2">
                        <span>{t('sidebar.dashboard')}</span>
                        <ChevronRight size={14} className="text-slate-200" />
                        <span className="text-[#C41C1C]">{t('tracking.breadcrumb')} #REQ-2941</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">

                        {/* Left Column: Request Details & Timeline */}
                        <div className="lg:col-span-8 space-y-10">

                            {/* Request Summary Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden border border-slate-100 group"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-red-50/50 rounded-bl-[6rem] -mr-12 -mt-12 transition-all duration-700 group-hover:scale-110"></div>
                                <Droplets className="absolute top-8 right-8 text-[#C41C1C] opacity-10" size={64} />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
                                    <div className="flex items-center gap-8">
                                        <div className="w-24 h-24 rounded-3xl bg-[#C41C1C] text-white flex items-center justify-center font-black text-4xl shadow-xl shadow-red-200 rotate-2">
                                            B+
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{t('tracking.emergency')}</h2>
                                            <p className="text-slate-500 font-bold flex items-center gap-2 text-sm">
                                                <MapPin size={18} className="text-[#C41C1C]" /> Aga Khan Hospital, Karachi
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border border-emerald-100 h-fit">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> {t('tracking.searching')}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-100 relative z-10">
                                    {[
                                        { label: t('tracking.patient'), value: 'Mrs. Shamim B.' },
                                        { label: t('tracking.requiredUnits'), value: t('tracking.units', { count: 2 }) },
                                        { label: t('tracking.requestDate'), value: 'Oct 24, 2024' },
                                        { label: t('tracking.urgency'), value: t('tracking.immediate'), accent: true },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                                            <p className={`text-sm font-black ${item.accent ? 'text-[#C41C1C]' : 'text-slate-900'}`}>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Live Status Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="text-slate-900 font-black text-xl flex items-center gap-4 tracking-tight">
                                        {t('tracking.liveTitle')} <span className="text-[10px] font-black bg-[#C41C1C]/5 text-[#C41C1C] px-4 py-1.5 rounded-xl uppercase tracking-widest border border-red-100 italic">{t('tracking.realtime')}</span>
                                    </h3>
                                    <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">ID: #TRK-8821</p>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-10">
                                    {/* Timeline connecting line */}
                                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-9"></div>

                                    {timelineSteps.map((step, idx) => (
                                        <div key={idx} className="flex md:flex-col items-center gap-5 relative z-10 flex-1">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${step.status === 'completed' ? 'bg-[#C41C1C] text-white shadow-xl shadow-red-100 border-2 border-[#C41C1C]' :
                                                step.status === 'active' ? 'bg-white text-[#C41C1C] ring-8 ring-[#C41C1C]/5 scale-110 shadow-2xl border-4 border-[#C41C1C]' :
                                                    'bg-slate-50 text-slate-300 border-2 border-slate-100'
                                                }`}>
                                                {step.status === 'completed' ? <CheckCircle2 size={24} /> : <Droplets size={24} />}
                                            </div>
                                            <div className="text-left md:text-center">
                                                <p className={`text-sm font-black ${step.status !== 'upcoming' ? 'text-slate-900' : 'text-slate-300'}`}>{step.title}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Map Placeholder */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-slate-100 rounded-[3rem] h-96 relative overflow-hidden flex items-center justify-center border border-slate-100 shadow-xl group"
                            >
                                <div className="absolute inset-0 bg-[#f8f6f6] flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C41C1C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                    <div className="text-center relative z-10">
                                        <Navigation className="text-[#C41C1C] mx-auto mb-6 animate-bounce" size={48} />
                                        <p className="text-slate-900 font-black text-xl tracking-tight">{t('tracking.map.connecting')}</p>
                                        <p className="text-slate-500 text-sm mt-2 font-bold">{t('tracking.map.donorAway', { name: 'Ahmed R.', distance: '1.2km' })}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] flex items-center justify-between border border-white shadow-2xl transition-all hover:scale-[1.02]">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-[#C41C1C] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-200">
                                            <Navigation size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('tracking.map.etaLabel')}</p>
                                            <p className="text-slate-900 font-black text-2xl tracking-tighter">{t('tracking.map.etaValue', { count: 8 })}</p>
                                        </div>
                                    </div>
                                    <button className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-xl shadow-slate-200">{t('tracking.map.fullMap')}</button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Activity Log & Matches */}
                        <div className="lg:col-span-4 space-y-10">

                            {/* Activity Log */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white rounded-[3rem] p-8 shadow-sm h-fit border border-slate-50"
                            >
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <h3 className="font-black text-slate-900 text-lg tracking-tight">{t('tracking.activity.title')}</h3>
                                    <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><MoreHorizontal size={20} className="text-slate-300" /></button>
                                </div>
                                <div className="space-y-6">
                                    {activityLog.map(item => (
                                        <div key={item.id} className="flex gap-5 group px-2">
                                            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                                                {item.icon}
                                            </div>
                                            <div className="border-b border-slate-50 pb-5 flex-1">
                                                <p className="text-sm font-black text-slate-800 mb-1">{item.action}</p>
                                                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                                                    <Clock size={12} /> {item.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#C41C1C] transition-all hover:bg-red-50 rounded-2xl">{t('tracking.activity.viewAll')}</button>
                            </motion.div>

                            {/* Potential Matches */}
                            <div className="space-y-5">
                                <h3 className="font-black text-slate-900 px-6 flex items-center justify-between tracking-tight text-lg">
                                    {t('tracking.matches.title')}
                                    <span className="text-[10px] bg-[#C41C1C]/5 text-[#C41C1C] px-3 py-1 rounded-lg tracking-widest italic font-bold border border-red-50">{t('tracking.matches.nearby')}</span>
                                </h3>
                                {matches.map((match, i) => (
                                    <motion.div
                                        key={match.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group hover:-translate-y-2"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="flex items-center gap-5">
                                                <Image
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.name}`}
                                                    width={52}
                                                    height={52}
                                                    className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm"
                                                    alt={match.name}
                                                />
                                                <div>
                                                    <p className="text-slate-900 font-black text-base">{match.name}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mt-1">
                                                        <MapPin size={12} className="text-[#C41C1C]" /> {match.distance}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${match.id === 1 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                {match.eta}
                                            </span>
                                        </div>
                                        <div className="flex gap-4">
                                            <button className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex-1 flex items-center justify-center gap-3">
                                                <Phone size={16} /> {t('tracking.matches.call')}
                                            </button>
                                            <button className="bg-slate-50 text-slate-400 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-[#C41C1C] transition-all border border-slate-100 active:scale-90 shadow-sm">
                                                <AlertCircle size={22} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
