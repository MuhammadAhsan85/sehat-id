import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
    title: "How It Works | SehatID",
    description: "Learn how SehatID connects blood donors with patients across Pakistan in three simple steps.",
};

const STEPS = [
    {
        number: "01",
        title: "Register as a Donor",
        description:
            "Create your secure profile in minutes. Share your blood group and location to start saving lives in your local community.",
        buttonLabel: "Become a Donor",
        buttonHref: ROUTES.REGISTER,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Search for Blood",
        description:
            "Find compatible blood types near you using our advanced search filters and real-time availability across major cities.",
        buttonLabel: "Find Donors",
        buttonHref: ROUTES.FIND_DONORS,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Connect Safely",
        description:
            "Communicate securely with verified donors while maintaining your privacy. Coordinate the donation process with ease.",
        buttonLabel: "Get Started",
        buttonHref: ROUTES.DASHBOARD,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
] as const;

export default function HowItWorksPage() {
    return (
        <>
            <main className="min-h-screen bg-[#f8f6f6]">

                {/* ── Single unified header ── */}
                <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
                    <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest text-[#C41C1C]">
                        SIMPLE. FAST. SAFE.
                    </span>
                    <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        How Sehat ID Works
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 leading-relaxed">
                        Connecting blood donors across Pakistan with a focus on trust, safety, and privacy through our streamlined three-step process.
                    </p>
                </section>

                {/* ── Step cards ── */}
                <section className="px-4 pb-20 sm:px-6 lg:px-8" aria-label="Three steps to donate blood">
                    <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-3">
                        {STEPS.map(({ number, title, description, icon, buttonLabel, buttonHref }) => (
                            <div
                                key={number}
                                className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Ghost step number */}
                                <span className="absolute right-6 top-5 text-7xl font-black leading-none text-slate-100 select-none" aria-hidden="true">
                                    {number}
                                </span>

                                {/* Icon badge */}
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C41C1C]">
                                    {icon}
                                </div>

                                {/* Text */}
                                <h2 className="mb-3 text-xl font-bold text-gray-900">{title}</h2>
                                <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-500">{description}</p>

                                {/* CTA button */}
                                <Link
                                    href={buttonHref}
                                    className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 block w-full text-center"
                                >
                                    {buttonLabel}
                                </Link>
                            </div>
                        ))}

                    </div>
                </section>

                {/* ── CTA strip ── */}
                <section className="border-t border-gray-200 bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Ready to get started?</h2>
                    <p className="mx-auto mt-3 max-w-md text-gray-500">
                        Join thousands of verified donors making a difference across Pakistan today.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={ROUTES.BECOME_DONOR}
                            className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 text-center"
                        >
                            Become a Donor
                        </Link>
                        <Link
                            href={ROUTES.FIND_DONORS}
                            className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 text-center"
                        >
                            Find Blood Now
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
