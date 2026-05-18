export enum Department {
  SCIENCE = "SCIENCE",
  ARTS = "ARTS",
  COMMERCE = "COMMERCE",
  EDUCATION = "EDUCATION",
  ENGINEERING = "ENGINEERING",
  MEDICINE = "MEDICINE",
  LAW = "LAW",
  TECHNOLOGY = "TECHNOLOGY",
  OTHER = "OTHER",
}

export enum CourseStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
}

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description: string | null;
  xp: number;
  department: Department;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoursePayload {
  courseCode: string;
  title: string;
  description?: string;
  xp: number;
  department: Department;
}

export interface SearchCoursePayload {
  title: string;
  courseCode: string;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;

  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchAllCourses: () => Promise<void>;
  fetchEnrolledCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  createCourse: (payload: CreateCoursePayload) => Promise<Course>;
  searchCourses: (payload: SearchCoursePayload) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  reset: () => void;
}
