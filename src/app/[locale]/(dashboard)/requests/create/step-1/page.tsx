"use client";

import React from "react";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, ChevronRight, X, AlertCircle } from "lucide-react";
import { useRequestFormStore } from "@/store/request-form.store";
import { BLOOD_GROUPS } from "@/constants/site";
import { BloodGroup } from "@/types/donor";

const step1Schema = z.object({
    patientName: z.string().min(3, "Patient name must be at least 3 characters"),
    hospitalName: z.string().min(3, "Hospital name must be at least 3 characters"),
    units: z.string().min(1, "Required"),
    bloodGroup: z.enum([...BLOOD_GROUPS] as [BloodGroup, ...BloodGroup[]], {
        message: "Select blood type",
    }),
    urgency: z.enum(["urgent", "standard", "whenever"]),
});

type Step1Values = z.infer<typeof step1Schema>;

export default function RequestBloodStep1() {
    const router = useRouter();
    const { formData, updateStep1, resetForm } = useRequestFormStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            patientName: formData.patientName,
            hospitalName: formData.hospitalName,
            units: formData.units.toString(),
            bloodGroup: formData.bloodGroup as BloodGroup,
            urgency: formData.urgency === "urgent" ? "urgent" : "standard",
        },
    });

    const selectedUnits = watch("units");
    const selectedBloodGroup = watch("bloodGroup");
    const selectedUrgency = watch("urgency");

    const onSubmit = (data: Step1Values) => {
        updateStep1({
            ...data,
            units: parseInt(data.units, 10),
        });
        router.push("/requests/create/step-2");
    };

    return (
        <div className="relative">
            {/* Close Button UI like in mockup */}
            <button
                onClick={() => router.push("/dashboard")}
                className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 p-2 text-slate-300 hover:text-slate-600 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Patient Details</h1>
                <p className="text-sm font-bold text-slate-400">Step 1 of 3: Enter the medical requirements</p>
                <div className="mt-4 w-full bg-slate-50 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-[#C41C1C] h-full w-[15%] rounded-full shadow-[0_0_10px_rgba(196,28,28,0.3)]"></div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Patient Name */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Patient Full Name</label>
                    <input
                        {...register("patientName")}
                        className={`w-full bg-slate-50 border ${errors.patientName ? "border-red-500" : "border-slate-100"} rounded-xl p-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-300`}
                        placeholder="e.g. Ahmed Khan"
                    />
                    {errors.patientName && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.patientName.message}</p>}
                </div>

                {/* Hospital */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Hospital / Medical Center</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            {...register("hospitalName")}
                            className={`w-full bg-slate-50 border ${errors.hospitalName ? "border-red-500" : "border-slate-100"} rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-300`}
                            placeholder="Search hospital or city in Pakistan"
                        />
                    </div>
                    {errors.hospitalName && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.hospitalName.message}</p>}
                </div>

                {/* Units & Blood Group */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Units (Bags) Needed</label>
                        <select
                            {...register("units")}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-900 focus:outline-none appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(u => (
                                <option key={u} value={u}>{u} {u === 1 ? "Unit" : "Units"}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Required Blood Group</label>
                        <select
                            {...register("bloodGroup")}
                            className={`w-full bg-slate-50 border ${errors.bloodGroup ? "border-red-500" : "border-slate-100"} rounded-xl p-4 text-sm font-bold text-slate-900 focus:outline-none appearance-none`}
                        >
                            <option value="">Select Type</option>
                            {BLOOD_GROUPS.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                        {errors.bloodGroup && <p className="text-[10px] font-bold text-red-600 ml-1">{errors.bloodGroup.message}</p>}
                    </div>
                </div>

                {/* Urgency Toggle */}
                <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Request Urgency</label>
                    <div className="bg-slate-50 p-1 rounded-xl flex items-center border border-slate-100">
                        <button
                            type="button"
                            onClick={() => setValue("urgency", "standard")}
                            className={`flex-1 py-3 rounded-lg text-xs font-black transition-all ${selectedUrgency === "standard" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            Normal
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue("urgency", "urgent")}
                            className={`flex-1 py-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 ${selectedUrgency === "urgent" ? "bg-[#C41C1C] text-white shadow-lg shadow-red-100" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            {selectedUrgency === "urgent" && <AlertCircle size={14} className="animate-pulse" />}
                            Emergency
                        </button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-10 flex items-center justify-between border-t border-slate-50 mt-10">
                    <button
                        type="button"
                        onClick={() => { resetForm(); router.push("/dashboard"); }}
                        className="text-sm font-extrabold text-slate-400 hover:text-slate-600 transition-colors px-6"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#C41C1C] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-200 transition-all hover:scale-[1.02] hover:bg-[#A01717] active:scale-95 flex items-center gap-3"
                    >
                        Next: Location & Timing
                        <ChevronRight size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
