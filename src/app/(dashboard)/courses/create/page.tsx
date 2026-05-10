"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, Breadcrumbs, Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import useCourseStore from "@/store/CourseStore";
import { Department } from "@/types/course";
import type { CreateCoursePayload } from "@/types/course";

const createCourseSchema = z.object({
  courseCode: z.string().min(1, "Course code is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  xp: z.string().refine((v) => /^\d+$/.test(v), {
    message: "XP must be a positive whole number",
  }),
  department: z.nativeEnum(Department, {
    error: "Select a department",
  }),
});

type FormValues = z.infer<typeof createCourseSchema>;

const departmentOptions = Object.values(Department);

export default function CreateCoursePage() {
  const router = useRouter();
  const { createCourse, loading, error } = useCourseStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      courseCode: "",
      title: "",
      description: "",
      xp: "0",
      department: Department.OTHER,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const course = await createCourse({
        ...data,
        xp: parseInt(data.xp, 10),
      } as CreateCoursePayload);
      router.push(`/courses/${course.id}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create course. Please try again.";
      setError("root", { message });
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/courses">Courses</Breadcrumbs.Item>
          <Breadcrumbs.Item>Create Course</Breadcrumbs.Item>
        </Breadcrumbs.Root>

        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to courses
        </Link>

        <Card.Root variant="default">
          <Card.Header>
            <Card.Title className="text-xl font-bold text-text-primary">
              Create New Course
            </Card.Title>
            <Card.Description className="text-sm text-text-muted mt-1">
              Fill in the details to create a new course.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="courseCode"
                  className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5"
                >
                  Course Code
                </label>
                <input
                  id="courseCode"
                  type="text"
                  placeholder="e.g. CS101"
                  {...register("courseCode")}
                  className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {errors.courseCode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.courseCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5"
                >
                  Course Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Introduction to Computer Science"
                  {...register("title")}
                  className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5"
                >
                  Description
                  <span className="text-text-muted ml-1 normal-case font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Brief description of the course..."
                  {...register("description")}
                  className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="xp"
                    className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5"
                  >
                    XP Value
                  </label>
                  <input
                    id="xp"
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("xp")}
                    className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {errors.xp && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.xp.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    {...register("department")}
                    className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept.charAt(0).toUpperCase() +
                          dept.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>

              {errors.root && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Button.Root
                  type="submit"
                  variant="primary"
                  size="md"
                  isDisabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Creating..." : "Create Course"}
                </Button.Root>
                <Link
                  href="/courses"
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}
