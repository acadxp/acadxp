import { create } from "zustand";
import type { CourseState, Course, CreateCoursePayload, SearchCoursePayload } from "../types/course";
import { courseService } from "@/services/course.service";

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
      const { data } = await courseService.getAll();
      set({
        courses: data.data ?? [],
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
      const { data } = await courseService.getEnrollments();
      const enrollments = data.data ?? [];
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
      const { data } = await courseService.getById(id);
      set({
        currentCourse: data.data ?? null,
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
      const { data } = await courseService.create(payload);
      const course = data.data!;
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
      const { data } = await courseService.search(payload);
      set({ courses: data.data?.courses ?? [], loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to search courses";
      set({ error: message, loading: false });
    }
  },

  deleteCourse: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await courseService.delete(id);
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
