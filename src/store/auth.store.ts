"use client";

import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
    /** Authenticated user profile. Null when not logged in. */
    user: User | null;
    /**
     * In-memory access token. Intentionally NOT stored in localStorage
     * to prevent XSS attacks. The refresh token lives in an httpOnly cookie.
     */
    token: string | null;
    /** Derived convenience flag. */
    isAuthenticated: boolean;

    // ─── Actions ───────────────────────────────────────────────────────────
    /** Called after a successful login/register API call. */
    login: (user: User, token: string) => void;
    /** Clears all auth state. The server should also invalidate the session. */
    logout: () => void;
    /** Updates the user profile (e.g., after an edit-profile action). */
    setUser: (user: User) => void;
}

/**
 * Global authentication state managed by Zustand.
 *
 * Why in-memory (not localStorage)?
 * - localStorage is accessible by any script on the page (XSS risk).
 * - An httpOnly cookie-based refresh token is used for persistence across page reloads.
 * - On app boot the AuthContext calls /auth/refresh to rehydrate this store.
 */
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: (user, token) =>
        set({ user, token, isAuthenticated: true }),

    logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),

    setUser: (user) =>
        set((state) => ({ ...state, user })),
}));
