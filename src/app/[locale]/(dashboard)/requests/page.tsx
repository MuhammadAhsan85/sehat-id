"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, CheckCircle2, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'active' | 'pending' | 'fulfilled';

interface RequestCardProps {
    id: string;
    bloodGroup: string;
    hospital: string;
    date: string;
    status: Tab;
}

export default function MyRequestsDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('active');
    const [requests, setRequests] = useState<RequestCardProps[]>([
        { id: '1', bloodGroup: 'B-', hospital: 'Jinnah Hospital, Karachi', date: 'Oct 24, 2024', status: 'active' },
        { id: '2', bloodGroup: 'O+', hospital: 'Aga Khan Hospital, Karachi', date: 'Oct 22, 2024', status: 'pending' },
        { id: '3', bloodGroup: 'A+', hospital: 'Civil Hospital, Lahore', date: 'Sep 15, 2024', status: 'fulfilled' },
    ]);

    const filteredRequests = requests.filter(req => req.status === activeTab);

    const handleFulfill = (id: string) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: 'fulfilled' } : req));
        toast.success("Request marked as fulfilled.");
    };

    const handleCancel = (id: string) => {
        setRequests(requests.filter(req => req.id !== id));
        toast.success("Request cancelled successfully.");
    };

    return (
        <main className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6 w-full bg-slate-50/50">
            <div className="max-w-5xl w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Requests</h1>
                    <p className="text-slate-500 mt-2">Manage your active and past blood donation requests.</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto w-full max-w-2xl">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'active' ? 'bg-red-50 text-red-600 shadow-sm border border-red-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                        <Activity size={16} /> Open Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'pending' ? 'bg-amber-50 text-amber-600 shadow-sm border border-amber-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                        <Clock size={16} /> Pending Approval
                    </button>
                    <button
                        onClick={() => setActiveTab('fulfilled')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'fulfilled' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    >
                        <CheckCircle2 size={16} /> Fulfilled / History
                    </button>
                </div>

                {/* Cards Grid */}
                {filteredRequests.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                        <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeTab} requests found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">You don't have any requests in this category at the moment.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRequests.map(req => (
                            <motion.div
                                key={req.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-red-50 text-red-600 px-3 py-1 rounded-md font-bold text-sm h-fit">
                                            {req.bloodGroup}
                                        </div>
                                        {req.status === 'active' && <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">Active</span>}
                                        {req.status === 'pending' && <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-wider">Pending</span>}
                                        {req.status === 'fulfilled' && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">Fulfilled</span>}
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-3">{req.hospital}</h3>
                                    <div className="space-y-2 mb-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span>{req.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-slate-400" />
                                            <span>Karachi, Sindh</span>
                                        </div>
                                    </div>
                                </div>

                                {req.status === 'active' && (
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleFulfill(req.id)} className="flex-1 bg-[#C41C1C] hover:bg-[#A01717] text-white py-2.5 rounded-xl font-bold text-sm transition-colors text-center shadow-lg shadow-red-600/20">
                                            Mark Fulfilled
                                        </button>
                                        <button onClick={() => handleCancel(req.id)} className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-bold text-sm transition-colors text-center border border-slate-200 border-dashed">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                                {req.status === 'pending' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="w-full text-center py-2.5 bg-amber-50 text-amber-700 rounded-xl font-bold text-sm border border-amber-100">
                                            Awaiting Donor Approval
                                        </div>
                                    </div>
                                )}
                                {req.status === 'fulfilled' && (
                                    <div className="w-full text-center py-2.5 bg-slate-50 text-slate-500 rounded-xl font-bold text-sm border border-slate-100">
                                        Completed
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
