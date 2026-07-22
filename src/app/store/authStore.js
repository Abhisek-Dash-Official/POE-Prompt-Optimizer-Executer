import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,

    setUser: (userData) => set({
        user: userData,
        isAuthenticated: true,
        isCheckingAuth: false
    }),

    logoutUser: () => set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false
    }),

    checkSession: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await fetch('/api/auth/me', {
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                set({
                    user: data.user,
                    isAuthenticated: true,
                    isCheckingAuth: false
                });
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    isCheckingAuth: false
                });
            }
        } catch (error) {
            console.error("Session check failed:", error);
            set({
                user: null,
                isAuthenticated: false,
                isCheckingAuth: false
            });
        }
    }
}));