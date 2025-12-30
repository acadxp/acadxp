import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/user";
import type { Session } from "better-auth/types";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      error: null,
      loading: false,
      setSession: (session: Session) => set({ session }),
      setError: (error: string) => set({ error }),
      logout: () => {
        localStorage.removeItem("acaxp_auth_token");
        set({ session: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
export default useAuthStore;
