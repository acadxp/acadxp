"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { useCourseStore } from "@/stores/course.store";
import { CourseCard } from "@/components/courses/course-card";
import { CoursesGridSkeleton } from "@/components/courses/courses-grid-skeleton";
import { CoursesEmptyState } from "@/components/courses/courses-empty-state";
import { CoursesErrorState } from "@/components/courses/courses-error-state";

export default function CoursesPage() {
  const { enrollments, isLoading, fetchEnrollments } = useCourseStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const courses = enrollments.map((e) => e.course);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Courses</Breadcrumbs.Item>
        </Breadcrumbs.Root>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">My Courses</h1>
            <p className="text-sm text-text-muted mt-1">
              {enrollments.length} course{enrollments.length !== 1 ? "s" : ""} enrolled
            </p>
          </div>
          <Link
            href="/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </Link>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {isLoading && <CoursesGridSkeleton />}
        {!isLoading && filtered.length === 0 && (
          <CoursesEmptyState
            hasSearch={search.length > 0}
            hasCourses={enrollments.length === 0}
          />
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
