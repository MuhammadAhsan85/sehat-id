'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log to an error monitoring service
        console.error('App Boundary Error:', error);
    }, [error]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
                <AlertTriangle className="text-[#C41C1C]" size={40} />
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Something went wrong!
            </h1>

            <p className="text-slate-500 font-medium max-w-md mb-10 leading-relaxed">
                An unexpected error occurred within our application. Our team has been notified. Let's get you back on track.
            </p>

            <button
                onClick={() => reset()}
                className="rounded-full bg-[#C41C1C] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                <RotateCcw size={18} />
                Try Again
            </button>
        </div>
    );
}
