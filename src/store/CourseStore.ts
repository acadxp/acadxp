import { create } from "zustand";
import type { CourseState, Course, CreateCoursePayload, SearchCoursePayload } from "../types/course";
import useAuthStore from "./AuthStore";
import {
  getAllCourses,
  getCourseById,
  getEnrolledCourses,
  createCourse as createCourseApi,
  searchCourses as searchCoursesApi,
  deleteCourse as deleteCourseApi,
} from "../lib/api";

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

const useCourseStore = create<CourseState>()((set) => ({
  ...initialState,

  setCourses: (courses: Course[]) => set({ courses }),
  setCurrentCourse: (course: Course | null) => set({ currentCourse: course }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchAllCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCourses();
      set({
        courses: Array.isArray(response) ? response : (response.courses ?? []),
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch courses";
      set({ error: message, loading: false });
    }
  },

  fetchEnrolledCourses: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("No authentication token found");
      const response = await getEnrolledCourses(token);
      const enrollments = Array.isArray(response) ? response : (response.enrollments ?? []);
      set({
        courses: enrollments.map((e: { course: Course }) => e.course),
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch enrolled courses";
      set({ error: message, loading: false });
    }
  },

  fetchCourseById: async (id: string) => {
    set({ loading: true, error: null, currentCourse: null });
    try {
      const response = await getCourseById(id);
      const course = (response as { data?: unknown }).data ?? response;
      set({
        currentCourse: course as Course,
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch course";
      set({ error: message, loading: false });
    }
  },

  createCourse: async (payload: CreateCoursePayload) => {
    set({ loading: true, error: null });
    try {
      const course = await createCourseApi(payload);
      set((state) => ({ courses: [...state.courses, course], loading: false }));
      return course;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create course";
      set({ error: message, loading: false });
      throw err;
    }
  },

  searchCourses: async (payload: SearchCoursePayload) => {
    set({ loading: true, error: null });
    try {
      const response = await searchCoursesApi(payload);
      set({ courses: response.courses, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to search courses";
      set({ error: message, loading: false });
    }
  },

  deleteCourse: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteCourseApi(id);
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete course";
      set({ error: message, loading: false });
    }
  },

  reset: () => set(initialState),
}));

export default useCourseStore;
