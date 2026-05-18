import { create } from "zustand";
import { courseService } from "@/services/course.service";
import type {
  Course,
  StudentCourseEnrollment,
  GamificationData,
  GeneratedSkill,
  GeneratedChallenge,
  GeneratedBadge,
} from "@/types";

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrollments: StudentCourseEnrollment[];
  gamificationData: GamificationData | null;
  isLoading: boolean;

  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  searchCourses: (params: { title?: string; courseCode?: string }) => Promise<Course[]>;
  enroll: (courseId: string) => Promise<void>;
  unenroll: (courseId: string) => Promise<void>;
  fetchEnrollments: () => Promise<void>;
  generateBlueprint: (courseId: string, data: { courseTitle: string; courseDescription: string; academicLevel: string }) => Promise<void>;
  confirmBlueprint: (courseId: string, payload: { selectedSkills: GeneratedSkill[]; selectedChallenges: GeneratedChallenge[]; selectedBadges?: GeneratedBadge[] }) => Promise<void>;
  reset: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  enrollments: [],
  gamificationData: null,
  isLoading: false,

  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      const { data } = await courseService.getAll();
      set({ courses: data.data! });
    } finally { set({ isLoading: false }); }
  },

  fetchCourseById: async (id) => {
    set({ isLoading: true, gamificationData: null });
    try {
      const { data } = await courseService.getById(id);
      set({ currentCourse: data.data! });
    } finally { set({ isLoading: false }); }
  },

  searchCourses: async (params) => {
    const { data } = await courseService.search(params);
    return data.data!.courses;
  },

  enroll: async (courseId) => {
    await courseService.enroll(courseId);
    await get().fetchEnrollments();
  },

  unenroll: async (courseId) => {
    await courseService.unenroll(courseId);
    await get().fetchEnrollments();
  },

  fetchEnrollments: async () => {
    const { data } = await courseService.getEnrollments();
    set({ enrollments: data.data! });
  },

  generateBlueprint: async (courseId, payload) => {
    set({ isLoading: true });
    try {
      const { data } = await courseService.generateBlueprint(courseId, payload);
      set({ gamificationData: data.data! });
    } finally { set({ isLoading: false }); }
  },

  confirmBlueprint: async (courseId, payload) => {
    await courseService.confirmBlueprint(courseId, payload);
    set({ gamificationData: null });
    await get().fetchEnrollments();
  },

  reset: () => set({
    courses: [], currentCourse: null, enrollments: [], gamificationData: null,
  }),
}));
