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

  checkUsername: (username: string) =>
    api.get<ApiResponse>("/users/profile/check-username", {
      params: { username },
    }),
};
