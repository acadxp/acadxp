import api from "@/lib/axios";
import type { ApiResponse, Profile } from "@/types";

export const profileService = {
  getProfile: () =>
    api.get<ApiResponse<{ profile: Profile }>>("/users/profile"),

  createProfile: (data: {
    username: string;
    bio?: string;
    location?: string;
    socials?: Record<string, string>;
  }) => api.post<ApiResponse<{ profile: Profile }>>("/users/profile/create", data),

  updateProfile: (data: {
    username?: string;
    bio?: string;
    location?: string;
    socials?: Record<string, string>;
    preferences?: { theme?: string; accentColor?: string };
  }) => api.patch<ApiResponse<{ profile: Profile }>>("/users/profile", data),

  updateName: (name: string) =>
    api.patch<ApiResponse>("/users/name", { name }),

  checkUsername: (username: string) =>
    api.get<ApiResponse>("/users/profile/check-username", {
      params: { username },
    }),
};
