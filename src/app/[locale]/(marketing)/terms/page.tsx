import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | SehatID",
    description: "SehatID terms of service — your rights and responsibilities as a platform user.",
};

const TERMS = [
    { title: "1. Acceptance of Terms", body: "By accessing or using SehatID, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use the platform." },
    { title: "2. Eligibility", body: "Donors must be at least 18 years old and meet the minimum health criteria (weight ≥ 50 kg, no chronic blood-borne illness). Ineligible users must not register as donors." },
    { title: "3. Accuracy of Information", body: "You must provide accurate, current, and complete information during registration. False information about your health status or eligibility may put patients at risk and may result in account termination." },
    { title: "4. Prohibited Conduct", body: "You must not use SehatID for commercial solicitation, harassment, impersonation, or any activity that violates Pakistani law. We reserve the right to suspend accounts that violate community standards." },
    { title: "5. Medical Disclaimer", body: "SehatID is a connectivity platform, not a healthcare provider. We do not provide medical advice. All donation decisions must be made in consultation with qualified medical professionals." },
    { title: "6. Limitation of Liability", body: "SehatID is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you have paid us in the past 12 months." },
    { title: "7. Contact", body: "For legal inquiries, contact legal@sehatid.pk." },
];

export default function TermsPage() {
    return (
        <>
            <main className="flex-1 flex flex-col items-center bg-[#f8f6f6] py-12 px-4 sm:px-6 w-full">
                <div className="mx-auto max-w-3xl w-full">
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C41C1C]">Legal</p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Terms of Service</h1>
                        <p className="mt-3 text-gray-500">Last updated: March 2024</p>
                    </div>
                    <div className="space-y-8">
                        {TERMS.map(({ title, body }) => (
                            <section key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-3 text-lg font-bold text-gray-900">{title}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
