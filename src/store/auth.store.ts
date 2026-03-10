"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
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
    /** Updates specific fields in the user profile. */
    updateProfile: (updates: Partial<User>) => void;
}

/**
 * Global authentication state managed by Zustand.
 *
 * Why in-memory (not localStorage)?
 * - localStorage is accessible by any script on the page (XSS risk).
 * - An httpOnly cookie-based refresh token is used for persistence across page reloads.
 * - On app boot the AuthContext calls /auth/refresh to rehydrate this store.
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (user, token) => {
                // Set standard generic session cookie so middleware thinks we're logged in.
                document.cookie = `sehatid_session=mock-session-active; path=/; max-age=3600; samesite=lax`;

                // Also set a verification status cookie for middleware to use
                if (user.isVerified) {
                    document.cookie = `sehatid_verified=true; path=/; max-age=3600; samesite=lax`;
                } else {
                    document.cookie = `sehatid_verified=false; path=/; max-age=3600; samesite=lax`;
                }

                set({ user, token, isAuthenticated: true });
            },

            logout: () => {
                // Expire the session cookies
                document.cookie = `sehatid_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                document.cookie = `sehatid_verified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                set({ user: null, token: null, isAuthenticated: false });
            },

            setUser: (user) => {
                if (user.isVerified) {
                    document.cookie = `sehatid_verified=true; path=/; max-age=3600; samesite=lax`;
                }
                set((state) => ({ ...state, user }));
            },

            updateProfile: (updates) => {
                set((state) => {
                    const newUser = state.user ? { ...state.user, ...updates } : null;
                    if (newUser?.isVerified) {
                        document.cookie = `sehatid_verified=true; path=/; max-age=3600; samesite=lax`;
                    }
                    return { ...state, user: newUser };
                });
            },
        }),
        {
            name: "sehatid_auth",
            // Partialized state to store in localStorage (exclude token for security)
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
