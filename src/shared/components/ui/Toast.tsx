"use client";

// Toast — lightweight slide-in notification banner
// Usage: <Toast type="success" message="Done!" onClose={() => setToast(null)} />

import { useEffect } from "react";

interface ToastProps {
    type: "success" | "error" | "info";
    message: string;
    onClose: () => void;
    /** Auto-dismiss after ms (default 4000). Pass 0 to disable. */
    duration?: number;
}

const STYLES = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50   border-red-200   text-red-800",
    info: "bg-blue-50  border-blue-200  text-blue-800",
};

const ICONS = {
    success: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
        </svg>
    ),
    error: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    info: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
    ),
};

export default function Toast({ type, message, onClose, duration = 4000 }: ToastProps) {
    useEffect(() => {
        if (duration === 0) return;
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [duration, onClose]);

    return (
        <div
            role="alert"
            aria-live="polite"
            className={`fixed right-4 top-4 z-[9999] flex max-w-sm animate-slide-in items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg ${STYLES[type]}`}
        >
            <span className="mt-0.5 shrink-0">{ICONS[type]}</span>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss notification"
                className="ml-1 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
}
