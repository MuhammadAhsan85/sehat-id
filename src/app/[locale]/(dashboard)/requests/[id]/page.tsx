"use client";

import React, { useState, useEffect } from 'react';
import {
    MapPin, User, Clock, Share2, Edit3,
    CheckCircle2, Bell, Phone, Map, ChevronRight, Activity, Droplets, Navigation
} from 'lucide-react';
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityItem {
    time: string;
    text: string;
    active: boolean;
    isAI?: boolean;
}

interface RequestDetails {
    id: string;
    bloodGroup: string;
    hospital: string;
    location: string;
    patient: string;
    postedAt: string;
    units: number;
    isUrgent: boolean;
}

interface Match {
    id: string;
    name: string;
    distance: string;
    status: 'OPEN' | 'PENDING_APPROVAL' | 'ACCEPTED';
    avatar: string;
    phone: string;
    isVerified?: boolean;
    isElite?: boolean;
}

export default function RequestTrackingPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    // --- Dynamic State ---
    const [requestId, setRequestId] = useState<string>("");
    const [request, setRequest] = useState<RequestDetails | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { id } = await params;
            setRequestId(id);

            // Simulate API Fetch
            await new Promise(resolve => setTimeout(resolve, 1000));

            setRequest({
                id: id,
                bloodGroup: "B+",
                hospital: "Aga Khan Hospital",
                location: "Stadium Road, Gulshan-e-Iqbal, Karachi, Pakistan",
                patient: "Ahmed Raza (MR 8821)",
                postedAt: "45 mins ago",
                units: 2,
                isUrgent: true
            });

            setActivities([
                { time: '14:35', text: 'Donor Sara K. accepted request.', active: true },
                { time: '14:25', text: 'Donor notified in Gulshan-e-Iqbal.', active: false },
                { time: '14:22', text: 'AI matched 8 compatible donors.', active: true, isAI: true },
                { time: '14:15', text: `Blood request #${id} published.`, active: false },
            ]);

            setMatches([
                { id: '1', name: 'Sara K.', distance: '4.5km', status: 'ACCEPTED', avatar: 'Sara', phone: '+92 300 1234567', isVerified: true },
                { id: '2', name: 'Ali R.', distance: '2.1km', status: 'OPEN', avatar: 'Ali', phone: '+92 321 7654321', isElite: true },
            ]);

            setIsLoading(false);
        }
        fetchData();
    }, [params]);

    // --- Handlers ---
    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy link.");
        }
    };

    const handleCall = (name: string) => {
        toast.info(`Initiating secure call to ${name}...`);
    };

    const handleRequestConnection = (matchId: string) => {
        setMatches(matches.map(m => m.id === matchId ? { ...m, status: 'PENDING_APPROVAL' } : m));
        toast.info("Connection request sent to donor. Waiting for approval.");
    };

    // Simulated Donor Action for Demo Purposes
    const handleDonorApprove = (matchId: string) => {
        setMatches(matches.map(m => m.id === matchId ? { ...m, status: 'ACCEPTED' } : m));
        toast.success("Donor has approved your request!");
    };

    const handleViewLocation = (name: string) => {
        toast.info(`Opening live map for ${name}...`);
    };

    const handleEdit = () => {
        toast.info("Opening request editor...");
    };

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#C41C1C] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Loading Live Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-red-100 selection:text-red-900">

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Page Title & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                            <span>Dashboard</span>
                            <ChevronRight size={14} className="mx-1" />
                            <span className="text-slate-800">Request Status #{requestId}</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Request Tracking</h1>
                        <p className="text-slate-500 font-medium mt-1">Monitoring Live Blood Request for {request?.hospital}</p>
                    </motion.div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button
                            onClick={handleShare}
                            className="flex-1 md:flex-none rounded-full bg-white border-2 border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Share2 size={16} />
                            Share Request
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex-1 md:flex-none rounded-full bg-[#C41C1C] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Edit3 size={16} />
                            Edit Request
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN (1/3 Width) */}
                    <div className="space-y-6">

                        {/* Request Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
                        >
                            {/* Top Red Section */}
                            <div className="bg-[#C41C1C] py-8 text-center text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <h2 className="text-6xl font-black mb-1 relative z-10">{request?.bloodGroup}</h2>
                                <p className="text-xs font-bold tracking-widest uppercase opacity-90 relative z-10">Blood Group Required</p>
                            </div>

                            {/* Bottom White Section */}
                            <div className="p-6">
                                <div className="flex gap-2 mb-4">
                                    {request?.isUrgent && <span className="bg-red-50 text-[#C41C1C] px-3 py-1 rounded-full text-xs font-black tracking-wider">URGENT</span>}
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black tracking-wider">{request?.units} Units</span>
                                </div>

                                <h3 className="text-xl font-extrabold text-slate-900 mb-5">{request?.hospital}</h3>

                                <div className="space-y-4 text-sm font-medium text-slate-600">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-[#C41C1C] shrink-0 mt-0.5" />
                                        <p className="leading-snug">{request?.location}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User size={18} className="text-[#C41C1C] shrink-0" />
                                        <p>Patient: {request?.patient}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock size={18} className="text-[#C41C1C] shrink-0" />
                                        <p>Posted {request?.postedAt}</p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 text-center">
                                    <button className="text-[#C41C1C] font-bold text-sm hover:text-[#A01717] transition-colors hover:underline">
                                        View Medical Docs
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Activity Log Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm"
                        >
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Activity size={18} className="text-[#C41C1C]" />
                                Activity Log
                            </h3>

                            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="relative pl-6">
                                        {/* Timeline Node */}
                                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${activity.active ? 'bg-[#C41C1C]' : 'bg-slate-300'}`}></div>

                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                                            <div className="flex items-center gap-2">
                                                <p className={`text-sm ${activity.active ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                                                    {activity.text}
                                                </p>
                                                {activity.isAI && (
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                                        transition={{ repeat: Infinity, duration: 2 }}
                                                    >
                                                        <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">AI MATCH</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 shrink-0">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN (2/3 Width) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Live Status Timeline Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm overflow-x-auto no-scrollbar"
                        >
                            <h3 className="text-lg font-bold text-slate-800 mb-8">Live Status Timeline</h3>

                            <div className="relative flex justify-between min-w-[600px] mb-4 px-4">
                                {/* Connecting Line */}
                                <div className="absolute top-5 left-10 right-10 h-1 bg-slate-100 -z-10"></div>
                                <div className="absolute top-5 left-10 w-1/2 h-1 bg-[#C41C1C] -z-10"></div> {/* Progress Line */}

                                {/* Status 1: Completed */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#C41C1C] text-white flex items-center justify-center mb-3 shadow-md shadow-red-200">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-1">Completed</span>
                                    <span className="text-sm font-bold text-slate-800 text-center">Request Posted</span>
                                </div>

                                {/* Status 2: Completed */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#C41C1C] text-white flex items-center justify-center mb-3 shadow-md shadow-red-200">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-1">Completed</span>
                                    <span className="text-sm font-bold text-slate-800 text-center">AI Matching</span>
                                </div>

                                {/* Status 3: Active (Pulsing) */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#C41C1C] text-[#C41C1C] flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(196,28,28,0.3)] relative">
                                        <Bell size={18} className="animate-pulse" />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#C41C1C] rounded-full border-2 border-white"></span>
                                    </div>
                                    <span className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-1">Active</span>
                                    <span className="text-sm font-bold text-slate-800 text-center">Donor Notified</span>
                                </div>

                                {/* Status 4: Pending */}
                                <div className="flex flex-col items-center opacity-40">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                                        <User size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</span>
                                    <span className="text-sm font-bold text-slate-600 text-center">Donor Accepted</span>
                                </div>

                                {/* Status 5: Pending */}
                                <div className="flex flex-col items-center opacity-40">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</span>
                                    <span className="text-sm font-bold text-slate-600 text-center">Fulfilled</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Potential Matches */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-slate-800">Potential Matches ({matches.length})</h3>
                                <span className="text-xs font-semibold text-slate-500">Showing donors within 5km</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matches.map((match) => (
                                    <motion.div
                                        key={match.id}
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className={`bg-white rounded-3xl p-5 border shadow-sm flex flex-col h-full relative overflow-hidden transition-all ${match.status === 'ACCEPTED' ? 'border-emerald-200 shadow-emerald-50/50' : 'border-slate-200 opacity-80'}`}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.avatar}`} alt={match.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                                                        {match.name}
                                                        {match.isVerified && <CheckCircle2 size={14} className="text-blue-500" />}
                                                        {match.isElite && <Droplets size={14} className="text-[#C41C1C]" />}
                                                    </h4>
                                                    <p className="text-xs font-medium text-slate-500">{match.distance} away • {match.isVerified ? 'Verified Donor' : 'Elite Donor'}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase 
                                                ${match.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' :
                                                    match.status === 'PENDING_APPROVAL' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-blue-50 text-blue-600'}`}>
                                                {match.status.replace('_', ' ')}
                                            </span>
                                        </div>

                                        <div className="mt-auto space-y-3">
                                            {match.status === 'ACCEPTED' && (
                                                <>
                                                    <div className="bg-emerald-50 p-3 rounded-xl flex items-center justify-between border border-emerald-100 mb-2">
                                                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Contact</span>
                                                        <span className="text-emerald-700 font-bold tracking-wider">{match.phone}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCall(match.name)}
                                                        className="w-full rounded-full bg-[#C41C1C] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                                    >
                                                        <Phone size={16} />
                                                        Call Securely
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewLocation(match.name)}
                                                        className="w-full rounded-full bg-white px-6 py-3 text-sm font-bold text-[#C41C1C] border border-transparent hover:border-red-100 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <Map size={16} />
                                                        View Location
                                                    </button>
                                                </>
                                            )}

                                            {match.status === 'PENDING_APPROVAL' && (
                                                <div className="bg-slate-50 p-4 text-center border border-slate-200 border-dashed rounded-2xl flex flex-col gap-3 relative mt-2">
                                                    <div className="flex justify-between items-center text-sm px-2">
                                                        <span className="font-bold text-slate-500">Phone:</span>
                                                        <span className="font-medium text-slate-400 tracking-wider font-mono">+92 3XX XXXXXXX</span>
                                                    </div>
                                                    <div className="w-full h-px bg-slate-200 my-1"></div>
                                                    <p className="text-xs font-bold text-amber-600 mb-2">Waiting for donor approval...</p>

                                                    {/* Demo purposes button */}
                                                    <button
                                                        onClick={() => handleDonorApprove(match.id)}
                                                        className="text-[10px] w-full uppercase tracking-widest border border-slate-300 text-slate-500 font-bold py-2 px-2 rounded-xl transition-all hover:bg-slate-200 hover:text-slate-800"
                                                    >
                                                        Simulate Donor Approve
                                                    </button>
                                                </div>
                                            )}

                                            {match.status === 'OPEN' && (
                                                <button
                                                    onClick={() => handleRequestConnection(match.id)}
                                                    className="w-full rounded-full bg-slate-900 px-6 py-3.5 mt-2 text-sm font-bold text-white shadow-md shadow-slate-200 transition-all hover:bg-slate-800 hover:-translate-y-0.5"
                                                >
                                                    Request Connection
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="w-full h-64 bg-[#7CA99E] rounded-3xl relative overflow-hidden border border-slate-200 shadow-sm flex items-end justify-center pb-6"
                        >
                            {/* Fake Map Pattern (CSS) */}
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px)`,
                                backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px'
                            }}></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-[#C41C1C]/20 rounded-full animate-ping absolute"></div>
                                <div className="w-8 h-8 bg-[#C41C1C] rounded-full border-4 border-white shadow-lg relative z-10"></div>
                            </div>

                            {/* Floating Pill */}
                            <div className="relative z-10 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-[#C41C1C] animate-pulse"></span>
                                <span className="text-sm font-bold text-slate-800">{matches.filter(m => m.status === 'ACCEPTED').length} active donors attached</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </main>
        </div>
    );
}
