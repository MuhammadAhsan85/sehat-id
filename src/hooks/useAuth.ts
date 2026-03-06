"use client";

import { useAuthStore } from "@/store/auth.store";
import { useAuthContext } from "@/context/AuthContext";

/**
 * Thin wrapper hook for consuming auth state in components.
 *
 * Prefers `useAuthContext` (which includes the async logout action).
 * Falls back to reading directly from the Zustand store when used
 * outside the full `<AuthProvider>` tree (e.g., in utility components).
 *
 * Usage:
 * ```tsx
 * const { user, isAuthenticated, logout } = useAuth();
 * ```
 */
export function useAuth() {
    try {
        return useAuthContext();
    } catch {
        // Fallback: read from store directly (no logout server call).
        const { user, token, isAuthenticated, login, logout } = useAuthStore();
        return { user, token, isAuthenticated, login, logout };
    }
}
