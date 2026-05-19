import api from "@/lib/axios";
import type { ApiResponse } from "@/types";

export interface ApiKey {
  id: string;
  name: string | null;
  key: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export interface ApiKeyCreated extends ApiKey {
  rawKey: string;
}

export const apiKeyService = {
  getKeys: () =>
    api.get<ApiResponse<ApiKey[]>>("/api-keys"),

  createKey: (name?: string) =>
    api.post<ApiResponse<ApiKeyCreated>>("/api-keys", { name }),

  deleteKey: (id: string) =>
    api.delete<ApiResponse>(`/api-keys/${id}`),
};
