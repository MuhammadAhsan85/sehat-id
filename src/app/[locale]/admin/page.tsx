/**
 * Admin Analytics Dashboard
 * Route: /admin
 *
 * Features:
 *  - Refactored strictly to Sehat-ID brand guidelines (white/gray-50/brand red)
 *  - Fully responsive tables and grid layouts
 *  - Clean Tailwind utility classes for modern aesthetics
 */

"use client";

import React, { useState } from "react";
import {
    Search, Bell, User, Download, Users, UserCheck,
    FileText, AlertTriangle, Shield, Lock, ChevronDown,
    ArrowUpRight, ArrowDownRight, MapPin, Clock
} from "lucide-react";
import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import Logo from "@/shared/components/Logo";

// ── Data ──────────────────────────────────────────────────────────────────────

const chartData = [
    { name: "MON", registrations: 120 },
    { name: "TUE", registrations: 180 },
    { name: "WED", registrations: 250 },
    { name: "THU", registrations: 210 },
    { name: "FRI", registrations: 290 },
    { name: "SAT", registrations: 240 },
    { name: "SUN", registrations: 310 },
];

const initialReveals = [
    { id: 1, revealer: "Hospital Gen. Lahore", donor: "Ahmed Khan", group: "O+", location: "Gulberg III, LHR", status: "Active", time: "2 mins ago" },
    { id: 2, revealer: "Zainab S.", donor: "Fatima Ali", group: "B-", location: "Saddar, KHI", status: "Active", time: "14 mins ago" },
    { id: 3, revealer: "Edhi Foundation", donor: "Bilal Mansoor", group: "A+", location: "I-8, ISL", status: "Pending", time: "45 mins ago" },
    { id: 4, revealer: "Shaukat Khanum", donor: "Sana Javed", group: "AB+", location: "DHA Ph 5, LHR", status: "Urgent", time: "1 hour ago" },
    { id: 5, revealer: "Agha Khan Hosp", donor: "Usman Tariq", group: "O-", location: "Clifton, KHI", status: "Pending", time: "2 hours ago" },
    { id: 6, revealer: "Jinnah Hospital", donor: "Ayesha Malik", group: "A-", location: "Model Town, LHR", status: "Active", time: "3 hours ago" },
];

const groupStats = [
    { group: "O Positive (O+)", percentage: 42 },
    { group: "B Positive (B+)", percentage: 28 },
    { group: "A Positive (A+)", percentage: 15 },
    { group: "Others", percentage: 15 },
];

// ── Stat card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    trend: string;
    isPositive?: boolean | null;
    accentHighlight?: boolean;
}

function StatCard({ icon, label, value, trend, isPositive = null, accentHighlight = false }: StatCardProps) {
    return (
        <div className={`bg-white p-6 rounded-2xl border shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md flex flex-col justify-between h-[136px] relative overflow-hidden ${accentHighlight ? 'border-red-100 ring-1 ring-red-50' : 'border-gray-100'}`}>

            {/* Background Glow for Accents */}
            {accentHighlight && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            )}

            <div className={`flex items-center gap-2 text-sm font-bold relative z-10 ${accentHighlight ? "text-[#C41C1C]" : "text-gray-500"}`}>
                {icon}
                <span>{label}</span>
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>

                <div className="mt-1 flex items-center gap-1.5 text-xs font-bold">
                    {isPositive === true && <span className="text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded"><ArrowUpRight size={12} className="mr-0.5" /> {trend}</span>}
                    {isPositive === false && <span className="text-red-500 flex items-center bg-red-50 px-1.5 py-0.5 rounded"><ArrowDownRight size={12} className="mr-0.5" /> {trend}</span>}
                    {isPositive === null && <span className="text-[#C41C1C] flex items-center"><AlertTriangle size={12} className="mr-1" /> {trend}</span>}
                </div>
            </div>
        </div>
    );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    let styles = "bg-gray-50 text-gray-600 ring-gray-200";
    if (status === "Active" || status === "Approved") styles = "bg-emerald-50 text-emerald-700 ring-emerald-200/50";
    if (status === "Pending") styles = "bg-amber-50 text-amber-700 ring-amber-200/50";
    if (status === "Urgent" || status === "Rejected") styles = "bg-red-50 text-red-700 ring-red-200/50";

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ring-1 ${styles}`}>
            {status}
        </span>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [reveals, setReveals] = useState(initialReveals);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleApprove = (id: number) => {
        setReveals(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    };

    const handleReject = (id: number) => {
        setReveals(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
    };

    const handleDelete = (id: number) => {
        setReveals(prev => prev.filter(r => r.id !== id));
    };

    const filteredReveals = reveals.filter(r =>
        r.revealer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedReveals = filteredReveals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredReveals.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">


            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-20">

                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Main Dashboard</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live System Status • Last updated just now
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                        <Download size={16} className="text-gray-400" /> Export Report
                    </button>
                </div>

                {/* ── Key Metrics Grids ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <StatCard icon={<Users size={18} />} label="Total Registered Donors" value="12,450" trend="12%" isPositive={true} />
                    <StatCard icon={<UserCheck size={18} />} label="Available Donors" value="8,120" trend="5.2%" isPositive={true} />
                    <StatCard icon={<FileText size={18} />} label="Total Processed Requests" value="456" trend="2.1%" isPositive={false} />
                    <StatCard icon={<AlertTriangle size={18} />} label="Active Critical Emergencies" value="12" trend="Requires Action" isPositive={null} accentHighlight={true} />
                </div>

                {/* ── Main Operations Content ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">

                    {/* Left Column (Main Data) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Registration Chart Area */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900">Platform Growth</h3>
                                    <p className="text-xs font-medium text-gray-500">New donor registrations</p>
                                </div>
                                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                                    Last 7 Days <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </div>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C41C1C" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#C41C1C" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: "bold" }}
                                            dy={10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "16px",
                                                border: "1px solid #f3f4f6",
                                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            }}
                                            itemStyle={{ color: "#C41C1C", fontWeight: "900" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="registrations"
                                            stroke="#C41C1C"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorReg)"
                                            activeDot={{ r: 6, strokeWidth: 0, fill: "#C41C1C" }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Activity Table Container */}
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900">Recent Contact Reveals</h3>
                                    <p className="text-xs font-medium text-gray-500">Live feed of hospital-to-donor connections</p>
                                </div>
                                <button className="text-sm font-bold text-[#C41C1C] hover:text-[#A01717] transition-colors">
                                    View full log →
                                </button>
                            </div>

                            {/* Responsive Horizontal Scroll Wrapper */}
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left min-w-[900px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Medical Entity</th>
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Donor Matched</th>
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Type</th>
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Timestamp</th>
                                            <th className="px-6 py-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-50 text-sm">
                                        {paginatedReveals.map((r) => (
                                            <tr key={r.id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-gray-900">{r.revealer}</p>
                                                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5"><MapPin size={10} /> {r.location}</p>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-gray-700">{r.donor}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-red-50 text-[#C41C1C] border border-red-100 font-black px-2 py-1 rounded text-xs select-none">
                                                        {r.group}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={r.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-semibold text-gray-500 flex items-center justify-start gap-1"><Clock size={12} /> {r.time}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {r.status === 'Pending' && (
                                                            <>
                                                                <button onClick={() => handleApprove(r.id)} className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md hover:bg-emerald-100 transition-colors">Approve</button>
                                                                <button onClick={() => handleReject(r.id)} className="text-xs font-bold bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors">Reject</button>
                                                            </>
                                                        )}
                                                        <button onClick={() => handleDelete(r.id)} className="text-xs font-bold bg-gray-100 text-gray-500 px-3 py-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {paginatedReveals.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium text-sm">No recent reveals found matching search.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-xs font-bold text-gray-500">Page {currentPage} of {totalPages}</span>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column (Insights & Meta) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Blood Group Demographics */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-black text-gray-900 mb-6">Inventory Demand</h3>
                            <div className="space-y-6">
                                {groupStats.map(({ group, percentage }) => (
                                    <div key={group}>
                                        <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                                            <span>{group}</span>
                                            <span className="text-[#C41C1C] font-black">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                            <div className="bg-[#C41C1C] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Trust & Health Score */}
                        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-3xl shadow-xl shadow-slate-900/10 text-white relative overflow-hidden flex flex-col justify-center min-h-[220px]">
                            {/* Abstract Graphic */}
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
                            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex items-center gap-2 mb-3 relative z-10">
                                <Shield className="text-emerald-400" size={20} />
                                <h3 className="font-bold text-slate-300 text-sm tracking-wide uppercase">System Trust Score</h3>
                            </div>
                            <div className="flex justify-between items-end relative z-10 mb-4">
                                <h2 className="text-6xl font-black text-white tracking-tighter">98.4<span className="text-3xl text-slate-400">%</span></h2>
                            </div>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed relative z-10">
                                Verification servers operating nominally. Identity fraud detection at peak efficiency.
                            </p>
                        </div>

                        {/* Compliance Card */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-black text-gray-900">Compliance Sync</h3>
                                <Lock size={16} className="text-gray-400" />
                            </div>
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3">
                                <div className="mt-0.5 bg-emerald-100 p-1.5 rounded-full shrink-0">
                                    <Shield size={14} className="text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-emerald-900 text-sm">End-to-End Encrypted</h4>
                                    <p className="text-[10px] text-emerald-600 mt-1 uppercase tracking-wider font-bold">
                                        Data meets PK Health Standards
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
