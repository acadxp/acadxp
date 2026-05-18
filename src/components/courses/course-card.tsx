"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import type { Course } from "@/types/course";
import { formatEnum } from "./course-utils";

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl p-6 flex flex-col justify-between transition-all duration-300 border border-bg-tertiary border-b-4 hover:border-primary bg-bg-primary hover:bg-bg-secondary h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded bg-bg-primary text-primary">
            {formatEnum(course.department)}
          </span>
          <span className="text-2xl font-bold text-text-primary/10 group-hover:text-primary/20 transition-colors">
            {course.id.slice(0, 4)}
          </span>
        </div>
        <h3 className="text-lg font-medium mb-2 leading-tight text-text-primary">{course.title}</h3>
        <p className="text-xs leading-relaxed mb-6 text-text-secondary line-clamp-2">
          {course.description || "No description"}
        </p>
      </div>
      {onEnroll ? (
        <div className="flex items-center justify-between mt-4">
          <span className="text-[11px] text-text-muted font-mono">{course.courseCode}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEnroll();
            }}
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm bg-bg-primary text-text-primary hover:bg-primary hover:text-white"
          >
            Enroll
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
            <Zap className="w-4 h-4 text-amber-500" />
            {course.xp} XP
          </div>
          <span className="text-[11px] text-text-muted font-mono">{course.courseCode}</span>
        </div>
      )}
    </motion.div>
  );

  if (onEnroll) return card;

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      {card}
    </Link>
  );
}
