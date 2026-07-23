import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    usage: null,
    isAuthenticated: false,
    isCheckingAuth: true,

    setUser: (userData) => set({
        user: userData,
        isAuthenticated: true,
        isCheckingAuth: false
    }),

    updateUsage: (newUsage) => set((state) => ({
        ...state,
        usage: { ...state.usage, ...newUsage }
    })),

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
                    user: {
                        username: data.user.username,
                        email: data.user.email,
                        avatar_url: `/avatars/avatar-${data.user.avatar_id || 0}.png`
                    },
                    usage: {
                        used: data.usage.used,
                        limit: data.usage.limit,
                        remaining: data.usage.remaining,
                    },
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