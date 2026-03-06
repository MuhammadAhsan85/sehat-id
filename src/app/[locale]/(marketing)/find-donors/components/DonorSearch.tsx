"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Building2, ChevronDown, Search, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ROUTES } from "@/constants/routes";
import { useDonorSearch } from "@/hooks/useDonorSearch";
import type { BloodGroup, Donor } from "@/types/donor";

export function DonorSearch() {
    const { filters, results, total, isLoading, updateFilter, refetch } = useDonorSearch();

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900 selection:bg-red-100 selection:text-red-900 pt-10 pb-20">
            {/* Custom Keyframes for Entrance Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeUp {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                opacity: 0;
                }
            `}} />

            {/* Main Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 mt-8">

                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 bg-red-50 text-[#C52B2A] px-4 py-3 rounded-xl font-medium transition-transform hover:scale-[1.02] shadow-sm">
                                <Clock size={18} />
                                <span>Available Now</span>
                            </button>
                            <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                                <MapPin size={18} />
                                <span>Distance Radius</span>
                            </button>
                            <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                                <Building2 size={18} />
                                <span>Hospital Proximity</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Advanced Filters</h4>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-[#C52B2A] checked:border-transparent transition-colors cursor-pointer" />
                                    <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm font-medium">Verified Only</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded checked:bg-[#C52B2A] checked:border-transparent transition-colors cursor-pointer" />
                                    <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm font-medium">Previous Donors</span>
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <section className="flex-1 min-w-0">

                    <div className="mb-8 animate-fade-up" style={{ animationDelay: '150ms' }}>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Find a Blood Donor</h1>
                        <p className="text-gray-500 text-lg">Connect with verified donors in Pakistan instantly.</p>
                    </div>

                    {/* Search Box */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 mb-10 animate-fade-up relative z-10" style={{ animationDelay: '200ms' }}>

                        <div className="flex-1 w-full md:w-auto relative group">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-3">Blood Group</label>
                            <div className="relative border border-transparent group-hover:border-gray-100 rounded-xl transition-colors">
                                <select
                                    className="w-full appearance-none bg-transparent py-2 pl-3 pr-8 text-gray-900 font-semibold focus:outline-none cursor-pointer"
                                    value={filters.bloodGroup || ""}
                                    onChange={(e) => updateFilter("bloodGroup", (e.target.value as BloodGroup) || "")}
                                >
                                    <option value="">Any Range</option>
                                    <option value="O+">O+</option>
                                    <option value="A+">A+</option>
                                    <option value="B+">B+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="O-">O-</option>
                                    <option value="A-">A-</option>
                                    <option value="B-">B-</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#C52B2A] transition-colors" />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-gray-100"></div>

                        <div className="flex-[2] w-full md:w-auto relative group">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-8">City/Location</label>
                            <div className="relative flex items-center border border-transparent group-focus-within:border-red-100 rounded-xl transition-all">
                                <MapPin size={18} className="absolute left-2 text-gray-400 group-focus-within:text-[#C52B2A] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Enter city or area"
                                    className="w-full bg-transparent py-2 pl-9 pr-4 text-gray-900 font-semibold placeholder-gray-400 focus:outline-none"
                                    value={filters.city || ""}
                                    onChange={(e) => updateFilter("city", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-auto flex bg-gray-50 rounded-full p-1 border border-gray-200">
                            <button className="flex-1 px-6 py-2 rounded-full text-sm font-bold bg-white shadow-sm text-gray-900">Normal</button>
                            <button className="flex-1 px-6 py-2 rounded-full text-sm font-bold text-[#C52B2A] hover:bg-red-50 transition-colors">Urgent</button>
                        </div>

                        <button
                            onClick={refetch}
                            className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>

                    {/* Results Header */}
                    <div className="flex justify-between items-center mb-6 animate-fade-up" style={{ animationDelay: '250ms' }}>
                        <h2 className="text-gray-900 font-semibold text-lg">Showing <span className="text-[#C52B2A] font-extrabold">{total}</span> verified donors</h2>
                        <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Sort by:</span>
                            <button className="font-bold text-[#C52B2A] flex items-center hover:text-red-800 transition-colors">
                                Closest First <ChevronDown size={16} className="ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Loader2 size={40} className="animate-spin text-[#C52B2A] mb-4" />
                            <p className="font-medium text-gray-600">Finding the perfect match...</p>
                        </div>
                    ) : results.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-up">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No donors found</h3>
                            <p className="text-gray-500 max-w-sm mb-6">We couldn't find any donors matching your current search criteria. Try adjusting your filters.</p>
                            <button
                                onClick={() => updateFilter("bloodGroup", "")}
                                className="bg-red-50 text-[#C52B2A] px-6 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        // Donor Cards Grid
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {results.map((donor, idx) => (
                                <div
                                    key={donor.id}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(197,43,42,0.12)] hover:-translate-y-1 transition-all duration-300 animate-fade-up group"
                                    style={{ animationDelay: `${300 + (Math.min(idx, 10) * 100)}ms` }}
                                >
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
                                        <div className="bg-red-50 text-[#C52B2A] font-black text-xl px-4 py-2 rounded-xl group-hover:scale-105 transition-transform">
                                            {donor.bloodGroup}
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
                                        <Link href={ROUTES.REGISTER} className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex-1 text-center">
                                            Request Connection
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-2 animate-fade-up" style={{ animationDelay: '700ms' }}>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors shadow-sm">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#C52B2A] text-white font-bold shadow-md hover:bg-red-800 transition-colors">1</button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 transition-colors">2</button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 transition-colors">3</button>
                        <span className="text-gray-400 font-bold tracking-widest px-2">...</span>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 transition-colors">8</button>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                </section>
            </main>
        </div >
    );
}

