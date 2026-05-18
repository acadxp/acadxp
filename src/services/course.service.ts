import api from "@/lib/axios";
import type {
  ApiResponse,
  Course,
  Challenge,
  StudentCourseEnrollment,
  GamificationData,
  GeneratedSkill,
  GeneratedChallenge,
  GeneratedBadge,
} from "@/types";

export const courseService = {
  getAll: () => api.get<ApiResponse<Course[]>>("/courses/all"),

  getById: (courseId: string) =>
    api.get<ApiResponse<Course>>(`/courses/${courseId}`),

  search: (params: { title?: string; courseCode?: string }) =>
    api.get<ApiResponse<{ found: boolean; courses: Course[] }>>("/courses/search", { params, timeout: 10000 }),

  create: (data: {
    courseCode: string;
    title: string;
    description?: string;
    xp: number;
    department: string;
  }) => api.post<ApiResponse<Course>>("/courses/create", data),

  delete: (courseId: string) =>
    api.delete<ApiResponse>(`/courses/${courseId}`),

  enroll: (courseId: string) =>
    api.post<ApiResponse<StudentCourseEnrollment>>(`/courses/${courseId}/enroll`),

  unenroll: (courseId: string) =>
    api.delete<ApiResponse>(`/courses/${courseId}/enroll`),

  getEnrollments: () =>
    api.get<ApiResponse<StudentCourseEnrollment[]>>("/courses/enrollments"),

  generateBlueprint: (courseId: string, data: {
    courseTitle: string;
    courseDescription: string;
    academicLevel: string;
  }) => api.post<ApiResponse<GamificationData>>(`/courses/${courseId}/blueprint`, data),

  confirmBlueprint: (courseId: string, confirmPayload: {
    selectedSkills: GeneratedSkill[];
    selectedChallenges: GeneratedChallenge[];
    selectedBadges?: GeneratedBadge[];
  }) => api.post<ApiResponse>("/courses/blueprint/confirm", { courseId, confirmPayload }),

  getChallenge: (courseId: string, challengeId: string) =>
    api.get<ApiResponse<Challenge & { progress: number; status: string; attempts: number; completedAt: string | null }>>(`/courses/${courseId}/challenges/${challengeId}`),

  getChallenges: (courseId: string) =>
    api.get<ApiResponse<(Challenge & { progress: number; status: string; attempts: number; isRequired: boolean; order: number })[]>>(`/courses/${courseId}/challenges`),
};
