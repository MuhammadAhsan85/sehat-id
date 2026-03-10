'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import {
    MapPin, Info, Phone, Activity, Heart,
    XCircle, PlusSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useRequestStore } from '@/store/request.store';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes';
import type { BloodRequest } from '@/types/request';

export default function AIEmergencyAlert() {
    const params = useParams();
    const router = useRouter();
    const requestId = params.id as string;

    const { getRequestById, updateRequestStatus } = useRequestStore();
    const { user } = useAuthStore();

    const [request, setRequest] = useState<BloodRequest | undefined>(undefined);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);

    useEffect(() => {
        const found = getRequestById(requestId);
        setRequest(found);
    }, [requestId, getRequestById]);

    if (!request) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 min-h-[60vh]">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center max-w-sm w-full">
                    <XCircle size={48} className="text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Alert Not Found</h2>
                    <p className="text-slate-500 font-medium text-sm mb-6">This emergency request may have been fulfilled or expired.</p>
                    <button
                        onClick={() => router.push(ROUTES.DASHBOARD)}
                        className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </main>
        );
    }

    const isCompatible = user?.bloodGroup === request.bloodGroup;
    // Calculate a fake distance if none is provided
    const distance = request.locationDistance || "3.2 KM";
    // Fake last donation gap
    const lastDonationGap = "3 months";

    const handleAccept = async () => {
        setIsAccepting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        updateRequestStatus(request.id, "accepted");
        toast.success("Thank you! The hospital has been notified.", {
            description: "They will contact you shortly.",
        });
        router.push(`/requests/${request.id}`);
    };

    const handleDismiss = async () => {
        setIsDismissing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        toast.info("Request dismissed.", {
            description: "We will notify the next available donor.",
        });
        router.push(ROUTES.DASHBOARD);
    };

    return (
        <div className="bg-[#FAFAFA] font-sans text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900 w-full min-h-screen">

            {/* Main Content Area */}
            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">

                {/* Top Emergency Red Banner */}
                <div className="w-full bg-[#C41C1C] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-red-200/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center shrink-0">
                            <MapPin size={24} className="text-white animate-bounce" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Matched Emergency Alert</h1>
                            <p className="text-red-100 font-medium mt-1">Urgent Blood Request Near You</p>
                        </div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 flex items-center gap-2 relative z-10">
                        <Activity size={16} className="text-red-100" />
                        <span className="text-sm font-bold tracking-widest uppercase">{distance} Away</span>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN (Main Details - span 2) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] h-full flex flex-col">

                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                                <div>
                                    <p className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-[#C41C1C] animate-pulse"></span>
                                        Immediate Action Required
                                    </p>
                                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Blood Group: {request.bloodGroup} Required</h2>
                                    <p className="text-slate-500 font-medium flex items-center gap-1.5">
                                        <MapPin size={16} />
                                        {request.hospitalName}
                                    </p>
                                </div>

                                {/* Big Blood Group Badge */}
                                <div className="bg-red-50 border border-red-100 text-[#C41C1C] rounded-2xl w-24 h-24 flex flex-col items-center justify-center shrink-0 shadow-sm">
                                    <span className="text-3xl font-black leading-none">{request.bloodGroup}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest mt-1">
                                        {request.bloodGroup.includes('-') ? 'Negative' : 'Positive'}
                                    </span>
                                </div>
                            </div>

                            {/* 4 Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Units Needed</p>
                                    <p className="text-xl font-black text-slate-900">{request.unitsRequired < 10 ? `0${request.unitsRequired}` : request.unitsRequired} Units</p>
                                </div>
                                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Limit</p>
                                    <p className="text-xl font-black text-[#C41C1C]">6 Hours</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Distance</p>
                                    <p className="text-xl font-black text-slate-900">{distance}</p>
                                </div>
                                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Urgency</p>
                                    <p className="text-xl font-black text-orange-600 capitalize">{request.urgency}</p>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-48 bg-slate-200 rounded-2xl relative overflow-hidden mb-8 border border-slate-200 shadow-inner">
                                {/* CSS Map Pattern */}
                                <div className="absolute inset-0 bg-[#E5E7EB]" style={{
                                    backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #D1D5DB 3px, #D1D5DB 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #D1D5DB 3px, #D1D5DB 4px)`,
                                    backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
                                }}></div>
                                <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>

                                {/* Fake Map Route Line */}
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path d="M 0 120 Q 200 150 400 80 T 800 60" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 0 120 Q 200 150 400 80 T 800 60" fill="none" stroke="#C41C1C" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />
                                </svg>

                                {/* Marker */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-10 h-10 bg-[#C41C1C] rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10">
                                        <PlusSquare size={16} className="text-white" fill="currentColor" />
                                    </div>
                                    <div className="w-10 h-10 bg-[#C41C1C]/30 rounded-full animate-ping absolute top-0 left-0"></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button
                                    onClick={handleAccept}
                                    disabled={isAccepting || isDismissing || !isCompatible}
                                    className={`flex-1 rounded-full px-6 py-4 text-sm font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 ${!isCompatible
                                            ? 'bg-slate-300 shadow-none cursor-not-allowed opacity-70'
                                            : isAccepting
                                                ? 'bg-[#C41C1C]/80 cursor-wait'
                                                : 'bg-[#C41C1C] shadow-red-200 hover:bg-[#A01717] hover:-translate-y-1'
                                        }`}
                                >
                                    {isAccepting ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                                    ) : (
                                        <Heart size={18} />
                                    )}
                                    {isAccepting ? 'Processing...' : 'I Can Donate'}
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    disabled={isDismissing || isAccepting}
                                    className="flex-1 rounded-full bg-white border-2 border-slate-200 px-6 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDismissing ? (
                                        <span className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin shrink-0"></span>
                                    ) : (
                                        <XCircle size={18} />
                                    )}
                                    {isDismissing ? 'Dismissing...' : 'Not Available'}
                                </button>
                            </div>
                            {!isCompatible && (
                                <p className="text-center text-xs font-bold text-slate-400 mt-4">
                                    You cannot accept this request because your blood group ({user?.bloodGroup || 'unknown'}) is not a match.
                                </p>
                            )}

                        </div>
                    </div>

                    {/* RIGHT COLUMN (Info Panels - span 1) */}
                    <div className="space-y-6">

                        {/* Patient Info Card */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                <Info size={14} /> Patient Info
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Patient Details</p>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">{request.patientDetails || 'Details protected'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Hospital</p>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">{request.hospitalName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Request Type</p>
                                    <p className="text-sm font-bold text-[#C41C1C] capitalize">{request.urgency === 'urgent' ? 'Emergency' : request.urgency}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Matched By</p>
                                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                        <Activity size={14} className="text-blue-500" /> Sehat AI Engine
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Matching Logic Explanation Card */}
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                            <h3 className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-3">Matching Logic</h3>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                Your last donation was {lastDonationGap} ago and your real-time proximity is within the response radius. You are identified as an eligible match.
                            </p>
                        </div>

                        {/* Need Help Card */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Need Help?</p>
                                <p className="text-xs font-bold text-slate-900 mb-0.5">Hospital Reception</p>
                                <p className="text-base font-black text-[#C41C1C]">+92 21 9920 1300</p>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
