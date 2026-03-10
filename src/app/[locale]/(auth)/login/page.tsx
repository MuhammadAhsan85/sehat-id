"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Logo from "@/shared/components/Logo";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import authService from "@/services/auth.service";

// ─── Eye icon toggle ──────────────────────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" />
        </svg>
    );
}

export default function LoginPage() {
    const t = useTranslations("login");
    const te = useTranslations("errors");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Dynamic Zod Schema for i18n
    const loginSchema = useMemo(() => z.object({
        email: z.string().email(te("invalidEmail")),
        password: z.string().min(8, te("passwordMin")),
    }), [te]);

    type LoginFormData = z.infer<typeof loginSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: "onBlur" });

    async function onSubmit(data: LoginFormData) {
        setServerError(null);
        try {
            const response = await authService.login(data);
            login(response.user, response.accessToken);
            toast.success(t("signingIn"));
            const redirect = searchParams.get("redirect") ?? ROUTES.DASHBOARD;
            setTimeout(() => router.push(redirect), 1000);
        } catch (err: unknown) {
            const msg = (err as { message?: string })?.message ?? te("loginFailed");
            setServerError(msg);
            toast.error(msg);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">

            <main className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 min-h-[calc(100vh-80px)] w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Logo + heading */}
                    <div className="mb-10 text-center flex flex-col items-center">
                        <div className="flex items-center justify-center mb-8">
                            <Logo fontSize="text-4xl" iconWidth={48} iconHeight={48} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">{t("title")}</h1>
                        <p className="mt-2 text-slate-500 font-medium">{t("subtitle")}</p>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50">

                        {serverError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                role="alert"
                                className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span className="font-medium">{serverError}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">
                                    {t("email")}
                                </label>
                                <input
                                    id="email" type="email" autoComplete="email" placeholder="you@example.com"
                                    {...register("email")}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    aria-invalid={!!errors.email}
                                    className={`input-premium ${errors.email ? "!border-red-400 !bg-red-50 focus:!ring-4 focus:!ring-red-100" : ""}`}
                                />
                                {errors.email && (
                                    <p id="email-error" className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password with show/hide toggle */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label htmlFor="password" className="block text-sm font-bold text-slate-700">{t("password")}</label>
                                    <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs font-bold text-[#C41C1C] hover:text-[#A01717] transition-colors">{t("forgotPassword")}</Link>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        {...register("password")}
                                        aria-describedby={errors.password ? "password-error" : undefined}
                                        aria-invalid={!!errors.password}
                                        className={`input-premium pr-12 ${errors.password ? "!border-red-400 !bg-red-50 focus:!ring-4 focus:!ring-red-100" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                    >
                                        <EyeIcon open={showPassword} />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="password-error" className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full group"
                            >
                                <span className={`${isSubmitting ? "opacity-0" : "opacity-100"} flex items-center justify-center gap-2`}>
                                    {t("signIn")}
                                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm font-medium text-slate-500">
                                {t("noAccount")}{" "}
                                <Link href={ROUTES.REGISTER} className="font-bold text-[#C41C1C] hover:text-[#A01717] hover:underline transition-colors decoration-2 underline-offset-4">
                                    {t("registerNow")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
