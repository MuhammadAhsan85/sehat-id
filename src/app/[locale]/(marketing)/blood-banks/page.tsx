import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
    title: "Blood Bank Directory | SehatID",
    description: "Find verified blood banks near you across Pakistan — Karachi, Lahore, Islamabad, and more.",
};

const BANKS = [
    { name: "Indus Hospital Blood Bank", city: "Karachi", province: "Sindh", phone: "+92 21 3511 2709", hours: "24/7" },
    { name: "Agha Khan University Blood Bank", city: "Karachi", province: "Sindh", phone: "+92 21 3493 0051", hours: "24/7" },
    { name: "Pakistan Red Crescent Society", city: "Lahore", province: "Punjab", phone: "+92 42 3576 1820", hours: "8am – 10pm" },
    { name: "Sheikh Zayed Medical Complex Blood Bank", city: "Lahore", province: "Punjab", phone: "+92 42 3576 0390", hours: "24/7" },
    { name: "PIMS Blood Bank", city: "Islamabad", province: "Islamabad", phone: "+92 51 926 1170", hours: "8am – 8pm" },
    { name: "Benazir Bhutto Hospital Blood Bank", city: "Rawalpindi", province: "Punjab", phone: "+92 51 511 7432", hours: "24/7" },
    { name: "KTH Blood Bank", city: "Peshawar", province: "KPK", phone: "+92 91 921 1373", hours: "8am – 6pm" },
    { name: "Quetta Civil Hospital Blood Bank", city: "Quetta", province: "Balochistan", phone: "+92 81 920 8062", hours: "8am – 8pm" },
];

export default function BloodBanksPage() {
    return (
        <>
            <main className="min-h-screen bg-[#f8f6f6]">
                <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#C41C1C]">Directory</p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Blood Bank Directory</h1>
                        <p className="mx-auto mt-3 max-w-xl text-gray-500">
                            Verified blood banks across Pakistan. Call ahead to confirm availability before visiting.
                        </p>
                    </div>

                    {/* Bank cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {BANKS.map((bank) => (
                            <div key={bank.name} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C41C1C] text-white">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="font-bold text-gray-900 leading-snug">{bank.name}</h2>
                                        <p className="mt-0.5 text-sm text-gray-500">{bank.city}, {bank.province}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-400" aria-hidden="true">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <a href={`tel:${bank.phone.replace(/\s/g, "")}`} className="hover:text-[#C41C1C]">{bank.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-400" aria-hidden="true">
                                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{bank.hours}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 rounded-2xl bg-[#C41C1C] p-8 text-center text-white">
                        <h2 className="text-xl font-bold">Can&apos;t find a blood bank nearby?</h2>
                        <p className="mt-2 text-sm text-red-100">Search for individual donors in your city right now.</p>
                        <Link href={ROUTES.FIND_DONORS} className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 mt-5 inline-block">
                            Find a Donor
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
