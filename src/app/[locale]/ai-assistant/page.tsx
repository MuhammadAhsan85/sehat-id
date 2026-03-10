import React from "react";
import { useTranslations } from "next-intl";

export default function AIAssistantPage() {
    const t = useTranslations("marketing");

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6 text-[#C41C1C]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">AI Blood Match Assistant</h1>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        Our AI assistant can help triage emergency requests and find the best matching donors in your area instantly.
                    </p>
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Coming Soon</p>
                        <p className="text-slate-600 mt-2">The AI Assistant interface is currently under development.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
