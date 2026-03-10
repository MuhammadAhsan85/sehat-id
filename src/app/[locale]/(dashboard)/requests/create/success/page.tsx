"use client";

import React from "react";
import { useRouter } from "@/i18n/navigation";
import {
    CheckCircle2, MapPin, AlertCircle, Droplet,
    ClipboardList, Search, User
} from "lucide-react";
import { useRequestFormStore } from "@/store/request-form.store";
import { ROUTES } from "@/constants/routes";

export default function RequestSuccessConfirmation() {
    const router = useRouter();
    const { formData, resetForm } = useRequestFormStore();

    const handleBackToSearch = () => {
        resetForm();
        router.push(ROUTES.FIND_DONORS);
    };

    const handleTrackStatus = () => {
        // Navigate to the dynamic request tracking page
        const requestId = Math.floor(Math.random() * 9000) + 1000;
        router.push(`/requests/BR-${requestId}`);
        resetForm();
    };

    return (
        <div className="text-center relative overflow-hidden">
            {/* Success Checkmark */}
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
                <CheckCircle2 size={48} className="text-emerald-500" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Request Successfully Posted
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-md mx-auto mb-10">
                Nearby donors have been notified via SMS and App alert. We will alert you as soon as a donor accepts your request.
            </p>

            {/* Request Summary Inner Card */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden mb-10 text-left shadow-sm">

                {/* Map Placeholder Area */}
                <div className="w-full md:w-2/5 h-48 md:h-auto bg-slate-200 relative">
                    {/* CSS Fake Map Pattern */}
                    <div className="absolute inset-0 bg-[#E5E7EB]" style={{
                        backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #D1D5DB 3px, #D1D5DB 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #D1D5DB 3px, #D1D5DB 4px)`,
                        backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
                    }}></div>
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply"></div>

                    {/* Map Marker */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C41C1C]">
                        <MapPin size={32} fill="currentColor" className="drop-shadow-md" />
                    </div>

                    {/* Urgency Badge */}
                    {formData.urgency === "urgent" && (
                        <div className="absolute bottom-4 left-4 bg-[#C41C1C] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md">
                            Urgent
                        </div>
                    )}
                </div>

                {/* Summary Details */}
                <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#C41C1C] animate-pulse"></span>
                        <span className="text-xs font-bold text-[#C41C1C] tracking-widest uppercase">Live Request</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-5">Request Summary</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Droplet size={18} className="text-slate-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blood Type</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {formData.bloodGroup} Required ({formData.units} {formData.units > 1 ? "Units" : "Unit"})
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Hospital</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {formData.hospitalName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <AlertCircle size={18} className={`${formData.urgency === "urgent" ? "text-[#C41C1C]" : "text-slate-400"} shrink-0 mt-0.5`} />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Priority Level</p>
                                <p className={`text-sm font-bold ${formData.urgency === "urgent" ? "text-[#C41C1C]" : "text-slate-800"}`}>
                                    {formData.urgency === "urgent" ? "Immediate Requirement (Urgent)" : "Standard Requirement"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <User size={18} className="text-slate-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Contact Person</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {formData.contactName || formData.patientName} ({formData.contactNumber})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button
                    onClick={handleTrackStatus}
                    className="w-full sm:w-1/2 rounded-full bg-[#C41C1C] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    <ClipboardList size={18} />
                    Track Request Status
                </button>

                <button
                    onClick={handleBackToSearch}
                    className="w-full sm:w-1/2 rounded-full bg-white border-2 border-slate-200 px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2"
                >
                    <Search size={18} />
                    Back to Search
                </button>
            </div>

            {/* Helpline Text */}
            <p className="text-sm font-medium text-slate-500 mt-8">
                Need immediate assistance? <a href="tel:+922134567890" className="text-[#C41C1C] font-bold hover:underline">Contact our 24/7 Helpline</a>
            </p>
        </div>
    );
}
