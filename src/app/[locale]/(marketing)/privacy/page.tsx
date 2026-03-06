import type { Metadata } from "next";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy | SehatID",
    description: "SehatID privacy policy — how we collect, use, and protect your personal data.",
};

const SECTIONS = [
    {
        title: "1. Information We Collect",
        body: "We collect your name, email address, blood group, and general location (city/province) when you register as a donor. We never store your raw CNIC number — it is salted and hashed immediately upon entry. Phone numbers are only shared with verified matches after both parties consent.",
    },
    {
        title: "2. How We Use Your Data",
        body: "Your data is used solely to match blood donors with patients in urgent need. We do not sell, rent, or share your personal information with third parties for commercial purposes.",
    },
    {
        title: "3. Data Security",
        body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Sensitive identifiers (CNIC) are hashed using SHA-256 with a unique salt per user. Our infrastructure is hosted in secured, HIPAA-aligned environments.",
    },
    {
        title: "4. Contact Information Sharing",
        body: "Phone numbers and personal contact details are not visible to the public. They are revealed only after a confirmed match, and only to the requesting party for a limited time window.",
    },
    {
        title: "5. Your Rights",
        body: "You have the right to access, correct, or delete your data at any time. To submit a request, contact us at privacy@sehatid.pk. We will respond within 30 days.",
    },
    {
        title: "6. Changes to This Policy",
        body: "We may update this policy periodically. Changes will be communicated via email and a notice on the platform. Continued use of SehatID after changes constitutes acceptance.",
    },
];

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f8f6f6]">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C41C1C]">Legal</p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Privacy Policy</h1>
                        <p className="mt-3 text-gray-500">Last updated: March 2024</p>
                    </div>
                    <div className="space-y-8">
                        {SECTIONS.map(({ title, body }) => (
                            <section key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-3 text-lg font-bold text-gray-900">{title}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
