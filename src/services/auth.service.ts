import api from "@/lib/axios";
import type { ApiResponse, AuthResponse } from "@/types";

export type Session = {
  id: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  lastActiveAt: string;
  createdAt: string;
  isCurrent: boolean;
};

export const authService = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  logout: () => api.post<ApiResponse>("/auth/logout"),

  refreshToken: () =>
    api.post<AuthResponse>("/auth/refresh-token", {}, { withCredentials: true }),

  checkEmail: (email: string) =>
    api.get<ApiResponse>("/auth/check-email", { params: { email } }),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<ApiResponse>("/auth/change-password", { currentPassword, newPassword }),

  getSessions: () =>
    api.get<ApiResponse<{ sessions: Session[] }>>("/auth/sessions"),

  revokeAllSessions: () =>
    api.post<ApiResponse>("/auth/sessions/revoke-all"),
};
