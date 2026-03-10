'use client';

import React from 'react';
import { Link } from "@/i18n/navigation";
import { Home, AlertCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
                <AlertCircle className="text-[#C41C1C]" size={40} />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                404
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                Page Not Found
            </h2>

            <p className="text-slate-500 font-medium max-w-md mb-10 leading-relaxed">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                href={ROUTES.HOME}
                className="rounded-full bg-[#C41C1C] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                <Home size={18} />
                Return to Home
            </Link>
        </div>
    );
}
