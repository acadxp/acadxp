import { create } from "zustand";
import type { AuthState, User } from "../types/user";

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  error: null,
  loading: false,
  setUser: (user: User | null) => set({ user }),
  setAccessToken: (token: string | null) => set({ accessToken: token }),
  setAuthError: (error: string | null) => set({ error }),
  setLoading: (loading: boolean) => set({ loading }),
  logout: () => {
    set({ user: null, accessToken: null, error: null });
  },
}));

export default useAuthStore;
