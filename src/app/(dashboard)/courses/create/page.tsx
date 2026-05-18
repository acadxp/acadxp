"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, Breadcrumbs, Button } from "@heroui/react";
import { ArrowLeft, Check, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { useCourseCreationStore } from "@/stores/course-creation.store";
import { Department } from "@/types";
import type { GeneratedSkill, GeneratedChallenge, GeneratedBadge } from "@/types";
import { useState } from "react";

const createCourseSchema = z.object({
  courseCode: z.string().min(1, "Course code is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  academicLevel: z.string().min(1, "Academic level is required"),
  xp: z.string().refine((v) => /^\d+$/.test(v), {
    message: "XP must be a positive whole number",
  }),
  department: z.nativeEnum(Department, {
    message: "Select a department",
  }),
});

type FormValues = z.infer<typeof createCourseSchema>;

const departmentOptions = Object.values(Department);

const steps = [
  { key: "SEARCHING", label: "Search" },
  { key: "CREATING", label: "Create" },
  { key: "GENERATING_BLUEPRINT", label: "AI Blueprint" },
  { key: "REVIEWING_BLUEPRINT", label: "Review" },
  { key: "CONFIRMING", label: "Confirm" },
  { key: "SUCCESS", label: "Complete" },
];

function CreationStepper({ workflow }: { workflow: string }) {
  const currentIdx = steps.findIndex((s) => s.key === workflow);
  const activeIdx = currentIdx >= 0 ? currentIdx : 0;

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const isActive = i <= activeIdx && workflow !== "IDLE" && workflow !== "DUPLICATE_FOUND";
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${isActive ? "text-primary" : "text-text-muted"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isActive ? "bg-primary text-white" : "bg-bg-tertiary text-text-muted"}`}>
                {i + 1}
              </div>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-4 h-px ${i < activeIdx ? "bg-primary" : "bg-bg-tertiary"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CreateCoursePage() {
  const router = useRouter();
  const {
    workflow,
    similarCourses,
    gamificationData,
    error,
    startFlow,
    confirmBlueprint,
    enrollExisting,
    reset,
  } = useCourseCreationStore();

  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [selectedChallenges, setSelectedChallenges] = useState<Set<string>>(new Set());
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(new Set());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      courseCode: "",
      title: "",
      description: "",
      academicLevel: "undergraduate",
      xp: "0",
      department: Department.OTHER,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await startFlow({
      ...data,
      xp: parseInt(data.xp, 10),
      department: data.department,
    });
  };

  const handleConfirmBlueprint = async () => {
    if (!gamificationData) return;

    const sanitize = (item: any) => ({
      ...item,
      xpValue: item.xpValue ?? 10,
      xpReward: item.xpReward ?? 10,
    });

    await confirmBlueprint({
      selectedSkills: gamificationData.skills
        .filter((_, i) => selectedSkills.has(`skill-${i}`))
        .map(sanitize),
      selectedChallenges: gamificationData.challenges
        .filter((_, i) => selectedChallenges.has(`challenge-${i}`))
        .map(sanitize),
      selectedBadges: gamificationData.badges
        .filter((_, i) => selectedBadges.has(`badge-${i}`))
        .map(sanitize),
    });
  };

  const handleRetry = () => {
    reset();
  };

  if (workflow === "SUCCESS") {
    return (
      <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Course Created!</h1>
            <p className="text-text-muted mb-8">Your course has been created and you&apos;re enrolled.</p>
            <div className="flex gap-4">
              <Link
                href="/courses"
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                Go to My Courses
              </Link>
              <button
                onClick={() => { reset(); }}
                className="px-6 py-2.5 rounded-xl border border-bg-tertiary text-text-primary text-sm font-semibold hover:bg-bg-secondary transition-all"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (workflow === "DUPLICATE_FOUND") {
    return (
      <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card.Root variant="default">
            <Card.Header>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <div>
                  <Card.Title className="text-xl font-bold text-text-primary">
                    Similar Courses Found
                  </Card.Title>
                  <Card.Description className="text-sm text-text-muted mt-1">
                    One or more courses with similar details already exist. You can enroll directly or go back.
                  </Card.Description>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {similarCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-xl border border-bg-tertiary">
                    <div>
                      <p className="font-semibold text-text-primary">{course.title}</p>
                      <p className="text-xs text-text-muted">{course.courseCode} — {course.department}</p>
                    </div>
                    <Button.Root
                      variant="primary"
                      size="sm"
                      onClick={() => enrollExisting(course.id)}
                    >
                      Enroll
                    </Button.Root>
                  </div>
                ))}
              </div>
            </Card.Content>
            <Card.Footer>
              <button
                onClick={handleRetry}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                ← Go back and create anyway
              </button>
            </Card.Footer>
          </Card.Root>
        </div>
      </div>
    );
  }

  if (workflow === "REVIEWING_BLUEPRINT" && gamificationData) {
    return (
      <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Breadcrumbs.Root>
            <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/courses">Courses</Breadcrumbs.Item>
            <Breadcrumbs.Item>Review Blueprint</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">AI-Generated Blueprint</h1>
          </div>
          <p className="text-sm text-text-muted -mt-4">
            Select the skills, challenges, and badges you want to include.
          </p>

          <Card.Root variant="default">
            <Card.Header>
              <Card.Title className="text-lg font-bold text-text-primary">
                Skills ({gamificationData.skills.length})
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {gamificationData.skills.map((skill, i) => (
                  <label
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSkills.has(`skill-${i}`)
                        ? "border-primary bg-primary/5"
                        : "border-bg-tertiary hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.has(`skill-${i}`)}
                      onChange={() => {
                        const next = new Set(selectedSkills);
                        next.has(`skill-${i}`) ? next.delete(`skill-${i}`) : next.add(`skill-${i}`);
                        setSelectedSkills(next);
                      }}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-text-primary">{skill.title}</p>
                      <p className="text-xs text-text-muted">{skill.description}</p>
                      <p className="text-xs text-primary font-semibold mt-1">{skill.xpValue} XP</p>
                    </div>
                  </label>
                ))}
              </div>
            </Card.Content>
          </Card.Root>

          <Card.Root variant="default">
            <Card.Header>
              <Card.Title className="text-lg font-bold text-text-primary">
                Challenges ({gamificationData.challenges.length})
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {gamificationData.challenges.map((challenge, i) => (
                  <label
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedChallenges.has(`challenge-${i}`)
                        ? "border-primary bg-primary/5"
                        : "border-bg-tertiary hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChallenges.has(`challenge-${i}`)}
                      onChange={() => {
                        const next = new Set(selectedChallenges);
                        next.has(`challenge-${i}`) ? next.delete(`challenge-${i}`) : next.add(`challenge-${i}`);
                        setSelectedChallenges(next);
                      }}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold text-text-primary">{challenge.title}</p>
                      <p className="text-xs text-text-muted">{challenge.description}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{challenge.difficulty}</span>
                        <span className="text-xs text-primary font-semibold">{challenge.xpReward} XP</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Card.Content>
          </Card.Root>

          {gamificationData.badges.length > 0 && (
            <Card.Root variant="default">
              <Card.Header>
                <Card.Title className="text-lg font-bold text-text-primary">
                  Badges ({gamificationData.badges.length})
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {gamificationData.badges.map((badge, i) => (
                    <label
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedBadges.has(`badge-${i}`)
                          ? "border-primary bg-primary/5"
                          : "border-bg-tertiary hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBadges.has(`badge-${i}`)}
                        onChange={() => {
                          const next = new Set(selectedBadges);
                          next.has(`badge-${i}`) ? next.delete(`badge-${i}`) : next.add(`badge-${i}`);
                          setSelectedBadges(next);
                        }}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-text-primary">{badge.title}</p>
                        <p className="text-xs text-text-muted">{badge.description}</p>
                        <p className="text-xs text-primary font-semibold mt-1">{badge.xpValue} XP</p>
                      </div>
                    </label>
                  ))}
                </div>
              </Card.Content>
            </Card.Root>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button.Root variant="primary" size="md" onClick={handleConfirmBlueprint}>
              Confirm Blueprint
            </Button.Root>
            <button
              onClick={handleRetry}
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = workflow === "SEARCHING" || workflow === "CREATING" || workflow === "GENERATING_BLUEPRINT" || workflow === "CONFIRMING";

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

        {workflow !== "IDLE" && <CreationStepper workflow={workflow} />}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-text-primary font-semibold">
              {workflow === "SEARCHING" && "Checking for existing courses..."}
              {workflow === "CREATING" && "Creating your course..."}
              {workflow === "GENERATING_BLUEPRINT" && "Generating AI gamification blueprint..."}
              {workflow === "CONFIRMING" && "Confirming blueprint..."}
            </p>
          </div>
        )}

        {workflow === "IDLE" && (
          <Card.Root variant="default">
            <Card.Header>
              <Card.Title className="text-xl font-bold text-text-primary">
                Create New Course
              </Card.Title>
              <Card.Description className="text-sm text-text-muted mt-1">
                Fill in the details. We&apos;ll check for duplicates and generate an AI gamification blueprint.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                autoComplete="off"
              >
                <div>
                  <label htmlFor="courseCode" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Course Code
                  </label>
                  <input
                    id="courseCode"
                    type="text"
                    placeholder="e.g. CS101"
                    {...register("courseCode")}
                    className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {errors.courseCode && <p className="text-xs text-red-500 mt-1">{errors.courseCode.message}</p>}
                </div>

                <div>
                  <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Course Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g. Introduction to Computer Science"
                    {...register("title")}
                    className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Description <span className="text-text-muted ml-1 normal-case font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Brief description of the course..."
                    {...register("description")}
                    className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="xp" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
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
                    {errors.xp && <p className="text-xs text-red-500 mt-1">{errors.xp.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      Department
                    </label>
                    <select
                      id="department"
                      {...register("department")}
                      className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept.charAt(0).toUpperCase() + dept.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                    {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="academicLevel" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      Academic Level
                    </label>
                    <select
                      id="academicLevel"
                      {...register("academicLevel")}
                      className="w-full px-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="masters">Master&apos;s</option>
                      <option value="phd">PhD</option>
                      <option value="diploma">Diploma</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <Button.Root type="submit" variant="primary" size="md" isDisabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Course"}
                  </Button.Root>
                  <Link href="/courses" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    Cancel
                  </Link>
                </div>
              </form>
            </Card.Content>
          </Card.Root>
        )}
      </div>
    </div>
  );
}
