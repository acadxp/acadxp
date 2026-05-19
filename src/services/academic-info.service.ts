import api from "@/lib/axios";
import type { ApiResponse, AcademicInfo } from "@/types";

export const academicInfoService = {
  getMyInfo: (profileId: string) =>
    api.get<ApiResponse<{ academicInfo: AcademicInfo }>>("/academic-infos/me", {
      params: { profileId },
    }),

  updateMyInfo: (data: {
    institution?: string;
    degree?: string;
    major?: string;
    semester?: string;
    enrollmentStatus?: string;
    graduationDate?: string;
    enrolledDate?: string;
  }) => api.patch<ApiResponse<{ academicInfo: AcademicInfo }>>("/academic-infos/me", data),

  create: (data: {
    profileId: string;
    institution?: string;
    degree?: string;
    major?: string;
    semester?: string;
    enrollmentStatus: string;
    graduationDate?: string;
    enrolledDate?: string;
  }) => api.post<ApiResponse<{ academicInfo: AcademicInfo }>>("/academic-infos/create", data),
};
