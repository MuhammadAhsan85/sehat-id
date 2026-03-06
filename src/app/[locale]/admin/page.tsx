/**
 * Admin Analytics Dashboard
 * Route: /admin
 *
 * Features:
 *  - Sticky admin navbar with search, notifications, profile
 *  - 4 stat cards (total donors, available donors, requests, emergencies)
 *  - Recharts AreaChart for weekly donor registrations
 *  - Recent Contact Reveals table
 *  - Right sidebar: Requests by Blood Group, Trust Score, Privacy Compliance
 */

"use client";

import React, { useState } from "react";
import {
    Search, Bell, User, Download, Users, UserCheck,
    FileText, AlertCircle, Shield, Lock, ChevronDown,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import Footer from "@/shared/components/Footer";
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

const recentReveals = [
    { id: 1, revealer: "Hospital Gen. Lahore", donor: "Ahmed Khan", group: "O+", location: "Gulberg III, LHR", time: "2 mins ago" },
    { id: 2, revealer: "Zainab S.", donor: "Fatima Ali", group: "B-", location: "Saddar, KHI", time: "14 mins ago" },
    { id: 3, revealer: "Edhi Foundation", donor: "Bilal Mansoor", group: "A+", location: "I-8, ISL", time: "45 mins ago" },
    { id: 4, revealer: "Shaukat Khanum", donor: "Sana Javed", group: "AB+", location: "DHA Ph 5, LHR", time: "1 hour ago" },
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
    trendColor: string;
    accent?: string;  // border + accent color class
    highlight?: boolean;
}

function StatCard({ icon, label, value, trend, trendColor, accent = "border-gray-100", highlight = false }: StatCardProps) {
    return (
        <div className={`bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-32 relative overflow-hidden ${accent}`}>
            {highlight && (
                <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-40"
                    style={{ background: trendColor === "text-green-500" ? "#d1fae5" : "#fee2e2" }} />
            )}
            <div className={`flex items-center gap-2 text-sm font-medium relative z-10 ${highlight ? "font-bold" : ""} ${trendColor === "text-green-500" && highlight ? "text-green-600" : trendColor === "text-[#C41C1C]" && highlight ? "text-[#C41C1C]" : "text-gray-500"}`}>
                {icon} {label}
            </div>
            <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                <p className={`text-xs font-bold mt-1 ${trendColor}`}>{trend}</p>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-[#f8f6f6] text-gray-900 pb-20">

            {/* ── Admin Navbar ── */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Logo />
                            <span className="text-gray-400 font-medium text-lg pt-0.5 hidden sm:block">Admin</span>
                        </div>

                        {/* Search */}
                        <div className="hidden md:flex items-center bg-red-50/50 rounded-full px-4 py-2 border border-red-100 w-80">
                            <Search size={16} className="text-red-300 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search donors or requests"
                                aria-label="Search"
                                className="bg-transparent border-none outline-none ml-2 text-sm w-full placeholder-red-300 text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Nav tabs */}
                        <nav className="hidden lg:flex gap-6 text-sm font-medium">
                            {[
                                { label: "Dashboard", active: true },
                                { label: "Donors", active: false },
                                { label: "Requests", active: false },
                                { label: "Emergencies", active: false },
                            ].map(({ label, active }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className={`py-5 border-b-2 transition-colors ${active ? "text-[#C41C1C] border-[#C41C1C]" : "text-gray-500 border-transparent hover:text-gray-900"}`}
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        {/* Icon buttons */}
                        <div className="flex items-center gap-2">
                            <button aria-label="Notifications" className="w-10 h-10 rounded-full bg-red-50 text-[#C41C1C] flex items-center justify-center hover:bg-red-100 transition">
                                <Bell size={18} />
                            </button>
                            <button aria-label="Profile" className="w-10 h-10 rounded-full bg-red-50 text-[#C41C1C] flex items-center justify-center hover:bg-red-100 transition">
                                <User size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 pt-8">

                {/* ── Page header ── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Admin Analytics</h1>
                        <p className="text-sm text-gray-400 mt-1">Last updated: Mar 5, 2026, 04:30 AM</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#C41C1C] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-red-700 transition">
                        <Download size={16} /> Export CSV
                    </button>
                </div>

                {/* ── Stat cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Users size={16} />} label="Total Donors" value="12,450" trend="↑ +12% this month" trendColor="text-green-500" accent="border-gray-100" />
                    <StatCard icon={<UserCheck size={16} />} label="Available Donors" value="8,120" trend="↑ +5.2% this month" trendColor="text-green-500" accent="border-green-100" highlight />
                    <StatCard icon={<FileText size={16} />} label="Total Requests" value="456" trend="↓ -2.1% this month" trendColor="text-red-400" accent="border-gray-100" />
                    <StatCard icon={<AlertCircle size={16} />} label="Active Emergencies" value="12" trend="! Critical" trendColor="text-[#C41C1C]" accent="border-red-100" highlight />
                </div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left column (8) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Chart */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Recent Donor Registrations</h3>
                                <button className="flex items-center gap-1.5 text-xs font-bold text-[#C41C1C] bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition">
                                    This Week <ChevronDown size={12} />
                                </button>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C41C1C" stopOpacity={0.2} />
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
                                                borderRadius: "12px",
                                                border: "none",
                                                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                                                fontSize: "12px",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="registrations"
                                            stroke="#C41C1C"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorReg)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Contact reveals table */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">Recent Contact Reveals</h3>
                                <span className="text-xs text-gray-400 font-medium">Last 10 reveals</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                                            <th className="px-6 py-4">Revealer</th>
                                            <th className="px-6 py-4">Donor Name</th>
                                            <th className="px-6 py-4">Group</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {recentReveals.map((r) => (
                                            <tr key={r.id} className="border-b border-gray-50 hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-bold text-gray-900">{r.revealer}</td>
                                                <td className="px-6 py-4 text-gray-600">{r.donor}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-red-50 text-[#C41C1C] font-black px-2 py-1 rounded text-xs">
                                                        {r.group}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-xs">{r.location}</td>
                                                <td className="px-6 py-4 text-right text-gray-400 text-xs">{r.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                                <a href="#" className="text-sm font-bold text-[#C41C1C] hover:underline px-2">
                                    View all activities →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right column (4) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Blood group breakdown */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Requests by Group</h3>
                            <div className="space-y-5">
                                {groupStats.map(({ group, percentage }) => (
                                    <div key={group}>
                                        <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                                            <span>{group}</span>
                                            <span className="text-[#C41C1C]">{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-red-50 h-2 rounded-full overflow-hidden">
                                            <div className="bg-[#C41C1C] h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Score */}
                        <div className="bg-[#C41C1C] p-6 rounded-3xl shadow-lg shadow-red-200 text-white relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-700 rounded-full opacity-50" />
                            <div className="flex items-center gap-2 mb-4 relative z-10">
                                <div className="p-1.5 bg-white/20 rounded-lg">
                                    <Shield size={20} />
                                </div>
                                <h3 className="font-bold">Trust Score</h3>
                            </div>
                            <p className="text-red-100 text-sm leading-relaxed mb-6 relative z-10 pr-4">
                                System-wide donor verification status is currently at peak efficiency.
                            </p>
                            <div className="flex justify-between items-end relative z-10">
                                <h2 className="text-4xl font-black">98.4%</h2>
                                <Shield size={32} className="text-red-400 opacity-50" />
                            </div>
                        </div>

                        {/* Privacy Compliance */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy Compliance</h3>
                            <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-4 flex items-start gap-3">
                                <Lock size={18} className="text-green-600 mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-green-700 text-sm">All data encrypted</h4>
                                    <p className="text-[10px] text-green-600 mt-0.5 uppercase tracking-wide font-semibold">
                                        GDPR &amp; Local Health Privacy Compliant
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
