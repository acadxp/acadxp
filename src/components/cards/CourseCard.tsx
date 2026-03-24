"use client";

import Link from "next/link";
import {
  Zap,
  Users,
  GraduationCap,
  Code,
  FlaskConical,
  Palette,
  Briefcase,
  Stethoscope,
  Scale,
  Cpu,
  Clock,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export type Department =
  | "EDUCATION"
  | "ENGINEERING"
  | "SCIENCE"
  | "ARTS"
  | "BUSINESS"
  | "MEDICINE"
  | "LAW"
  | "TECHNOLOGY";

export type CourseStatus = "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  description?: string;
  xp: number;
  department: Department;
  enrolledCount?: number;
  progress?: number;
  status?: CourseStatus;
}

const departmentConfig: Record<
  Department,
  { label: string; icon: typeof GraduationCap; color: string; gradient: string }
> = {
  EDUCATION: {
    label: "Education",
    icon: GraduationCap,
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
  },
  ENGINEERING: {
    label: "Engineering",
    icon: Code,
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-500",
  },
  SCIENCE: {
    label: "Science",
    icon: FlaskConical,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-500",
  },
  ARTS: {
    label: "Arts",
    icon: Palette,
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500",
  },
  BUSINESS: {
    label: "Business",
    icon: Briefcase,
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
  },
  MEDICINE: {
    label: "Medicine",
    icon: Stethoscope,
    color: "text-red-400",
    gradient: "from-red-500 to-pink-500",
  },
  LAW: {
    label: "Law",
    icon: Scale,
    color: "text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
  },
  TECHNOLOGY: {
    label: "Technology",
    icon: Cpu,
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
  },
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const deptConfig = departmentConfig[course.department];
  const DeptIcon = deptConfig.icon;

  const getStatusBadge = () => {
    switch (course.status) {
      case "COMPLETED":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
            <PlayCircle className="h-3 w-3" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-500/20 text-zinc-400 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Not Started
          </span>
        );
    }
  };

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="group relative h-full">
        {/* Hover glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />

        <div
          className={`relative h-full rounded-xl p-5 bg-gradient-to-br ${deptConfig.gradient} bg-opacity-10 border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:scale-[1.02]`}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2.5 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/15 transition-colors`}
              >
                <DeptIcon className={`h-6 w-6 ${deptConfig.color}`} />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-1 group-hover:bg-amber-500/30 transition-colors">
                <Zap className="h-3 w-3" />
                {course.xp} XP
              </span>
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1 font-mono">
                {course.courseCode}
              </p>
              <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-violet-200 transition-colors">
                {course.title}
              </h4>
              <p className="text-xs text-zinc-400 line-clamp-2">
                {course.description || "No description available"}
              </p>
            </div>

            {/* Progress Bar (if in progress) */}
            {course.status === "IN_PROGRESS" &&
              course.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-400">Progress</span>
                    <span className="text-xs text-amber-400 font-medium">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${deptConfig.color}`}>
                  {deptConfig.label}
                </span>
                {getStatusBadge()}
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <Users className="h-3 w-3" />
                <span className="text-xs">{course.enrolledCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { departmentConfig };
