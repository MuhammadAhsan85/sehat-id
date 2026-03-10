import React from "react";
import { useTranslations } from "next-intl";

export default function TrustSafetyPage() {
    const t = useTranslations("marketing");

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Trust & Safety Guidelines</h1>
                    <p className="text-slate-600 mb-4">
                        At Sehat-ID, the safety of our donors and recipients is our top priority.
                        This page outlines our commitment to maintaining a secure and trustworthy blood donation network.
                    </p>
                    {/* Placeholder content */}
                    <div className="mt-8 space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">Donor Verification</h2>
                            <p className="text-slate-600">All registered donors must pass our basic verification process to ensure authenticity.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-3">Data Privacy</h2>
                            <p className="text-slate-600">Your health data and contact information are encrypted and only shared when you explicitly agree to a donation request.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
