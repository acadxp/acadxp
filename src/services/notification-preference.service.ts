import api from "@/lib/axios";
import type { ApiResponse } from "@/types";

export interface NotificationPreference {
  id: string;
  academicInfoId: string;
  type: string;
  enabled: boolean;
}

export const notificationPreferenceService = {
  getPreferences: () =>
    api.get<ApiResponse<NotificationPreference[]>>("/notification-preferences"),

  updatePreferences: (preferences: { type: string; enabled: boolean }[]) =>
    api.put<ApiResponse<NotificationPreference[]>>("/notification-preferences", { preferences }),
};
