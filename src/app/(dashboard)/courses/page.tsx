"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  Chip,
  Avatar,
  Breadcrumbs,
  Skeleton,
  Button,
} from "@heroui/react";
import { Plus, Search, Zap, GraduationCap } from "lucide-react";
import useCourseStore from "@/store/CourseStore";
import type { Course } from "@/types/course";

function formatEnum(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

const statusColorMap: Record<string, "success" | "warning" | "default"> = {
  ACTIVE: "success",
  ARCHIVED: "warning",
  DRAFT: "default",
  INACTIVE: "default",
};

export default function CoursesPage() {
  const { courses, loading, error, fetchAllCourses } = useCourseStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

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
            <h1 className="text-2xl font-bold text-text-primary">Courses</h1>
            <p className="text-sm text-text-muted mt-1">
              {courses.length} course{courses.length !== 1 ? "s" : ""} available
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

        {loading && <LoadingGrid />}
        {error && <ErrorState message={error} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            hasSearch={search.length > 0}
            hasCourses={courses.length === 0}
          />
        )}

        {!loading && !error && filtered.length > 0 && (
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

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card.Root
        variant="default"
        className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        <Card.Header className="flex items-start gap-3">
          <Avatar.Root size="md" color="accent" variant="soft">
            <Avatar.Fallback className="font-bold">
              {course.title.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex-1 min-w-0">
            <Card.Title className="text-sm font-semibold text-text-primary truncate">
              {course.title}
            </Card.Title>
            <Card.Description className="text-xs text-text-muted truncate">
              {course.courseCode}
            </Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="space-y-3">
          <p className="text-xs text-text-secondary line-clamp-2">
            {course.description || "No description"}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip.Root variant="soft" size="sm">
              <Chip.Label>{formatEnum(course.department)}</Chip.Label>
            </Chip.Root>
            <Chip.Root
              color={statusColorMap[course.status] ?? "default"}
              variant="soft"
              size="sm"
            >
              <Chip.Label>{formatEnum(course.status)}</Chip.Label>
            </Chip.Root>
          </div>
        </Card.Content>
        <Card.Footer className="border-t border-bg-tertiary">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
            <Zap className="w-4 h-4 text-amber-500" />
            {course.xp} XP
          </div>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-bg-tertiary p-4">
          <div className="flex items-center gap-3">
            <Skeleton.Root className="w-10 h-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton.Root className="h-4 w-3/4 rounded-md" />
              <Skeleton.Root className="h-3 w-1/2 rounded-md" />
            </div>
          </div>
          <Skeleton.Root className="h-8 w-full rounded-md" />
          <Skeleton.Root className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  hasSearch,
  hasCourses,
}: {
  hasSearch: boolean;
  hasCourses: boolean;
}) {
  return (
    <Card.Root variant="default" className="text-center py-16">
      <Card.Content>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-text-muted" />
          </div>
          {hasSearch ? (
            <>
              <Card.Title className="text-lg font-semibold text-text-primary">
                No courses found
              </Card.Title>
              <p className="text-sm text-text-muted max-w-sm">
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
            </>
          ) : (
            <>
              <Card.Title className="text-lg font-semibold text-text-primary">
                No courses yet
              </Card.Title>
              <p className="text-sm text-text-muted max-w-sm">
                Get started by creating your first course.
              </p>
              <Link
                href="/courses/create"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Course
              </Link>
            </>
          )}
        </div>
      </Card.Content>
    </Card.Root>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card.Root variant="default" className="border border-red-200 bg-red-50">
      <Card.Header>
        <Card.Title className="text-red-600">
          Failed to Load Courses
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-text-secondary text-sm">{message}</p>
      </Card.Content>
      <Card.Footer>
        <Button.Root
          variant="primary"
          size="sm"
          onPress={() => useCourseStore.getState().fetchAllCourses()}
        >
          Retry
        </Button.Root>
      </Card.Footer>
    </Card.Root>
  );
}
