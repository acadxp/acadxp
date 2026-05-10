"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  Chip,
  Avatar,
  Breadcrumbs,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import useCourseStore from "@/store/CourseStore";

function formatEnum(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { currentCourse: course, loading, error, fetchCourseById } =
    useCourseStore();

  useEffect(() => {
    if (id) fetchCourseById(id);
  }, [id, fetchCourseById]);

  if (loading || (!course && !error)) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!course) return null;

  const statusColor = {
    ACTIVE: "success" as const,
    INACTIVE: "default" as const,
    ARCHIVED: "warning" as const,
    DRAFT: "default" as const,
  }[course.status];

  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/courses">Courses</Breadcrumbs.Item>
          <Breadcrumbs.Item>{course.title}</Breadcrumbs.Item>
        </Breadcrumbs.Root>

        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </Link>

        <Card.Root variant="default" className="w-full">
          <Card.Header className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar.Root size="lg" color="accent" variant="soft">
              <Avatar.Fallback className="text-lg font-bold">
                {course.title.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <Card.Title className="text-2xl font-bold text-text-primary">
                  {course.title}
                </Card.Title>
                <Chip.Root variant="soft" size="sm">
                  <Chip.Label>{course.courseCode}</Chip.Label>
                </Chip.Root>
              </div>
              <Card.Description className="text-text-secondary">
                {formatEnum(course.department)} &middot;{" "}
                {formatEnum(course.status)}
              </Card.Description>
            </div>
            <Chip.Root color={statusColor} variant="soft" size="sm">
              <Chip.Label>{formatEnum(course.status)}</Chip.Label>
            </Chip.Root>
          </Card.Header>
        </Card.Root>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card.Root variant="default">
              <Card.Header>
                <Card.Title className="text-lg font-semibold text-text-primary">
                  About This Course
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-text-secondary leading-relaxed">
                  {course.description || "No description provided."}
                </p>
              </Card.Content>
            </Card.Root>
          </div>

          <div className="space-y-6">
            <Card.Root variant="default">
              <Card.Content className="flex flex-col items-center py-8">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="text-3xl font-bold text-text-primary">
                    {course.xp}
                  </span>
                </div>
                <p className="text-sm text-text-muted">Total XP</p>
              </Card.Content>
            </Card.Root>

            <Card.Root variant="default">
              <Card.Header>
                <Card.Title className="text-lg font-semibold text-text-primary">
                  Course Details
                </Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <DetailRow label="Code" value={course.courseCode} />
                <DetailRow label="Department">
                  <Chip.Root variant="soft" size="sm">
                    <Chip.Label>{formatEnum(course.department)}</Chip.Label>
                  </Chip.Root>
                </DetailRow>
                <DetailRow
                  label="Status"
                  value={formatEnum(course.status)}
                />
                <DetailRow
                  label="Created"
                  value={new Date(course.createdAt).toLocaleDateString()}
                />
                <DetailRow
                  label="Updated"
                  value={new Date(course.updatedAt).toLocaleDateString()}
                />
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-muted">{label}</span>
      {children || (
        <span className="text-sm font-medium text-text-primary">{value}</span>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton.Root className="h-4 w-64 rounded-md" />
        <Skeleton.Root className="h-4 w-32 rounded-md" />
        <Skeleton.Root className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton.Root className="h-48 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton.Root className="h-32 w-full rounded-xl" />
            <Skeleton.Root className="h-56 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <Card.Root
          variant="default"
          className="border border-red-200 bg-red-50"
        >
          <Card.Header>
            <Card.Title className="text-red-600">
              Failed to Load Course
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-text-secondary">{message}</p>
          </Card.Content>
          <Card.Footer>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Courses
            </Link>
          </Card.Footer>
        </Card.Root>
      </div>
    </div>
  );
}
