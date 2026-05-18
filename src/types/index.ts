export type Role = "STUDENT" | "TEACHER" | "ADMIN";
export enum Department {
  SCIENCE = "SCIENCE",
  ARTS = "ARTS",
  COMMERCE = "COMMERCE",
  ENGINEERING = "ENGINEERING",
  MEDICINE = "MEDICINE",
  LAW = "LAW",
  EDUCATION = "EDUCATION",
  TECHNOLOGY = "TECHNOLOGY",
  OTHER = "OTHER",
}
export type DegreeType =
  | "BACHELORS"
  | "MASTERS"
  | "PHD"
  | "DIPLOMA"
  | "CERTIFICATE";
export type EnrollmentStatus =
  | "FULL_TIME"
  | "PART_TIME"
  | "SUSPENDED"
  | "GRADUATED";
export enum CourseStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
}
export type ChallengeDifficulty = "easy" | "medium" | "hard";
export type ChallengeType =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "ASSIGNMENT"
  | "QUIZ"
  | "PROJECT"
  | "ACHIEVEMENT";
export type NotificationType =
  | "STREAK"
  | "DEADLINE"
  | "GOAL"
  | "LEVEL_UP"
  | "BADGE";
export type GoalType = "XP" | "SKILL" | "CHALLENGE" | "COURSE" | "STREAK";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: UserWithoutPassword;
    accessToken: string;
  };
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  bio?: string;
  location?: string;
  socials?: Record<string, string>;
  academicInfo?: AcademicInfo;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicInfo {
  id: string;
  profileId: string;
  xp: number;
  level: number;
  streak: number;
  institution?: string;
  degree?: DegreeType;
  major?: string;
  semester?: string;
  enrollmentStatus: EnrollmentStatus;
  graduationDate?: string;
  enrolledDate?: string;
  courses?: StudentCourseEnrollment[];
  studentSkills?: StudentSkill[];
  studentChallenges?: StudentChallenge[];
  badges?: StudentBadge[];
  notifications?: Notification[];
  goals?: Goal[];
}

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description: string | null;
  xp: number;
  department: Department;
  status: CourseStatus;
  skills?: CourseSkill[];
  challenges?: CourseChallenge[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentCourseEnrollment {
  id: string;
  academicInfoId: string;
  courseId: string;
  course: Course;
  enrollmentDate: string;
  completedAt?: string;
  completedStatus: boolean;
  xpEarned: number;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  xpValue: number;
}

export interface CourseSkill {
  courseId: string;
  skillId: string;
  skill: Skill;
  proficiencyLevel: number;
}

export interface StudentSkill {
  academicInfoId: string;
  skillId: string;
  skill: Skill;
  proficiencyLevel: number;
  xpEarned: number;
  acquiredAt: string;
  masteredAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  xpReward: number;
  criteria: Criteria;
  isActive: boolean;
  startsAt?: string;
  endsAt?: string;
}

export interface CourseChallenge {
  courseId: string;
  challengeId: string;
  challenge: Challenge;
  isRequired: boolean;
  order: number;
}

export interface StudentChallenge {
  academicInfoId: string;
  challengeId: string;
  challenge: Challenge;
  attempts: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "ABANDONED";
  progress: number;
  result?: any;
  completedAt?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon?: string;
  xpReward: number;
  criteria: Criteria;
}

export interface StudentBadge {
  academicInfoId: string;
  badgeId: string;
  badge: Badge;
  unlockedAt: string;
}

export interface Notification {
  id: string;
  academicInfoId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
}

export interface Goal {
  id: string;
  academicInfoId: string;
  type: GoalType;
  target: any;
  progress: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Rule {
  type: "COMPLETION" | "SCORE" | "SUBMISSION" | "GRADE" | "COUNT";
  target: string;
  operator: "EQ" | "GTE" | "LTE" | "GT" | "LT";
  value: number;
}

export interface Criteria {
  logic: "AND" | "OR";
  rules: Rule[];
}

export interface GeneratedSkill {
  title: string;
  description: string;
  xpValue: number;
  iconPrompt: string | null;
  criteria: Criteria;
}

export interface GeneratedChallenge {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  criteria: Criteria;
}

export interface GeneratedBadge {
  title: string;
  description: string;
  xpValue: number;
  iconPrompt: string | null;
  criteria: Criteria;
}

export interface GamificationData {
  skills: GeneratedSkill[];
  challenges: GeneratedChallenge[];
  badges: GeneratedBadge[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export type CourseCreationWorkflow =
  | "IDLE"
  | "SEARCHING"
  | "DUPLICATE_FOUND"
  | "CREATING"
  | "GENERATING_BLUEPRINT"
  | "REVIEWING_BLUEPRINT"
  | "CONFIRMING"
  | "SUCCESS";
