"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<FormData>({ resolver: zodResolver(schema) });

    async function onSubmit(_data: FormData) {
        // TODO: await authService.requestPasswordReset(_data.email);
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));
        setSent(true);
        toast.success("Reset link sent! Check your inbox.");
    }

    return (
        <>

            <main className="flex items-center justify-center bg-[#f8f6f6] px-4 py-20 sm:px-6 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md animate-fade-up">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C41C1C]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Reset your password</h1>
                        <p className="mt-1 text-sm text-gray-500">We&apos;ll send a reset link to your email</p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        {sent ? (
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                                    <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900">Check your inbox!</p>
                                <p className="mt-1 text-sm text-gray-500">A password reset link has been sent to your email address. It expires in 10 minutes.</p>
                                <Link href={ROUTES.LOGIN} className="mt-6 inline-block text-sm font-semibold text-[#C41C1C] hover:underline">
                                    Back to Sign In
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input
                                        id="email" type="email" autoComplete="email" placeholder="you@example.com"
                                        {...register("email")}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                        className={`input-premium ${errors.email ? "!border-red-400 !bg-red-50 focus:!ring-4 focus:!ring-red-100" : ""}`}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-1.5 text-xs text-[#C41C1C]" role="alert">{errors.email.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : "Send Reset Link"}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Remember your password?{" "}
                                    <Link href={ROUTES.LOGIN} className="font-semibold text-[#C41C1C] hover:underline">Sign in</Link>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
