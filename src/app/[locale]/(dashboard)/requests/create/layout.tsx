"use client";

import React from "react";
import { usePathname } from "@/i18n/navigation";
import { CheckCircle2, AlertCircle, ShoppingBag, Fingerprint, ClipboardCheck } from "lucide-react";
import { useRequestFormStore } from "@/store/request-form.store";

const STEPS = [
    {
        id: 1,
        label: "Request Info",
        sublabel: "Basic Details",
        path: "/requests/create/step-1",
        icon: ShoppingBag
    },
    {
        id: 2,
        label: "Verify Identity",
        sublabel: "Security Check",
        path: "/requests/create/step-2",
        icon: Fingerprint
    },
    {
        id: 3,
        label: "Confirm Request",
        sublabel: "Final Review",
        path: "/requests/create/step-3",
        icon: ClipboardCheck
    },
];

export default function CreateRequestLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isSuccessPage = pathname.includes("/success");

    if (isSuccessPage) {
        return (
            <main className="min-h-[80vh] flex items-center justify-center bg-[#FAFAFA] p-6 lg:p-12">
                <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 lg:p-12">
                    {children}
                </div>
            </main>
        );
    }

    const currentStepIndex = STEPS.findIndex((s) => pathname.includes(s.path));
    const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

    return (
        <main className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 lg:p-10 py-20 font-sans">
            <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-white flex flex-col lg:flex-row overflow-hidden min-h-[650px]">

                {/* Sidebar */}
                <aside className="w-full lg:w-[320px] bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#C41C1C]">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-900 leading-tight">Request Blood</h2>
                            <p className="text-[10px] font-bold text-[#C41C1C] uppercase tracking-widest">Urgent Assistance</p>
                        </div>
                    </div>

                    <div className="space-y-8 flex-1">
                        {STEPS.map((step, index) => {
                            const isCompleted = index < activeIndex;
                            const isActive = index === activeIndex;
                            const Icon = step.icon;

                            return (
                                <div key={step.id} className="flex items-start group">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                                            ${isCompleted ? "bg-[#C41C1C] border-[#C41C1C] text-white" :
                                                isActive ? "bg-white border-[#C41C1C] text-[#C41C1C] shadow-lg shadow-red-100" :
                                                    "bg-slate-100 border-slate-100 text-slate-400"}`}
                                        >
                                            {isCompleted ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{step.id}</span>}
                                        </div>
                                        {index !== STEPS.length - 1 && (
                                            <div className={`w-0.5 h-12 my-1 rounded-full transition-colors duration-300
                                                ${isCompleted ? "bg-[#C41C1C]" : "bg-slate-200"}`}
                                            />
                                        )}
                                    </div>
                                    <div className="pt-1">
                                        <h3 className={`text-sm font-extrabold transition-colors duration-300
                                            ${isActive || isCompleted ? "text-slate-900" : "text-slate-400"}`}
                                        >
                                            {step.label}
                                        </h3>
                                        <p className={`text-[11px] font-bold uppercase tracking-wider
                                            ${isActive ? "text-[#C41C1C]" : "text-slate-400"}`}
                                        >
                                            {isActive ? "In Progress" : isCompleted ? "Completed" : "Pending"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Note Box */}
                    <div className="mt-12 bg-red-50/50 rounded-2xl p-5 border border-red-100/50">
                        <h4 className="text-[10px] font-black text-[#C41C1C] uppercase tracking-[0.15em] mb-2">Note</h4>
                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic">
                            Blood donation is a gift of life. Ensure all details are accurate to speed up the verification process.
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <section className="flex-1 p-8 lg:p-14 overflow-y-auto">
                    {children}
                </section>
            </div>
        </main>
    );
}
