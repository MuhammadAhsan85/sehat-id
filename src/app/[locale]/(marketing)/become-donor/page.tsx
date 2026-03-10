"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BLOOD_GROUPS, PROVINCES } from "@/constants/site";
import type { BloodGroup } from "@/types/donor";

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const donorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    weight: z.number({ message: "Enter a valid weight" }).min(50, "Minimum weight is 50 kg"),
    bloodGroup: z.enum([...BLOOD_GROUPS] as [BloodGroup, ...BloodGroup[]], { message: "Please select a blood group" }),
    hasChronicIllness: z.boolean(),
    lastDonationDate: z.string().optional(),
    city: z.string().min(2, "City is required"),
    province: z.string().min(1, "Province is required"),
});
type DonorFormData = z.infer<typeof donorSchema>;

const STEPS = ["Personal Info", "Blood & Health", "Location"] as const;

// ─── Reusable form field wrapper ──────────────────────────────────────────────
function FormField({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-[#C41C1C]" role="alert">{error}</p>}
        </div>
    );
}

export default function BecomeDonorPage() {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const inputClass = "input-premium bg-white";

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } =
        useForm<DonorFormData>({ resolver: zodResolver(donorSchema), mode: "onBlur" });

    const stepFields: Array<(keyof DonorFormData)[]> = [
        ["name", "dateOfBirth", "weight"],
        ["bloodGroup", "hasChronicIllness"],
        ["city", "province"],
    ];

    async function goNext() {
        const valid = await trigger(stepFields[step]);
        if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    async function onSubmit(_data: DonorFormData) {
        // TODO: await donorService.registerAsDonor(_data);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-[#f8f6f6] px-4">
                    <div className="max-w-md animate-fade-up text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-2xl font-extrabold text-gray-900">You&apos;re Registered!</h1>
                        <p className="text-gray-500">Thank you for joining Pakistan&apos;s blood donor network. Your profile will be reviewed within 24 hours.</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-[#f8f6f6]">
                <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">

                    {/* Progress */}
                    <nav aria-label="Registration steps" className="mb-10">
                        <ol className="flex items-center gap-0">
                            {STEPS.map((label, i) => (
                                <li key={label} className="flex flex-1 items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${i < step ? "bg-emerald-500 text-white" : i === step ? "bg-[#C41C1C] text-white" : "bg-gray-200 text-gray-500"}`}
                                            aria-current={i === step ? "step" : undefined}
                                        >
                                            {i < step ? "✓" : i + 1}
                                        </div>
                                        <span className="mt-1 hidden text-xs font-medium text-gray-500 sm:block">{label}</span>
                                    </div>
                                    {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-2 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {/* Form card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm animate-fade-up">
                        <h1 className="mb-1 text-xl font-bold text-gray-900">{STEPS[step]}</h1>
                        <p className="mb-6 text-sm text-gray-500">Step {step + 1} of {STEPS.length}</p>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {step === 0 && (
                                <div className="space-y-5">
                                    <FormField label="Full Name" htmlFor="name" error={errors.name?.message}>
                                        <input id="name" type="text" autoComplete="name" placeholder="e.g. Ahmed Khan" {...register("name")} className={inputClass} />
                                    </FormField>
                                    <FormField label="Date of Birth" htmlFor="dob" error={errors.dateOfBirth?.message}>
                                        <input id="dob" type="date" max={new Date().toISOString().split("T")[0]} {...register("dateOfBirth")} className={inputClass} />
                                    </FormField>
                                    <FormField label="Weight (kg)" htmlFor="weight" error={errors.weight?.message}>
                                        <input id="weight" type="number" min={50} max={200} placeholder="e.g. 70" {...register("weight", { valueAsNumber: true })} className={inputClass} />
                                    </FormField>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-5">
                                    <FormField label="Blood Group" htmlFor="bloodGroup" error={errors.bloodGroup?.message}>
                                        <select id="bloodGroup" {...register("bloodGroup")} className={inputClass}>
                                            <option value="">Select blood group</option>
                                            {BLOOD_GROUPS.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                                        </select>
                                    </FormField>
                                    <FormField label="Last Donation Date (optional)" htmlFor="lastDonation" error={undefined}>
                                        <input id="lastDonation" type="date" {...register("lastDonationDate")} className={inputClass} />
                                    </FormField>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" {...register("hasChronicIllness")} className="h-4 w-4 rounded border-gray-300 text-[#C41C1C] focus:ring-[#C41C1C]" />
                                        <span className="text-sm text-gray-700">I have a chronic illness or condition</span>
                                    </label>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <FormField label="Province" htmlFor="province" error={errors.province?.message}>
                                        <select id="province" {...register("province")} className={inputClass}>
                                            <option value="">Select province</option>
                                            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    </FormField>
                                    <FormField label="City" htmlFor="city" error={errors.city?.message}>
                                        <input id="city" type="text" placeholder="e.g. Lahore" {...register("city")} className={inputClass} />
                                    </FormField>
                                </div>
                            )}

                            <div className="mt-8 flex items-center justify-between gap-4">
                                <button type="button" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0} className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">
                                    Back
                                </button>
                                {step < STEPS.length - 1 ? (
                                    <button type="button" onClick={goNext} className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1">Continue</button>
                                ) : (
                                    <button type="submit" disabled={isSubmitting} className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1">
                                        {isSubmitting ? "Registering…" : "Register as Donor"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
