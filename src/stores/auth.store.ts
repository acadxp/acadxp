import { create } from "zustand";
import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";
import { academicInfoService } from "@/services/academic-info.service";
import { setAccessToken } from "@/lib/axios";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.register(name, email, password);
      setAccessToken(data.data.accessToken);

      let profile: any = null;
      try {
        const { data: existing } = await profileService.getProfile();
        profile = existing.data?.profile;
      } catch {}

      if (!profile) {
        const username = email.split("@")[0];
        const { data: profileData } = await profileService.createProfile({ username });
        profile = profileData.data!.profile;

        await academicInfoService.create({
          profileId: profile.id,
          enrollmentStatus: "FULL_TIME",
        });
      }

      set({ user: data.data.user, isAuthenticated: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || "Registration failed";
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.login(email, password);
      setAccessToken(data.data.accessToken);
      set({ user: data.data.user, isAuthenticated: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed";
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try { await authService.logout(); } catch { /* clear anyway */ }
    setAccessToken(null);
    set({ user: null, isAuthenticated: false });
  },

  refreshSession: async () => {
    try {
      const { data } = await authService.refreshToken();
      setAccessToken(data.data.accessToken);
      set({ user: data.data.user, isAuthenticated: true });
    } catch {
      setAccessToken(null);
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
