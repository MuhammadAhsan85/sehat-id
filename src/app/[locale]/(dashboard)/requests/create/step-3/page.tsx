'use client';

import React, { useState } from 'react';
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import {
    User, MapPin, Info, Send, Edit2, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { useRequestFormStore } from '@/store/request-form.store';
import { toast } from 'sonner';

export default function RequestFinalConfirmation() {
    const router = useRouter();
    const { formData, resetForm } = useRequestFormStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBroadcast = async () => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Request Broadcasted Successfully!');
            resetForm(); // Clear the form state
            router.push('/requests/create/success');
        } catch (error) {
            toast.error('Failed to broadcast request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#FAFAFA] font-sans text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900 w-full min-h-screen">
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6">

                <div className="w-full max-w-2xl">

                    {/* Progress Indicator */}
                    <div className="mb-10 w-full max-w-lg mx-auto">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#C41C1C]" />
                                Step 3: Confirmation
                            </span>
                            <span className="text-sm font-bold text-[#C41C1C]">100%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                            <div className="bg-[#C41C1C] h-2 rounded-full w-full"></div>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">
                            Finalizing your request
                        </p>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Final Confirmation</h1>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Review your request before broadcasting it to nearby donors.
                        </p>
                    </div>

                    {/* Request Summary Card */}
                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6 overflow-hidden">

                        {/* Top Gray Gradient Area with Urgent Badge */}
                        <div className={`h-32 relative ${formData.urgency === 'urgent' || formData.requirementType === 'Urgent' ? 'bg-gradient-to-b from-red-100 to-slate-50' : 'bg-gradient-to-b from-slate-200 to-slate-50'}`}>
                            {(formData.urgency === 'urgent' || formData.requirementType === 'Urgent') && (
                                <div className="absolute top-4 right-4 bg-[#C41C1C] text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    Urgent
                                </div>
                            )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8 -mt-6 bg-white rounded-t-3xl relative">

                            <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                                <div>
                                    <p className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-1">
                                        {(formData.urgency === 'urgent' || formData.requirementType === 'Urgent') ? 'Critical Blood Request' : 'Standard Blood Request'}
                                    </p>
                                    <h2 className="text-2xl font-bold text-slate-900">Request Summary</h2>
                                    <p className="text-xs font-bold text-slate-500 mt-1">{formData.units} Unit{formData.units > 1 ? 's' : ''} Needed</p>
                                </div>

                                {/* Blood Group Badge */}
                                <div className="w-16 h-16 rounded-full border-2 border-red-100 bg-white flex flex-col items-center justify-center shadow-sm shrink-0">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Group</span>
                                    <span className="text-xl font-black text-[#C41C1C] leading-none">{formData.bloodGroup || '?'}</span>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-6 mb-8">

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <User size={18} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">Patient Name</p>
                                        <p className="text-base font-bold text-slate-900">{formData.patientName || 'Not specified'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <MapPin size={18} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">Hospital Location</p>
                                        <p className="text-base font-bold text-slate-900">{formData.hospitalName ? `${formData.hospitalName}${formData.hospitalArea ? `, ${formData.hospitalArea}` : ''}${formData.city ? `, ${formData.city}` : ''}` : 'Not specified'}</p>
                                    </div>
                                </div>

                            </div>

                            {/* Edit Button */}
                            <button
                                onClick={() => router.push('/requests/create/step-1')}
                                disabled={isSubmitting}
                                className="w-full rounded-full border-2 border-slate-200 py-3.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Edit2 size={16} /> Edit Details
                            </button>

                        </div>
                    </div>

                    {/* Privacy Note */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-start gap-3">
                        <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1">Privacy Note</h4>
                            <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                Your contact number will only be revealed to verified donors who accept this request through our secure platform.
                            </p>
                        </div>
                    </div>

                    {/* Final Action Button */}
                    <div className="text-center">
                        <button
                            onClick={handleBroadcast}
                            disabled={isSubmitting || !formData.bloodGroup}
                            className="w-full rounded-full bg-[#C41C1C] px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                                    Broadcasting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Broadcast Request
                                </>
                            )}
                        </button>
                        {!formData.bloodGroup && (
                            <p className="text-xs font-bold text-red-500 mb-2">Please go back and select a blood group.</p>
                        )}
                        <p className="text-[10px] font-medium text-slate-400 leading-relaxed max-w-md mx-auto">
                            By posting, you agree to our <Link href="/terms" className="text-[#C41C1C] font-bold hover:underline">community guidelines</Link> and verify that the medical need is genuine.
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
