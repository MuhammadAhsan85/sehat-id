"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Shield, Lock, MapPin, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import Logo from "@/shared/components/Logo";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ── OPT Input Component ───────────────────────────────────────────────────────
function OtpInput({ onChange }: { onChange: (val: string) => void }) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    function handleChange(idx: number, val: string) {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        onChange(next.join(""));
        if (val && idx < 5) refs.current[idx + 1]?.focus();
    }

    function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            refs.current[idx - 1]?.focus();
        }
    }

    return (
        <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => { refs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 md:w-14 md:h-16 border-2 border-slate-200 rounded-xl text-center text-xl font-bold text-slate-900 focus:border-[#C41C1C] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
            ))}
        </div>
    );
}

export default function VerifyPage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [verifying, setVerifying] = useState(false);

    // Zod Schema for OTP
    const verifySchema = z.object({
        otp: z.string().length(6, "Verification code must be exactly 6 digits"),
    });

    type VerifyFormData = z.infer<typeof verifySchema>;

    const { handleSubmit, setValue, formState: { errors, isValid } } = useForm<VerifyFormData>({
        resolver: zodResolver(verifySchema),
        mode: "onChange",
        defaultValues: { otp: "" }
    });

    // Guard: If already verified, go to dashboard
    useEffect(() => {
        if (user?.isVerified) {
            router.push(ROUTES.DASHBOARD);
        }
    }, [user, router]);

    async function onSubmit(data: VerifyFormData) {
        setVerifying(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));

        if (user && data.otp.length === 6) {
            // Update global state and cookie
            setUser({ ...user, isVerified: true });
            toast.success("Verification successful!");
            setTimeout(() => router.push(ROUTES.DASHBOARD), 1000);
        } else {
            toast.error("Invalid verification code. Please try again.");
            setVerifying(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">


            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 w-full">
                <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-red-50 text-[#C41C1C] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">One Last Step!</h1>
                        <p className="text-slate-500 font-medium mt-3">
                            We&apos;ve sent a 6-digit verification code to <span className="text-slate-900 font-bold">{user?.phone || "+92 300 *******"}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <OtpInput onChange={(val) => setValue("otp", val, { shouldValidate: true })} />

                        {errors.otp && (
                            <p className="text-center text-red-600 font-bold text-xs mb-4 uppercase tracking-wider">{errors.otp.message}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!isValid || verifying}
                            className="w-full py-4 bg-[#C41C1C] text-white rounded-full font-bold shadow-xl shadow-red-100 hover:bg-[#A01717] disabled:bg-slate-200 disabled:shadow-none transition-all flex items-center justify-center gap-2 mb-6"
                        >
                            {verifying ? (
                                <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : (
                                <>Verify & Access Dashboard <CheckCircle2 size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="space-y-4 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Didn&apos;t receive the code? <button className="text-[#C41C1C] font-bold hover:underline">Resend in 01:59</button>
                        </p>
                        <Link href={ROUTES.REGISTER} className="flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors">
                            <ArrowLeft size={14} /> Back to Registration
                        </Link>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                    {[
                        { title: "Secure", desc: "End-to-end encrypted", icon: <Lock size={20} /> },
                        { title: "Private", desc: "No data sharing", icon: <Shield size={20} /> },
                        { title: "Fast", desc: "Instant activation", icon: <CheckCircle2 size={20} /> }
                    ].map(item => (
                        <div key={item.title} className="bg-white/50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-xl text-[#C41C1C] shadow-sm">{item.icon}</div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
