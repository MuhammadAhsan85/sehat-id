"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import Toast from "@/shared/components/ui/Toast";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import authService from "@/services/auth.service";
import type { UserRole } from "@/types/user";

// ─── Eye icon ────────────────────────────────────────────────────────────────
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

// ─── Password strength indicator ─────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
    const t = useTranslations("register.strength");
    if (!password) return null;
    const checks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    const labels = [t("weak"), t("fair"), t("good"), t("strong")];
    const colors = ["bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-600"];
    return (
        <div className="mt-3 space-y-2">
            <div className="flex gap-1.5 px-0.5">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-slate-100"}`} />
                ))}
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${score === 1 ? "text-red-500" : score === 2 ? "text-amber-500" : "text-emerald-500"}`}>
                {labels[score - 1] ?? ""}
            </p>
        </div>
    );
}

export default function RegisterPage() {
    const t = useTranslations("register");
    const te = useTranslations("errors");
    const router = useRouter();
    const { login } = useAuth();

    const [serverError, setServerError] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Dynamic Zod Schema for i18n
    const registerSchema = useMemo(() => z
        .object({
            name: z.string().min(2, te("nameMin")),
            email: z.string().email(te("invalidEmail")),
            role: z.enum(["donor", "patient"] as [UserRole, UserRole], {
                message: te("selectRole"),
            }),
            password: z
                .string()
                .min(8, te("passwordMin"))
                .regex(/[A-Z]/, te("passwordUppercase"))
                .regex(/[0-9]/, te("passwordNumber")),
            confirmPassword: z.string(),
        })
        .refine((d) => d.password === d.confirmPassword, {
            message: te("passwordsMismatch"),
            path: ["confirmPassword"],
        }), [te]);

    type RegisterFormData = z.infer<typeof registerSchema>;

    const { register, handleSubmit, watch, trigger, formState: { errors, isSubmitting } } =
        useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
            mode: "onBlur",
            defaultValues: { role: "donor" },
        });

    const selectedRole = watch("role");
    const passwordVal = watch("password") ?? "";
    const confirmPasswordVal = watch("confirmPassword") ?? "";
    const dismissToast = useCallback(() => setToast(null), []);

    // Reactive validation for password mismatch
    useEffect(() => {
        if (errors.confirmPassword) {
            trigger("confirmPassword");
        }
    }, [passwordVal, confirmPasswordVal, trigger, errors.confirmPassword]);

    async function onSubmit(data: RegisterFormData) {
        setServerError(null);
        try {
            const response = await authService.register(data);
            login(response.user, response.accessToken);
            setToast(t("creatingAccount"));
            setTimeout(() => router.push(ROUTES.DASHBOARD), 1200);
        } catch (err: unknown) {
            const msg = (err as { message?: string })?.message ?? te("registrationFailed");
            setServerError(msg);
        }
    }

    const inputClass = (hasError: boolean) =>
        `input-premium ${hasError ? "!border-red-400 !bg-red-50 focus:!ring-4 focus:!ring-red-100" : ""}`;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {toast && <Toast type="success" message={toast} onClose={dismissToast} />}

            <main className="flex-grow flex items-center justify-center bg-gray-50/50 px-4 py-20 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">{t("title")}</h1>
                        <p className="mt-2 text-slate-500 font-medium">{t("subtitle")}</p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50">

                        {serverError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
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

                            {/* Role selector */}
                            <div className="space-y-3">
                                <p className="text-sm font-bold text-slate-700 ml-1">{t("iAmA")}</p>
                                <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select your role">
                                    {(["donor", "patient"] as UserRole[]).map((role) => (
                                        <label
                                            key={role}
                                            className={`flex cursor-pointer items-center justify-center rounded-2xl border-2 px-4 py-3.5 text-sm font-bold transition-all duration-200 ${selectedRole === role ? "border-[#C41C1C] bg-red-50 text-[#C41C1C]" : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"}`}
                                        >
                                            <input type="radio" value={role} {...register("role")} className="sr-only" />
                                            {t(role)}
                                        </label>
                                    ))}
                                </div>
                                {errors.role && <p className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.role.message}</p>}
                            </div>

                            {/* Full name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-bold text-slate-700 ml-1">{t("fullName")}</label>
                                <input
                                    id="name" type="text" autoComplete="name" placeholder={t("namePlaceholder")}
                                    {...register("name")}
                                    aria-invalid={!!errors.name}
                                    className={inputClass(!!errors.name)}
                                />
                                {errors.name && <p className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">{t("email")}</label>
                                <input
                                    id="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")}
                                    {...register("email")}
                                    aria-invalid={!!errors.email}
                                    className={inputClass(!!errors.email)}
                                />
                                {errors.email && <p className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.email.message}</p>}
                            </div>

                            {/* Password + strength meter */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1">{t("password")}</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder={t("passwordPlaceholder")}
                                        {...register("password")}
                                        aria-invalid={!!errors.password}
                                        className={inputClass(!!errors.password) + " pr-12"}
                                    />
                                    <button type="button" onClick={() => setShowPassword((p) => !p)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                                        <EyeIcon open={showPassword} />
                                    </button>
                                </div>
                                <PasswordStrength password={passwordVal} />
                                {errors.password && <p className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.password.message}</p>}
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 ml-1">{t("confirmPassword")}</label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirm ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder={t("confirmPlaceholder")}
                                        {...register("confirmPassword")}
                                        aria-invalid={!!errors.confirmPassword}
                                        className={inputClass(!!errors.confirmPassword) + " pr-12"}
                                    />
                                    <button type="button" onClick={() => setShowConfirm((p) => !p)} aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                                        <EyeIcon open={showConfirm} />
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-2 text-xs font-semibold text-red-600 ml-1" role="alert">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-full bg-[#C41C1C] px-10 py-4 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-1 w-full group"
                            >
                                <span className={`${isSubmitting ? "opacity-0" : "opacity-100"}`}>
                                    {t("createAccount")}
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

                        <div className="mt-8 text-center text-sm font-medium text-slate-500">
                            {t("alreadyHaveAccount")}{" "}
                            <Link href={ROUTES.LOGIN} className="font-bold text-[#C41C1C] hover:text-[#A01717] hover:underline transition-colors decoration-2 underline-offset-4">
                                {t("signIn")}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
