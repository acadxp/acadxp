import { create } from "zustand";
import { courseService } from "@/services/course.service";
import type {
  Course,
  CourseCreationWorkflow,
  GamificationData,
  GeneratedSkill,
  GeneratedChallenge,
  GeneratedBadge,
} from "@/types";

interface CourseCreationState {
  workflow: CourseCreationWorkflow;
  similarCourses: Course[];
  createdCourse: Course | null;
  gamificationData: GamificationData | null;
  error: string | null;
  wasEnrollment: boolean;

  startFlow: (formData: {
    courseCode: string;
    title: string;
    description?: string;
    xp: number;
    department: string;
    academicLevel: string;
  }) => Promise<void>;

  confirmBlueprint: (payload: {
    selectedSkills: GeneratedSkill[];
    selectedChallenges: GeneratedChallenge[];
    selectedBadges?: GeneratedBadge[];
  }) => Promise<void>;

  enrollExisting: (courseId: string) => Promise<void>;
  reset: () => void;
}

export const useCourseCreationStore = create<CourseCreationState>((set, get) => ({
  workflow: "IDLE",
  similarCourses: [],
  createdCourse: null,
  gamificationData: null,
  error: null,
  wasEnrollment: false,

  startFlow: async (formData) => {
    const { courseCode, title, description, xp, department, academicLevel } = formData;
    set({ error: null });

    set({ workflow: "SEARCHING" });
    try {
      const searchResult = await courseService.search({ title, courseCode });
      const similar = searchResult.data.data?.courses ?? [];

      if (similar.length > 0) {
        set({ similarCourses: similar, workflow: "DUPLICATE_FOUND" });
        return;
      }
    } catch (err) {
      console.error("Search error:", err);
      set({ workflow: "IDLE" });
      return;
    }

    set({ workflow: "CREATING" });
    let course: Course;
    try {
      const { data } = await courseService.create({ courseCode, title, description, xp, department });
      course = data.data!;
      set({ createdCourse: course });
    } catch {
      set({ error: "Failed to create course", workflow: "IDLE" });
      return;
    }

    set({ workflow: "GENERATING_BLUEPRINT" });
    try {
      const { data } = await courseService.generateBlueprint(course.id, {
        courseTitle: title,
        courseDescription: description || "No description provided",
        academicLevel,
      });
      set({ gamificationData: data.data!, workflow: "REVIEWING_BLUEPRINT" });
    } catch {
      set({ error: "Blueprint generation failed. Retry?", workflow: "IDLE" });
    }
  },

  confirmBlueprint: async (payload) => {
    const course = get().createdCourse;
    if (!course) return;

    set({ workflow: "CONFIRMING", error: null });
    try {
      await courseService.confirmBlueprint(course.id, payload);
      set({ workflow: "SUCCESS", gamificationData: null });
    } catch {
      set({ error: "Failed to confirm blueprint", workflow: "REVIEWING_BLUEPRINT" });
    }
  },

  enrollExisting: async (courseId) => {
    set({ workflow: "CONFIRMING", error: null });
    try {
      await courseService.enroll(courseId);
      set({ workflow: "SUCCESS", wasEnrollment: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || "Could not enroll in course";
      set({ error: message, workflow: "DUPLICATE_FOUND" });
    }
  },

  reset: () => set({
    workflow: "IDLE",
    similarCourses: [],
    createdCourse: null,
    gamificationData: null,
    error: null,
    wasEnrollment: false,
  }),
}));
