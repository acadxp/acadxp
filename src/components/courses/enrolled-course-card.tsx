"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Monitor, CheckCircle2 } from "lucide-react";
import type { StudentCourseEnrollment } from "@/types";
import { formatEnum } from "./course-utils";

interface EnrolledCourseCardProps {
  enrollment: StudentCourseEnrollment;
}

export function EnrolledCourseCard({ enrollment }: EnrolledCourseCardProps) {
  const { course, xpEarned, enrollmentDate, completedStatus } = enrollment;
  const completion = course.xp > 0 ? Math.min(Math.round((xpEarned / course.xp) * 100), 100) : 0;
  const isCompleted = completedStatus;

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group rounded-xl p-6 flex flex-col justify-between transition-all duration-300 border border-bg-tertiary border-b-4 hover:border-primary bg-bg-primary hover:bg-bg-secondary h-full cursor-pointer relative overflow-hidden"
      >
        {isCompleted && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase px-2 py-1 bg-bg-tertiary rounded">
              {formatEnum(course.department)}
            </span>
            <span className={`text-2xl font-extrabold leading-none ${isCompleted ? "text-primary" : "text-text-primary"}`}>
              {completion}%
            </span>
          </div>
          <h3 className="text-lg font-medium text-text-primary leading-tight">{course.title}</h3>
          <p className="text-sm text-text-secondary mt-1">{course.courseCode} &bull; Enrolled {new Date(enrollmentDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-[11px] font-medium text-text-muted">
            <span className="flex items-center gap-1">
              <Monitor className="w-3 h-3" /> {xpEarned}/{course.xp} XP
            </span>
            <span className={isCompleted ? "text-primary" : ""}>
              {isCompleted ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
