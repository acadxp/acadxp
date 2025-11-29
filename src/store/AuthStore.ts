import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, UserInfos } from "../types/user";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      loading: false,
      setUser: (user: UserInfos) => set({ user }),
      setError: (error: string) => set({ error }),
      setToken: (token: string) => set({ token }),
      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
export default useAuthStore;
