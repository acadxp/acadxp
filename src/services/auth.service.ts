import api from "@/lib/axios";
import type { ApiResponse, AuthResponse } from "@/types";

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
};
