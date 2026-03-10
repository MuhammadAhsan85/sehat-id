'use client';

import React, { useState } from 'react';
import {
    Search, MapPin, Filter, Zap,
    LayoutGrid, Droplet, Users, User
} from 'lucide-react';
import { Link } from "@/i18n/navigation";

export default function ActiveRequestsList() {
    const [activeTab, setActiveTab] = useState('All');

    // Dummy Data for the Requests List
    const requests = [
        {
            id: 1,
            bloodGroup: 'B+',
            urgent: true,
            time: 'Posted 15m ago',
            title: 'B+ Required at Indus Hospital',
            location: 'Karachi - 2.4 km away',
            units: '2 units',
            notified: '3 donors notified',
            bgType: 'bg-[#C41C1C]' // Red for urgent
        },
        {
            id: 2,
            bloodGroup: 'A-',
            urgent: false,
            time: 'Posted 45m ago',
            title: 'A- Required at Ziauddin Hospital',
            location: 'Karachi - 5.1 km away',
            units: '1 unit',
            notified: '1 donor notified',
            bgType: 'bg-slate-800' // Dark Gray for normal
        },
        {
            id: 3,
            bloodGroup: 'O-',
            urgent: true,
            time: 'Posted 1h ago',
            title: 'O- Required at Aga Khan Hospital',
            location: 'Karachi - 8.2 km away',
            units: '3 units',
            notified: '12 donors notified',
            bgType: 'bg-[#C41C1C]' // Red for urgent
        }
    ];

    // 3. Dynamic Filtering Logic
    const filteredRequests = requests.filter((req) => {
        if (activeTab === 'Urgent') return req.urgent;
        if (activeTab === 'Nearby') return req.location.includes('2.4 km'); // Mock nearby logic
        return true; // 'All'
    });

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">

            {/* Main Content Area - Item 1: Correct padding (py-20) */}
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-20 flex flex-col items-center">

                {/* Page Header & Filter */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Requests</h1>
                        <p className="text-slate-500 font-medium mt-1">Urgent blood needs in Pakistan. Every donation counts.</p>
                    </div>

                    <button className="rounded-full bg-white border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="w-full bg-slate-100/80 p-1.5 rounded-full flex mb-8">
                    {['All', 'Urgent', 'Nearby'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Requests List */}
                <div className="w-full space-y-5">
                    {filteredRequests.map((req) => (
                        <div key={req.id} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6 sm:gap-8 hover:shadow-md transition-shadow">

                            {/* Blood Group Circle */}
                            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${req.bgType} text-white flex items-center justify-center text-3xl sm:text-4xl font-black shrink-0 shadow-inner`}>
                                {req.bloodGroup}
                            </div>

                            {/* Request Details */}
                            <div className="flex-1 text-center sm:text-left w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center sm:justify-start">
                                    {req.urgent && (
                                        <span className="inline-flex items-center bg-red-50 text-[#C41C1C] px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase mx-auto sm:mx-0">
                                            <Zap size={10} className="mr-1 fill-current" /> Urgent
                                        </span>
                                    )}
                                    {req.urgent && <span className="hidden sm:inline text-slate-300">•</span>}
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{req.time}</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{req.title}</h3>

                                <p className="text-sm font-medium text-slate-500 flex items-center justify-center sm:justify-start mb-4 sm:mb-6">
                                    <MapPin size={16} className="mr-1.5 shrink-0" />
                                    {req.location}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                    <p className="text-sm">
                                        <span className="font-extrabold text-slate-900">{req.units}</span>
                                        <span className="text-slate-500 font-medium"> needed <span className="mx-1">•</span> {req.notified}</span>
                                    </p>

                                    {/* Action Button - 4. Wire up 'Help Now' */}
                                    <Link href={`/requests/${req.id}`} className="rounded-full border-2 border-[#C41C1C] text-[#C41C1C] px-8 py-2.5 text-sm font-bold transition-all hover:bg-red-50 hover:shadow-sm text-center">
                                        Help Now
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                    {filteredRequests.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-slate-500 font-bold">No requests found for this category.</p>
                        </div>
                    )}
                </div>

                {/* Floating Bottom Nav Menu (App Style) - 2. Optimize for Mobile */}
                <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl shadow-lg px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors">
                        <LayoutGrid size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                    </Link>
                    <Link href="/active-requests" className="flex flex-col items-center gap-1 text-[#C41C1C]">
                        <Droplet size={24} fill="currentColor" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Requests</span>
                    </Link>
                    <Link href="/find-donors" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors">
                        <Users size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Donors</span>
                    </Link>
                    <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors">
                        <User size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                    </Link>
                </div>

            </main>
        </div>
    );
}
