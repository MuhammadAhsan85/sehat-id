"use client";

import React, { useEffect } from 'react';
import { ShieldAlert, Info, Eye, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRequestStore } from "@/store/request.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    donorName?: string;
    donorId?: string;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, donorName, donorId }: ConfirmationModalProps) {
    const { addRequest, simulateApproval } = useRequestStore();
    const { user } = useAuthStore();

    const handleConfirm = () => {
        if (donorId && user?.id) {
            addRequest(donorId, user.id);
            toast.success("Request sent securely! Waiting for donor approval.");
            // Simulate donor approval after 3 seconds for testing
            setTimeout(() => {
                simulateApproval(donorId);
                toast.success(`Donor ${donorName || ''} approved your request! Contact revealed.`);
            }, 3000);
        }
        onConfirm();
    };

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl z-10 text-center"
                    >
                        {/* Shield Icon */}
                        <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                            <ShieldAlert size={28} className="text-[#C41C1C]" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Confirm Contact Request</h2>

                        {/* Privacy Notice Box */}
                        <div className="w-full bg-red-50/50 border-l-4 border-[#C41C1C] rounded-r-2xl p-4 text-left mb-8 flex items-start space-x-3">
                            <Info size={18} className="text-[#C41C1C] mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Privacy Notice</h4>
                                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                    To protect our donors, your request will be logged. Excessive or suspicious requests may lead to account suspension. Please only contact donors for genuine emergencies.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full space-y-3 mb-8">
                            {/* Standardized Primary Button */}
                            <button onClick={handleConfirm} className="w-full rounded-full bg-[#C41C1C] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center justify-center gap-2">
                                <Eye size={18} />
                                Confirm & View Contact
                            </button>

                            {/* Secondary/Cancel Button */}
                            <button
                                onClick={onClose}
                                className="w-full rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Security Footer */}
                        <div className="flex items-center justify-center space-x-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2">
                            <div className="w-5 h-5 rounded flex items-center justify-center bg-orange-100">
                                <Lock size={12} className="text-orange-600" />
                            </div>
                            <span>Secured by Sehat Trust Protocol</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
