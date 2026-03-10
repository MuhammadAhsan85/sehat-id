'use client';

import React, { useState } from 'react';
import {
    Search, Activity, BellRing, ShieldAlert, Ban,
    Map, AlertCircle, ChevronDown, Mail, Phone, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

// --- Mock Data Hook ---
// In a real application, this would fetch from an API endpoint
function useAIMonitorData() {
    const kpiData = {
        requestsProcessed: { value: '12,405', trend: '+12.4%', isUp: true, subtext: 'vs last 24h' },
        emergencyAlerts: { value: '84', trend: '+5%', isUp: true, subtext: 'critical response' },
        suspiciousActivity: { value: '12', trend: '-2.1%', isUp: false, subtext: 'flag rate' },
        autoBlocked: { value: '05', trend: 'STABLE', isUp: null, subtext: 'threat level low' }
    };

    const initialFlags = [
        {
            id: 1,
            initials: 'OA',
            name: 'Omar A.',
            reasonTitle: 'Excessive contact reveals',
            reasonDesc: 'Potential Data Scraping',
            time: '2m ago',
            priority: 'URGENT',
            priorityColor: 'bg-[#C41C1C] text-white',
            isDanger: true
        },
        {
            id: 2,
            initials: 'AR',
            name: 'Ahmed R.',
            reasonTitle: 'Suspicious repeated request',
            reasonDesc: 'API Rate Limit Warning',
            time: '10m ago',
            priority: 'PENDING',
            priorityColor: 'bg-slate-100 text-slate-500',
            isDanger: false
        },
        {
            id: 3,
            initials: 'ZK',
            name: 'Zubair K.',
            reasonTitle: 'Unusual location ping',
            reasonDesc: 'VPN Access Detected',
            time: '45m ago',
            priority: 'PENDING',
            priorityColor: 'bg-slate-100 text-slate-500',
            isDanger: false
        }
    ];

    return { kpiData, initialFlags };
}

export default function AIActivityMonitor() {
    const { kpiData, initialFlags } = useAIMonitorData();
    const [aiFlags, setAiFlags] = useState(initialFlags);

    const handleReviewClick = (userName: string, id: number) => {
        toast.info(`Opening security logs for ${userName}...`, {
            description: "Redirecting to detailed incident report.",
            duration: 3000
        });
        // In a real app, you might do: router.push(`/admin/logs/${id}`)
    };

    return (
        <div className="bg-[#FAFAFA] font-sans text-slate-900 selection:bg-red-100 selection:text-red-900 flex flex-col w-full h-full">

            {/* Main Content Area */}
            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Page Title */}
                <div className="mb-8">
                    <p className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C41C1C] animate-pulse"></span>
                        Live Security Feed
                    </p>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">AI Activity Monitor</h1>
                    <p className="text-slate-500 font-medium max-w-3xl">
                        Real-time monitoring of AI-driven security algorithms, donor request processing, and suspicious behavioral pattern detection across Pakistan.
                    </p>
                </div>

                {/* Top KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-slate-500">Requests Processed</span>
                            <Activity size={16} className="text-slate-400" />
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">{kpiData.requestsProcessed.value}</p>
                        <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                            ↗ {kpiData.requestsProcessed.trend} <span className="text-slate-400 font-medium ml-1">{kpiData.requestsProcessed.subtext}</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-slate-500">Emergency Alerts</span>
                            <BellRing size={16} className="text-[#C41C1C]" />
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">{kpiData.emergencyAlerts.value}</p>
                        <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                            ↗ {kpiData.emergencyAlerts.trend} <span className="text-slate-400 font-medium ml-1">{kpiData.emergencyAlerts.subtext}</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-slate-500">Suspicious Activity</span>
                            <ShieldAlert size={16} className="text-orange-500" />
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">{kpiData.suspiciousActivity.value}</p>
                        <p className="text-[10px] font-bold text-[#C41C1C] flex items-center gap-1">
                            ↘ {kpiData.suspiciousActivity.trend} <span className="text-slate-400 font-medium ml-1">{kpiData.suspiciousActivity.subtext}</span>
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] opacity-80">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-slate-500">Auto-Blocked</span>
                            <Ban size={16} className="text-slate-400" />
                        </div>
                        <p className="text-3xl font-black text-slate-900 mb-2">{kpiData.autoBlocked.value}</p>
                        <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                            {kpiData.autoBlocked.trend} <span className="text-slate-400 font-medium ml-1">{kpiData.autoBlocked.subtext}</span>
                        </p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <AlertCircle size={18} className="text-[#C41C1C]" />
                            Recent AI Flags
                        </h3>
                        <button className="text-xs font-bold text-[#C41C1C] hover:underline">View All Logs</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User / ID</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Flag Reason</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {aiFlags.map((flag) => (
                                    <tr key={flag.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                                    {flag.initials}
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{flag.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm font-bold text-slate-800">{flag.reasonTitle}</p>
                                            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${flag.isDanger ? 'text-[#C41C1C]' : 'text-slate-400'}`}>
                                                {flag.reasonDesc}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-slate-500 whitespace-nowrap">{flag.time}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${flag.priorityColor}`}>
                                                {flag.priority}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleReviewClick(flag.name, flag.id)}
                                                className="rounded-full border border-[#C41C1C] text-[#C41C1C] px-5 py-1.5 text-xs font-bold transition-all hover:bg-red-50"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Grid: Map & Confidence Bars */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Regional Map Placeholder */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-sm font-bold text-slate-900">Regional Activity Map</h3>
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Pakistan Distribution</span>
                        </div>

                        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center min-h-[200px] overflow-hidden relative">
                            <div className="absolute inset-0 bg-[#E5E7EB] opacity-60" style={{
                                backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px)`,
                                backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
                            }}></div>
                            <Map size={32} className="text-slate-300 mb-2 relative z-10" />
                            <span className="text-xs font-bold text-slate-400 relative z-10">Interactive Map Data Loading...</span>
                        </div>
                    </div>

                    {/* AI Model Confidence */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 mb-8">AI Model Confidence</h3>

                        <div className="space-y-6">
                            {/* Stat 1 */}
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                                    <span>Scam Detection Accuracy</span>
                                    <span className="text-slate-900">99.2%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className="bg-[#C41C1C] h-1.5 rounded-full w-[99.2%] shadow-[0_0_8px_rgba(196,28,28,0.4)]"></div>
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                                    <span>Urgency Classification</span>
                                    <span className="text-slate-900">87.5%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className="bg-[#C41C1C] h-1.5 rounded-full w-[87.5%]"></div>
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div>
                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                                    <span>Location Verification</span>
                                    <span className="text-slate-900">94.1%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div className="bg-[#C41C1C] h-1.5 rounded-full w-[94.1%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
