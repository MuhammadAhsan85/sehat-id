"use client";

import React from "react";
import {
    Activity, HeartPulse, MapPin, Zap, Lock
} from "lucide-react";

export default function FeaturesPage() {
    return (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 selection:bg-red-100 selection:text-red-900">

            {/* Header Section */}
            <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-2xl">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-[#C41C1C] text-[10px] font-black uppercase tracking-widest mb-6">
                        <Activity size={12} />
                        Advanced AI Integration
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        Intelligent <br /> Matching. <br />
                        <span className="text-[#C41C1C]">Faster Response.</span>
                    </h1>
                </div>

                <div className="max-w-md lg:mb-2">
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                        Our proprietary AI system analyzes blood type compatibility, location proximity, availability status, and urgency to notify the most suitable donors first.
                    </p>
                </div>
            </section>

            {/* 4-Column Feature Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center mb-6 shadow-sm text-[#C41C1C]">
                        <HeartPulse size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Smart Compatibility Check</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Analyzes medical data for perfect donor-recipient matching using advanced clinical algorithms.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center mb-6 shadow-sm text-[#C41C1C]">
                        <MapPin size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Distance-Based Priority</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Prioritizes local donors based on real-time location proximity to minimize transport time in Pakistan.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center mb-6 shadow-sm text-[#C41C1C]">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Emergency Escalation</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Automatically escalates critical requests to a wider network during life-threatening situations.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-white border border-red-100 flex items-center justify-center mb-6 shadow-sm text-[#C41C1C]">
                        <Lock size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Abuse Detection</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Sophisticated AI filters to prevent system misuse and ensure authentic emergency requests.
                    </p>
                </div>

            </section>

            {/* Real-time Network Activity Banner */}
            <section className="relative w-full rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm min-h-[400px] flex items-center justify-center p-8">

                {/* Abstract Faded Background Elements */}
                <div className="absolute inset-0 flex pointer-events-none">
                    <div className="w-1/3 h-full border-r border-white/40 bg-gradient-to-br from-white/40 to-transparent"></div>
                    <div className="w-1/3 h-full border-r border-white/40 bg-gradient-to-t from-white/20 to-white/60"></div>
                    <div className="w-1/3 h-full flex flex-col items-center justify-center opacity-10 blur-[2px] font-black text-4xl text-slate-800 leading-tight select-none">
                        <p>Blood Group</p><p>O-Negative</p><p>Verified</p>
                    </div>
                </div>

                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-xl mx-auto">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Real-time Network Activity</h2>
                    <p className="text-slate-600 font-medium mb-12">
                        Our AI handles over 10,000 requests monthly across major cities in Pakistan.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
                        <div>
                            <p className="text-5xl font-black text-[#C41C1C] mb-2 tracking-tight">99.8%</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accuracy</p>
                        </div>
                        <div className="hidden sm:block w-px h-16 bg-slate-300"></div>
                        <div>
                            <p className="text-5xl font-black text-[#C41C1C] mb-2 tracking-tight">&lt; 2m</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Match Time</p>
                        </div>
                    </div>
                </div>

            </section>

        </main>
    );
}
