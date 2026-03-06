import axios from "axios";

/**
 * Singleton Axios instance for all SehatID API requests.
 *
 * Base URL is read from NEXT_PUBLIC_API_BASE_URL at build time.
 * All requests automatically receive the Authorization header when the
 * user is authenticated (token injected by the request interceptor).
 */
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.sehatid.pk/v1",
    timeout: 15_000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ─── Request Interceptor ────────────────────────────────────────────────────
// Attaches the Bearer token from the in-memory auth store before each request.
// Token is NOT stored in localStorage to prevent XSS exposure.
apiClient.interceptors.request.use(
    (config) => {
        // Dynamic import avoids a circular dependency at module load time.
        // The import resolves synchronously on the second call (module cache).
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { useAuthStore } = require("@/store/auth.store");
            const token: string | null = useAuthStore.getState().token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch {
            // Auth store not available (e.g., during SSR) — skip silently.
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────────────
// Normalizes errors into a consistent ApiError shape.
// On 401, clears the auth state and redirects to /login.
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status: number | undefined = error.response?.status;

        // Skip the redirect for the refresh endpoint itself — a 401 there simply
        // means no active session exists, which is expected on a fresh page load.
        const isRefreshRequest = error.config?.url?.includes("/auth/refresh");
        if (status === 401 && !isRefreshRequest) {
            // Clear auth state to prevent stale tokens.
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { useAuthStore } = require("@/store/auth.store");
                useAuthStore.getState().logout();
            } catch {
                // No auth store — safe to ignore.
            }

            // Redirect to login (only in browser context).
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        // Normalize to a consistent ApiError.
        const normalizedError = {
            message:
                error.response?.data?.message ?? error.message ?? "An unexpected error occurred.",
            statusCode: status ?? 0,
            errors: error.response?.data?.errors ?? {},
        };

        return Promise.reject(normalizedError);
    },
);

export default apiClient;
