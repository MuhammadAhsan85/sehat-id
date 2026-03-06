/**
 * Verification & Profile Setup page
 * Route: /verify
 *
 * Two-panel layout:
 *  Left  — 6-digit OTP verification with countdown + resend
 *  Right — Profile setup form (name, blood group, city, area, last donation, CNIC)
 *          + availability toggle
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Shield, Lock, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/shared/components/Logo";
import Footer from "@/shared/components/Footer";
import { ROUTES } from "@/constants/routes";

// ── OTP Input ─────────────────────────────────────────────────────────────────
function OtpInput({ onChange }: { onChange: (val: string) => void }) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    function handleChange(idx: number, val: string) {
        if (!/^\d?$/.test(val)) return; // digits only
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
                    aria-label={`OTP digit ${i + 1}`}
                    className="w-12 h-14 md:w-14 md:h-16 border-2 border-gray-200 rounded-xl text-center text-xl font-bold text-gray-900 focus:border-[#C41C1C] outline-none transition-colors"
                />
            ))}
        </div>
    );
}

// ── Countdown timer ────────────────────────────────────────────────────────────
function CountdownTimer({ initialSeconds = 119 }: { initialSeconds?: number }) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) return;
        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [seconds]);

    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    return (
        <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mb-8">
            {seconds > 0 ? (
                <>Resend code in <span className="text-[#C41C1C] font-bold">{mm}:{ss}</span></>
            ) : (
                <button
                    type="button"
                    onClick={() => setSeconds(initialSeconds)}
                    className="text-[#C41C1C] font-bold hover:underline"
                >
                    Resend code
                </button>
            )}
        </p>
    );
}

// ── Availability Toggle ────────────────────────────────────────────────────────
function AvailabilityToggle() {
    const [isAvailable, setIsAvailable] = useState(true);
    return (
        <div className="bg-[#F8FDF9] border border-[#E3F2E8] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C10.4 2 8.6 3.9 8 7H4c-.6 0-1 .4-1 1s.4 1 1 1h.2l1.6 9.6a2 2 0 0 0 2 1.4h8.4a2 2 0 0 0 2-1.4L19.8 9H20c.6 0 1-.4 1-1s-.4-1-1-1h-4c-.6-3.1-2.4-5-4-5z" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Available to Donate</h4>
                    <p className="text-xs text-gray-500">You will appear in donor searches</p>
                </div>
            </div>
            <button
                type="button"
                onClick={() => setIsAvailable((p) => !p)}
                aria-pressed={isAvailable}
                aria-label="Toggle availability"
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${isAvailable ? "bg-green-500" : "bg-gray-300"}`}
            >
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${isAvailable ? "translate-x-6" : "translate-x-0"}`} />
            </button>
        </div>
    );
}

// ── Field helpers ──────────────────────────────────────────────────────────────
const fieldClass = "input-premium bg-white";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function VerifyPage() {
    const router = useRouter();
    const [otpValue, setOtpValue] = useState("");
    const [otpError, setOtpError] = useState("");
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);

    function handleVerify() {
        if (otpValue.length < 6) {
            setOtpError("Please enter all 6 digits.");
            return;
        }
        setOtpError("");
        // TODO: call API to verify OTP
        alert("OTP verified! ✅");
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const blood = (form.elements.namedItem("blood-group") as HTMLSelectElement).value;
        if (!blood) {
            setFormError("Blood Group is required.");
            return;
        }
        setFormError("");
        setSaving(true);
        // TODO: call API to save profile
        setTimeout(() => {
            setSaving(false);
            router.push(ROUTES.DASHBOARD);
        }, 800);
    }
    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">

            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
                        <Link href={ROUTES.FIND_DONORS} className="hover:text-[#C41C1C] transition-colors">Find Donors</Link>
                        <Link href={ROUTES.BECOME_DONOR} className="hover:text-[#C41C1C] transition-colors">Become a Donor</Link>
                        <Link href={ROUTES.HOW_IT_WORKS} className="hover:text-[#C41C1C] transition-colors">How it Works</Link>
                        <Link href={ROUTES.ABOUT} className="hover:text-[#C41C1C] transition-colors">About Us</Link>
                    </nav>
                    <Link
                        href={ROUTES.LOGIN}
                        className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1"
                    >
                        Sign In
                    </Link>
                </div>
            </header>

            {/* Main two-panel layout */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left: OTP Verification ── */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <Link
                                href={ROUTES.REGISTER}
                                className="text-[#C41C1C] hover:bg-red-50 p-2 rounded-full transition"
                                aria-label="Go back"
                            >
                                <ArrowLeft size={24} />
                            </Link>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Verify Your Number</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    We&apos;ve sent a 6-digit code to +92 300 *******
                                </p>
                            </div>
                        </div>

                        <OtpInput onChange={setOtpValue} />
                        {otpError && (
                            <p className="text-sm text-red-600 -mt-6 mb-4 text-center font-semibold">{otpError}</p>
                        )}
                        <CountdownTimer />

                        <button
                            type="button"
                            onClick={handleVerify}
                            className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full mb-4"
                        >
                            Verify Code
                        </button>
                        <p className="text-center text-sm text-gray-400">
                            Problem? <Link href={ROUTES.REGISTER} className="text-[#C41C1C] font-semibold hover:underline">Go back</Link>
                        </p>
                    </div>

                    {/* ── Right: Profile Setup ── */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        {/* Progress */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-black text-[#C41C1C] tracking-wider">STEP 1 OF 1</span>
                            <span className="text-xs text-gray-400 font-medium">100% completed</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8">
                            <div className="bg-[#C41C1C] h-1.5 rounded-full w-full" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Profile</h2>

                        <form className="space-y-6" onSubmit={handleSave}>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">Full Name</label>
                                    <input id="name" type="text" placeholder="e.g. Ahmed Khan" className={fieldClass} />
                                </div>

                                {/* Blood Group */}
                                <div className="space-y-2 relative">
                                    <label htmlFor="blood-group" className="block text-sm font-bold text-gray-700">Blood Group</label>
                                    <select id="blood-group" className={fieldClass + " appearance-none text-gray-700"}>
                                        <option value="">Select Group</option>
                                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                    <span className="absolute top-10 right-8 bg-red-50 text-[#C41C1C] text-[10px] font-black px-2 py-0.5 rounded tracking-wide border border-red-100 pointer-events-none">
                                        REQUIRED
                                    </span>
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label htmlFor="city" className="block text-sm font-bold text-gray-700">City</label>
                                    <input id="city" type="text" placeholder="Karachi, Lahore, etc." className={fieldClass} />
                                </div>

                                {/* Area */}
                                <div className="space-y-2">
                                    <label htmlFor="area" className="block text-sm font-bold text-gray-700">Area</label>
                                    <input id="area" type="text" placeholder="Gulshan-e-Iqbal" className={fieldClass} />
                                </div>

                                {/* Last Donation Date */}
                                <div className="space-y-2">
                                    <label htmlFor="last-donation" className="block text-sm font-bold text-gray-700">Last Donation Date</label>
                                    <input id="last-donation" type="date" className={fieldClass + " text-gray-700"} />
                                </div>

                                {/* CNIC */}
                                <div className="space-y-2">
                                    <label htmlFor="cnic" className="block text-sm font-bold text-gray-700">CNIC Number</label>
                                    <input
                                        id="cnic" type="text" placeholder="42101-XXXXXXX-X"
                                        className={fieldClass}
                                        maxLength={15}
                                    />
                                </div>
                            </div>

                            <AvailabilityToggle />

                            {formError && (
                                <p className="text-sm text-red-600 font-semibold">{formError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full"
                            >
                                {saving ? "Saving…" : "Save and Continue"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ── Trust features ── */}
                <div className="grid md:grid-cols-3 gap-8 mt-24 mb-8 text-center max-w-4xl mx-auto">
                    {[
                        { icon: <Shield size={28} strokeWidth={1.5} />, title: "Verified Donors", desc: "Every donor profile is verified via CNIC and Phone." },
                        { icon: <Lock size={28} strokeWidth={1.5} />, title: "Privacy Control", desc: "Your information is only shared with verified hospitals." },
                        { icon: <MapPin size={28} strokeWidth={1.5} />, title: "Local Impact", desc: "Connecting patients with donors in their own city." },
                    ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex flex-col items-center">
                            <div className="text-[#C41C1C] bg-red-50 p-4 rounded-full mb-4">{icon}</div>
                            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-sm text-gray-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
