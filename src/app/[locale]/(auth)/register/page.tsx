"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import authService from "@/services/auth.service";
import { toast } from "sonner";

import {
    User, Mail, Calendar, ArrowRight, ArrowLeft,
    Droplet, Activity, Scaling, MapPin, Navigation,
    Building, CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
    const t = useTranslations("register");
    const te = useTranslations("errors");
    const router = useRouter();
    const { login } = useAuth();

    const [step, setStep] = useState(1);
    const [serverError, setServerError] = useState<string | null>(null);

    // ─── Validation Schemas ───────────────────────────────────────────────────

    // Combined schema for all steps
    const registerSchema = useMemo(() => z.object({
        // Step 1: Personal
        name: z.string().min(3, "Full Name must be at least 3 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().regex(/^3\d{2}\s?\d{7}$/, "Must be a valid Pakistani mobile number (e.g. 300 1234567)"),
        password: z.string().min(8, "Password must be at least 8 characters strong"),
        dob: z.string().min(4, "Date of birth is required"),

        // Step 2: Blood & Health
        bloodGroup: z.string().min(1, "Blood group is required"),
        lastDonationDate: z.string().min(1, "Required (Select 'Never' if first time)"),
        weight: z.string().optional(),
        healthConditions: z.string().optional(),

        // Step 3: Location
        province: z.string().min(1, "Province is required"),
        city: z.string().min(1, "City is required"),
        area: z.string().min(1, "Area is required"),
        address: z.string().min(5, "Full address is required for emergencies"),
    }), [te]);

    type RegisterFormData = z.infer<typeof registerSchema>;

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });


    // ─── Navigation Logic ──────────────────────────────────────────────────────

    const nextStep = async () => {
        let fieldsToValidate: (keyof RegisterFormData)[] = [];
        if (step === 1) fieldsToValidate = ["name", "email", "phone", "password", "dob"];
        if (step === 2) fieldsToValidate = ["bloodGroup", "lastDonationDate"];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    async function onSubmit(data: RegisterFormData) {
        setServerError(null);
        try {
            // Mock server response
            const response = await authService.register({
                ...data,
                role: "donor",
                password: data.password,
                confirmPassword: data.password
            });

            // Log in the user but with isVerified: false
            login({ ...response.user, isVerified: false }, response.accessToken);

            toast.success("Profile created! Redirecting to verification...");
            setTimeout(() => router.push("/verify"), 1500);
        } catch (err: unknown) {
            const msg = (err as { message?: string })?.message ?? te("registrationFailed");
            setServerError(msg);
            toast.error(msg);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-red-100 selection:text-red-900">


            <main className="flex-1 flex flex-col items-center py-12 px-4 sm:px-6 w-full">

                {/* Progress Stepper */}
                <div className="w-full max-w-2xl mb-12 flex items-center justify-center">
                    <div className="flex items-center w-full max-w-md relative">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 1 ? "bg-[#C41C1C] text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-400"}`}>
                                {step > 1 ? <CheckCircle2 size={20} /> : "1"}
                            </div>
                            <span className={`text-xs font-bold mt-2 absolute -bottom-6 whitespace-nowrap ${step >= 1 ? "text-[#C41C1C]" : "text-slate-400"}`}>Personal Info</span>
                        </div>

                        <div className={`flex-1 h-0.5 mx-2 transition-colors duration-500 ${step > 1 ? "bg-[#C41C1C]" : "bg-slate-200"}`}></div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 2 ? "bg-[#C41C1C] text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-400"}`}>
                                {step > 2 ? <CheckCircle2 size={20} /> : "2"}
                            </div>
                            <span className={`text-xs font-bold mt-2 absolute -bottom-6 whitespace-nowrap ${step >= 2 ? "text-[#C41C1C]" : "text-slate-400"}`}>Blood & Health</span>
                        </div>

                        <div className={`flex-1 h-0.5 mx-2 transition-colors duration-500 ${step > 2 ? "bg-[#C41C1C]" : "bg-slate-200"}`}></div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 3 ? "bg-[#C41C1C] text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-400"}`}>
                                3
                            </div>
                            <span className={`text-xs font-bold mt-2 absolute -bottom-6 whitespace-nowrap ${step >= 3 ? "text-[#C41C1C]" : "text-slate-400"}`}>Location</span>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white w-full max-w-2xl rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="mb-8">
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Personal Information</h1>
                                    <p className="text-slate-500 font-medium mt-1 text-sm italic">Let&apos;s start with your basic contact details.</p>
                                </div>

                                {serverError && (
                                    <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 font-medium">
                                        {serverError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                    <div className="relative flex items-center">
                                        <User size={18} className="absolute left-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            {...register("name")}
                                            className={`w-full bg-slate-50 border ${errors.name ? '!border-red-400 !bg-red-50 focus:!ring-red-100' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium`}
                                        />
                                    </div>
                                    {errors.name && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <div className="relative flex items-center">
                                        <Mail size={18} className="absolute left-4 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            {...register("email")}
                                            className={`w-full bg-slate-50 border ${errors.email ? '!border-red-400 !bg-red-50 focus:!ring-red-100' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium`}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Account Password</label>
                                    <div className="relative flex items-center">
                                        <div className="absolute left-4 text-slate-400 font-bold tracking-widest leading-none" style={{ marginTop: "-6px" }}>***</div>
                                        <input
                                            type="password"
                                            placeholder="Min. 8 characters"
                                            {...register("password")}
                                            className={`w-full bg-slate-50 border ${errors.password ? '!border-red-400 !bg-red-50 focus:!ring-red-100' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium`}
                                        />
                                    </div>
                                    {errors.password && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.password.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-4 bg-slate-100 border border-r-0 border-slate-200 text-slate-500 rounded-l-xl font-bold text-sm">+92</span>
                                            <input
                                                type="tel"
                                                placeholder="300 1234567"
                                                {...register("phone")}
                                                className={`w-full bg-slate-50 border ${errors.phone ? '!border-red-400 !bg-red-50 focus:!ring-red-100' : 'border-slate-200'} rounded-r-xl py-3.5 px-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium`}
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="MM/DD/YYYY"
                                                {...register("dob")}
                                                className={`w-full bg-slate-50 border ${errors.dob ? '!border-red-400 !bg-red-50 focus:!ring-red-100' : 'border-slate-200'} rounded-xl py-3.5 px-10 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium`}
                                            />
                                            <Calendar size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
                                        </div>
                                        {errors.dob && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.dob.message}</p>}
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:scale-[1.02] flex items-center gap-2"
                                    >
                                        Continue <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="mb-8">
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Blood & Health</h1>
                                    <p className="text-slate-500 font-medium mt-1 text-sm italic">Tell us about your blood group and eligibility.</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(group => (
                                        <label key={group} className="relative cursor-pointer group">
                                            <input
                                                type="radio"
                                                value={group}
                                                {...register("bloodGroup")}
                                                className="peer sr-only"
                                            />
                                            <div className="h-14 flex items-center justify-center rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-600 font-bold text-lg peer-checked:border-[#C41C1C] peer-checked:bg-red-50 peer-checked:text-[#C41C1C] transition-all group-hover:border-red-200 group-hover:bg-red-50/30">
                                                {group}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.bloodGroup && <p className="text-xs font-semibold text-red-600 ml-1">{errors.bloodGroup.message}</p>}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Last Donation Date</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="MM/DD/YYYY or 'Never'"
                                                {...register("lastDonationDate")}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium"
                                            />
                                            <Droplet size={18} className="absolute left-4 text-slate-400" />
                                        </div>
                                        {errors.lastDonationDate && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.lastDonationDate.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Body Weight (kg)</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="number"
                                                placeholder="e.g. 70"
                                                {...register("weight")}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium"
                                            />
                                            <Scaling size={18} className="absolute left-4 text-slate-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Health Conditions (Optional)</label>
                                    <div className="relative flex items-start">
                                        <textarea
                                            placeholder="Any existing conditions, medications, or allergies..."
                                            {...register("healthConditions")}
                                            rows={3}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium resize-none"
                                        />
                                        <Activity size={18} className="absolute left-4 top-4 text-slate-400" />
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:scale-[1.02] flex items-center gap-2"
                                    >
                                        Continue <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="mb-8">
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Current Location</h1>
                                    <p className="text-slate-500 font-medium mt-1 text-sm italic">Where should we look for recipients nearby?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Province/State</label>
                                        <select
                                            {...register("province")}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-bold text-slate-700"
                                        >
                                            <option value="">Select Province</option>
                                            <option value="Sindh">Sindh</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="KPK">KPK</option>
                                            <option value="Balochistan">Balochistan</option>
                                            <option value="Gilgit">Gilgit Baltistan</option>
                                        </select>
                                        {errors.province && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.province.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="Karachi, Lahore, etc."
                                                {...register("city")}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium"
                                            />
                                            <Building size={18} className="absolute left-4 text-slate-400" />
                                        </div>
                                        {errors.city && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.city.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Area / Sector</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="Gulshan-e-Iqbal"
                                                {...register("area")}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium"
                                            />
                                            <Navigation size={18} className="absolute left-4 text-slate-400" />
                                        </div>
                                        {errors.area && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.area.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                placeholder="Street 12, Block C..."
                                                {...register("address")}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all font-medium"
                                            />
                                            <MapPin size={18} className="absolute left-4 text-slate-400" />
                                        </div>
                                        {errors.address && <p className="mt-2 text-xs font-semibold text-red-600 ml-1">{errors.address.message}</p>}
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                                    >
                                        <ArrowLeft size={18} /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="rounded-full bg-[#C41C1C] px-12 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:scale-[1.02] flex items-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
                                    >
                                        {isSubmitting ? "Creating Account..." : "Complete Profile"}
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                <div className="mt-8 text-slate-500 text-sm font-medium">
                    Already have an account? <Link href={ROUTES.LOGIN} className="text-[#C41C1C] font-black hover:underline decoration-2 underline-offset-4">Sign In</Link>
                </div>
            </main>
        </div>
    );
}
