"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle2, Phone, MessageSquare, Clock } from 'lucide-react';
import type { Donor } from "@/types/donor";
import { useRequestStore } from "@/store/request.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

interface DonorCardProps {
    donor: Donor;
    onConnect: (donor: Donor) => void;
}

export function DonorCard({ donor, onConnect }: DonorCardProps) {
    const { getRequestByDonorId } = useRequestStore();
    const { user } = useAuthStore();

    const request = getRequestByDonorId(donor.id);
    const status = request?.status;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(197,43,42,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 group-hover:border-red-200 transition-colors relative">
                        <Image
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${donor.name}&backgroundColor=f3f4f6`}
                            alt={donor.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            {donor.name}
                            {donor.isVerified && <CheckCircle2 size={18} className="text-green-500 ml-1.5" fill="currentColor" stroke="white" strokeWidth={1} />}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center mt-0.5 font-medium">
                            <MapPin size={14} className="mr-1" /> {donor.city}, {donor.province}
                        </p>
                    </div>
                </div>
                <div className="bg-red-50 text-[#C52B2A] font-black text-xl px-4 py-2 rounded-xl group-hover:scale-105 transition-transform flex flex-col items-center">
                    {donor.bloodGroup}
                    {donor.isUrgent && <span className="text-[8px] text-white bg-[#C52B2A] px-1.5 py-0.5 rounded mt-1 animate-pulse">URGENT</span>}
                </div>
            </div>

            <div className="flex justify-between mb-6 px-2">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Donated</p>
                    <p className="text-sm font-bold text-gray-800">{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never'}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Donations</p>
                    <p className="text-sm font-bold text-gray-800">{donor.donationCount} {donor.donationCount > 0 ? 'Total' : 'First Time'}</p>
                </div>
            </div>

            <div className="flex space-x-3">
                {!status && (
                    <button
                        onClick={() => onConnect(donor)}
                        className="rounded-full bg-[#C41C1C] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex-1 text-center"
                    >
                        Request Connection
                    </button>
                )}

                {status === "pending" && (
                    <button
                        className="rounded-full bg-slate-100 px-6 py-4 text-sm font-bold text-slate-500 flex-1 text-center cursor-default flex items-center justify-center gap-2"
                        disabled
                    >
                        <Clock size={16} /> Request Pending
                    </button>
                )}

                {status === "accepted" && (
                    <>
                        {donor.phone ? (
                            <a
                                href={`tel:${donor.phone}`}
                                className="rounded-full bg-[#10B981] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-100 transition-all hover:bg-[#059669] hover:-translate-y-1 flex-1 text-center flex items-center justify-center gap-2"
                            >
                                <Phone size={16} /> Call Securely
                            </a>
                        ) : (
                            <button
                                onClick={() => toast.error("Donor phone number is not available.")}
                                className="rounded-full bg-[#10B981]/50 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-100/50 transition-all flex-1 text-center flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                                <Phone size={16} /> Call Securely
                            </button>
                        )}
                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                            <MessageSquare size={18} />
                        </button>
                    </>
                )}

                {status === "rejected" && (
                    <button
                        className="rounded-full bg-red-50 px-6 py-4 text-sm font-bold text-red-400 flex-1 text-center cursor-default"
                        disabled
                    >
                        Request Declined
                    </button>
                )}
            </div>
        </div>
    );
}
