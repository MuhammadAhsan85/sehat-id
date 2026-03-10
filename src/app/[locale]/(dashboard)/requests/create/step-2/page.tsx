"use client";

import React from "react";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    ChevronDown, MapPin, ArrowRight, Calendar, ArrowLeft, X
} from "lucide-react";
import { useRequestFormStore } from "@/store/request-form.store";

const step2Schema = z.object({
    city: z.string().min(1, "City is required"),
    hospitalArea: z.string().min(1, "Hospital area is required"),
    requirementType: z.enum(["Urgent", "Scheduled"]),
    deadline: z.string().optional(),
}).refine((data) => {
    if (data.requirementType === "Scheduled") {
        return !!data.deadline;
    }
    return true;
}, {
    message: "Deadline is required for scheduled requests",
    path: ["deadline"],
}).refine((data) => {
    if (data.requirementType === "Scheduled" && data.deadline) {
        return new Date(data.deadline) > new Date();
    }
    return true;
}, {
    message: "Deadline must be in the future",
    path: ["deadline"],
});

type Step2Values = z.infer<typeof step2Schema>;

export default function RequestBloodStep2() {
    const router = useRouter();
    const { formData, updateStep2 } = useRequestFormStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Step2Values>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            city: formData.city || "",
            hospitalArea: formData.hospitalArea || "",
            requirementType: (formData.requirementType as "Urgent" | "Scheduled") || "Urgent",
            deadline: formData.deadline || "",
        },
    });

    const requirementType = watch("requirementType");

    const onSubmit = (data: Step2Values) => {
        updateStep2(data);
        router.push("/requests/create/step-3");
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button
                onClick={() => router.push("/dashboard")}
                className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 p-2 text-slate-300 hover:text-slate-600 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Progress Indicator */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-extrabold text-[#C41C1C] tracking-widest uppercase">Step 2 of 3</span>
                    <span className="text-xs font-bold text-slate-500">66% Complete</span>
                </div>
                <div className="w-full bg-red-50 rounded-full h-[3px] overflow-hidden">
                    <div className="bg-[#C41C1C] h-full rounded-full w-2/3 transition-all duration-500 shadow-[0_0_10px_rgba(196,28,28,0.3)]"></div>
                </div>
            </div>

            {/* Form Header */}
            <div className="mb-8 text-center max-w-sm mx-auto">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Location & Timing</h1>
                <p className="text-sm font-bold text-slate-400">
                    Where and when is the blood needed?
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                {/* City Dropdown */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">City</label>
                    <div className="relative flex items-center">
                        <select
                            {...register("city")}
                            className={`w-full bg-slate-50 border ${errors.city ? "border-red-500" : "border-slate-100"} text-slate-900 rounded-xl py-4 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all font-bold text-sm appearance-none cursor-pointer`}
                        >
                            <option value="" disabled>Select City</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.city && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.city.message}</p>}
                </div>

                {/* Hospital Area Input */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Hospital Area</label>
                    <input
                        {...register("hospitalArea")}
                        placeholder="e.g., Gulshan, DHA"
                        className={`w-full bg-slate-50 border ${errors.hospitalArea ? "border-red-500" : "border-slate-100"} text-slate-900 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all font-bold text-sm placeholder:text-slate-300`}
                    />
                    {errors.hospitalArea && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.hospitalArea.message}</p>}
                </div>

                {/* Requirement Type Toggle */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Requirement Type</label>
                    <div className="bg-slate-50 p-1 rounded-xl flex items-center border border-slate-100">
                        <button
                            type="button"
                            onClick={() => setValue("requirementType", "Urgent")}
                            className={`flex-1 py-3 rounded-lg text-xs font-black transition-all ${requirementType === 'Urgent'
                                    ? 'bg-[#C41C1C] text-white shadow-lg shadow-red-100'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            Urgent
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue("requirementType", "Scheduled")}
                            className={`flex-1 py-3 rounded-lg text-xs font-black transition-all ${requirementType === 'Scheduled'
                                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-200'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            Scheduled
                        </button>
                    </div>
                </div>

                {/* Deadline */}
                <div className={`space-y-2 transition-all duration-300 ${requirementType === 'Urgent' ? 'opacity-30' : 'opacity-100'}`}>
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1 flex items-center">
                        <Calendar size={14} className="mr-1.5" /> Deadline
                    </label>
                    <input
                        type="datetime-local"
                        {...register("deadline")}
                        disabled={requirementType === 'Urgent'}
                        className={`w-full bg-slate-50 border ${errors.deadline ? "border-red-500" : "border-slate-100"} text-slate-900 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all font-bold text-sm ${requirementType === 'Urgent' ? "cursor-not-allowed" : ""}`}
                    />
                    {errors.deadline && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.deadline.message}</p>}
                </div>

                {/* Hospital Location Map Placeholder */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest ml-1">Hospital Pin</label>
                    <div className="w-full h-32 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group cursor-pointer shadow-inner">
                        <div className="absolute inset-0 bg-[#E5E7EB] opacity-60" style={{
                            backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px)`,
                            backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
                        }}></div>
                        <div className="absolute inset-0 bg-blue-400/10 mix-blend-multiply"></div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C41C1C] flex flex-col items-center group-hover:scale-110 transition-transform">
                            <MapPin size={28} fill="currentColor" className="drop-shadow-md z-10" />
                            <div className="w-4 h-4 bg-red-500/40 rounded-full animate-ping absolute -bottom-1"></div>
                        </div>

                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-black px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 uppercase tracking-tighter">
                            Adjust Location
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="pt-10 flex items-center justify-between border-t border-slate-50 mt-10">
                    <button
                        type="button"
                        onClick={() => router.push("/requests/create/step-1")}
                        className="text-sm font-extrabold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 px-6"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        type="submit"
                        className="bg-[#C41C1C] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-200 transition-all hover:scale-[1.02] hover:bg-[#A01717] active:scale-95 flex items-center gap-3"
                    >
                        Next: Contact Info
                        <ArrowRight size={18} />
                    </button>
                </div>

            </form>
        </div>
    );
}
