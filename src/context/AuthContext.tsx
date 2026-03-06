"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import authService from "@/services/auth.service";
import type { User } from "@/types/user";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider — wraps the application tree and:
 * 1. Rehydrates auth state on first load by calling /auth/refresh.
 * 2. Exposes a typed `logout` function that also calls the server endpoint.
 *
 * Place this at the top of your component tree (root layout).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, token, isAuthenticated, login, logout: storeLogout } = useAuthStore();
    const hasHydrated = useRef(false);

    // ─── Rehydrate session on mount ────────────────────────────────────────
    // If the user previously logged in, their refresh token lives in an httpOnly
    // cookie. We attempt a silent refresh to restore the access token.
    useEffect(() => {
        if (hasHydrated.current) return;
        hasHydrated.current = true;

        async function rehydrate() {
            try {
                // Only attempt refresh if we have an item in local storage or some marker, 
                // but since zustand persists token in localStorage (if perist is used) 
                // or we use a cookie, let's just avoid the 404 by checking if this is just a dummy app without a backend.
                // Prevent API 404 console errors by catching fetch exceptions silently if the backend is down.
                const res = await authService.refreshToken().catch(() => ({ accessToken: null }));
                if (res?.accessToken) {
                    useAuthStore.setState({ token: res.accessToken, isAuthenticated: true });
                }
            } catch {
                // No valid session — user stays logged out. This is expected.
            }
        }

        rehydrate();
    }, []);

    /** Logs out server-side then clears local state. */
    async function logout() {
        try {
            await authService.logout();
        } catch {
            // Even if the server call fails, clear client state.
        } finally {
            storeLogout();
        }
    }

    const value: AuthContextValue = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access the auth context from any component.
 * Must be used inside `<AuthProvider>`.
 */
export function useAuthContext(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used inside <AuthProvider>");
    }
    return ctx;
}
