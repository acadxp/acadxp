"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, Button } from "@heroui/react";
import { Check, Loader2, Sparkles, Info, Brain, Trophy, ArrowRight } from "lucide-react";
import { useCourseCreationStore } from "@/stores/course-creation.store";
import { Department } from "@/types";
import { CourseCard } from "@/components/courses/course-card";
import type { GeneratedSkill, GeneratedChallenge, GeneratedBadge } from "@/types";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

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

function GeneratingScreen({ workflow }: { workflow: string }) {
  const [activeProgress, setActiveProgress] = useState(0);
  const completedRef = useRef<Set<string>>(new Set());
  const steps = [
    { key: "CREATING", label: "Creating course...", icon: Sparkles },
    { key: "GENERATING_BLUEPRINT", label: "Generating skills...", icon: Brain },
    { key: "CONFIRMING", label: "Finalizing...", icon: Trophy },
  ];

  const currentStepIdx = steps.findIndex((s) => s.key === workflow);

  useEffect(() => {
    if (currentStepIdx >= 0) {
      steps.slice(0, currentStepIdx).forEach((s) => completedRef.current.add(s.key));
      setActiveProgress(0);
      const timer = setInterval(() => {
        setActiveProgress((prev) => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentStepIdx]);

  useEffect(() => {
    completedRef.current = new Set();
    setActiveProgress(0);
  }, []);

  const phaseTitle =
    workflow === "CREATING" ? "Creating your course..."
    : workflow === "GENERATING_BLUEPRINT" ? "Our AI engine is architecting your learning path..."
    : "Finalizing your course...";

  const phaseLabel =
    workflow === "CREATING" ? "Construction"
    : workflow === "GENERATING_BLUEPRINT" ? "Blueprint"
    : "Finalizing";

  return (
    <div className="w-full max-w-xl bg-bg-primary rounded-[20px] p-10 shadow-sm relative overflow-hidden border border-bg-tertiary">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>
      <div className="relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Phase 0{currentStepIdx + 2}: {phaseLabel}
          </span>
          <h2 className="text-3xl font-normal tracking-tight text-text-primary">
            {phaseTitle}
          </h2>
        </div>
        <div className="space-y-6">
          {steps.map((step, i) => {
            const isComplete = i < currentStepIdx || completedRef.current.has(step.key);
            const isActive = i === currentStepIdx;
            const Icon = step.icon;
            return (
              <div key={step.key} className={`flex items-center gap-4 group ${i > currentStepIdx ? "opacity-50" : ""}`}>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isComplete ? "bg-primary text-white" : isActive ? "bg-bg-tertiary text-primary animate-pulse" : "bg-bg-tertiary text-text-secondary"
                  }`}
                >
                  {isComplete ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text-primary">{step.label}</span>
                    <span className="text-[10px] font-bold text-text-muted">
                      {isComplete ? "COMPLETE" : isActive ? `${Math.min(activeProgress, 100)}%` : "QUEUED"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: isComplete ? "100%" : isActive ? `${activeProgress}%` : "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 pt-8 border-t border-bg-tertiary flex items-center justify-between text-text-muted">
          <div className="flex items-center gap-2">
            <Info size={14} />
            <span className="text-[11px] tracking-tight">This process usually takes 15-20 seconds.</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[11px] font-bold text-text-primary uppercase tracking-tighter">AI Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({
  gamificationData,
  error,
  onConfirm,
  onBack,
}: {
  gamificationData: { skills: GeneratedSkill[]; challenges: GeneratedChallenge[]; badges: GeneratedBadge[] };
  error: string | null;
  onConfirm: (payload: {
    selectedSkills: GeneratedSkill[];
    selectedChallenges: GeneratedChallenge[];
    selectedBadges: GeneratedBadge[];
  }) => void;
  onBack: () => void;
}) {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set(gamificationData.skills.map((_, i) => `skill-${i}`)));
  const [selectedChallenges, setSelectedChallenges] = useState<Set<string>>(new Set(gamificationData.challenges.map((_, i) => `challenge-${i}`)));
  const [selectedBadges, setSelectedBadges] = useState<Set<string>>(new Set(gamificationData.badges.map((_, i) => `badge-${i}`)));

  const toggle = (id: string, set: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    set((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalXp =
    [...selectedSkills].reduce((sum, id) => {
      const idx = parseInt(id.replace("skill-", ""));
      return sum + (gamificationData.skills[idx]?.xpValue ?? 0);
    }, 0) +
    [...selectedChallenges].reduce((sum, id) => {
      const idx = parseInt(id.replace("challenge-", ""));
      return sum + (gamificationData.challenges[idx]?.xpReward ?? 0);
    }, 0) +
    [...selectedBadges].reduce((sum, id) => {
      const idx = parseInt(id.replace("badge-", ""));
      return sum + (gamificationData.badges[idx]?.xpValue ?? 0);
    }, 0);

  const totalSelected = selectedSkills.size + selectedChallenges.size + selectedBadges.size;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-normal tracking-tight text-text-primary mb-2">Review your Learning Blueprint</h1>
        <p className="text-text-secondary text-lg">Select the components you wish to activate for your course.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">Skills</h2>
            <span className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary">{selectedSkills.size} Selected</span>
          </div>
          <div className="space-y-4">
            {gamificationData.skills.map((skill, i) => {
              const id = `skill-${i}`;
              const isSelected = selectedSkills.has(id);
              return (
                <div
                  key={id}
                  onClick={() => toggle(id, setSelectedSkills)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${
                    isSelected ? "border-primary bg-bg-secondary" : "bg-bg-primary border-bg-tertiary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-text-primary">{skill.title}</h3>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        isSelected ? "bg-primary border-primary" : "border-text-muted"
                      }`}
                    >
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">{skill.description}</p>
                  <span className="text-[10px] font-bold text-primary bg-bg-tertiary px-2 py-1 rounded">
                    {(skill.xpValue ?? 0).toLocaleString()} XP
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">Challenges</h2>
            <span className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary">{selectedChallenges.size} Selected</span>
          </div>
          <div className="space-y-4">
            {gamificationData.challenges.map((challenge, i) => {
              const id = `challenge-${i}`;
              const isSelected = selectedChallenges.has(id);
              const difficultyColor =
                challenge.difficulty === "hard" ? "text-error bg-error/10"
                : challenge.difficulty === "medium" ? "text-text-secondary bg-bg-tertiary"
                : "text-green-600 bg-green-50";
              return (
                <div
                  key={id}
                  onClick={() => toggle(id, setSelectedChallenges)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${
                    isSelected ? "border-primary bg-bg-secondary" : "bg-bg-primary border-bg-tertiary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-text-primary">{challenge.title}</h3>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        isSelected ? "bg-primary border-primary" : "border-text-muted"
                      }`}
                    >
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">{challenge.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-bg-tertiary px-2 py-1 rounded">
                      {challenge.xpReward.toLocaleString()} XP
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded uppercase tracking-tighter ${difficultyColor}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">Badges</h2>
            <span className="text-[10px] bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary">{selectedBadges.size} Selected</span>
          </div>
          <div className="space-y-4">
            {gamificationData.badges.map((badge, i) => {
              const id = `badge-${i}`;
              const isSelected = selectedBadges.has(id);
              return (
                <div
                  key={id}
                  onClick={() => toggle(id, setSelectedBadges)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${
                    isSelected ? "border-primary bg-bg-secondary" : "bg-bg-primary border-bg-tertiary"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center text-primary">
                      <Trophy size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-text-primary">{badge.title}</h3>
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isSelected ? "bg-primary border-primary" : "border-text-muted"
                          }`}
                        >
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{badge.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-bg-tertiary px-2 py-1 rounded">
                    {(badge.xpValue ?? 0).toLocaleString()} XP
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="fixed bottom-0 right-0 left-0 lg:left-64 bg-bg-primary border-t border-bg-tertiary py-4 px-8 z-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-bg-tertiary border-2 border-bg-primary flex items-center justify-center">
              <Brain size={12} className="text-primary" />
            </div>
            <div className="w-8 h-8 rounded-full bg-bg-tertiary border-2 border-bg-primary flex items-center justify-center">
              <Trophy size={12} className="text-primary" />
            </div>
          </div>
          <div className="text-sm font-medium">
            <span className="text-text-primary">{totalSelected} items selected</span>
            <span className="mx-2 text-text-muted">&bull;</span>
            <span className="text-primary">{totalXp.toLocaleString()} XP potential</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </button>
          <button
            onClick={() =>
              onConfirm({
                selectedSkills: gamificationData.skills.filter((_, i) => selectedSkills.has(`skill-${i}`)),
                selectedChallenges: gamificationData.challenges.filter((_, i) => selectedChallenges.has(`challenge-${i}`)),
                selectedBadges: gamificationData.badges.filter((_, i) => selectedBadges.has(`badge-${i}`)),
              })
            }
            className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 scale-100 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Confirm & enroll
          </button>
        </div>
      </footer>
    </div>
  );
}

function SuccessScreen({
  wasEnrollment,
  onReset,
}: {
  wasEnrollment: boolean;
  onReset: () => void;
}) {
  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-green-600" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-text-primary mb-3">
          {wasEnrollment ? "Enrolled Successfully!" : "Course Created!"}
        </h1>
        <p className="text-text-secondary mb-10 max-w-sm mx-auto">
          {wasEnrollment
            ? "You have been enrolled in the course. Start learning now!"
            : "Your course has been created and you&apos;re enrolled. The blueprint is ready."}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
          >
            Go to My Courses
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={onReset}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {wasEnrollment ? "Enroll in another course" : "Create another course"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function CreateCoursePage() {
  const {
    workflow,
    similarCourses,
    gamificationData,
    error,
    wasEnrollment,
    startFlow,
    confirmBlueprint,
    enrollExisting,
    reset,
  } = useCourseCreationStore();

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

  const handleConfirmBlueprint = (payload: {
    selectedSkills: GeneratedSkill[];
    selectedChallenges: GeneratedChallenge[];
    selectedBadges: GeneratedBadge[];
  }) => {
    confirmBlueprint(payload);
  };

  if (workflow === "SUCCESS") {
    return (
      <div className="w-full min-h-screen bg-bg-secondary flex items-start justify-center px-4 py-8 lg:px-10 lg:py-12">
        <SuccessScreen wasEnrollment={wasEnrollment} onReset={reset} />
      </div>
    );
  }

  if (workflow === "DUPLICATE_FOUND") {
    return (
      <div className="w-full min-h-screen bg-bg-secondary flex items-start justify-center px-4 py-8 lg:px-10 lg:py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-normal tracking-tighter text-text-primary mb-2">Similar Courses Found</h2>
            <p className="text-text-secondary text-sm">One or more courses with similar details already exist. You can enroll directly or go back.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {similarCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={() => enrollExisting(course.id)}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center py-10 bg-bg-secondary rounded-2xl border border-bg-tertiary">
            <p className="text-text-secondary text-sm mb-4">
              Not what you&apos;re looking for?{" "}
              <button onClick={reset} className="text-text-primary font-semibold hover:text-primary transition-colors">
                Go back and create anyway &rarr;
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (workflow === "REVIEWING_BLUEPRINT" && gamificationData) {
    return (
      <div className="w-full min-h-screen bg-bg-secondary">
        <ReviewScreen
          gamificationData={gamificationData}
          error={error}
          onConfirm={handleConfirmBlueprint}
          onBack={reset}
        />
      </div>
    );
  }

  const isLoading = workflow === "SEARCHING" || workflow === "CREATING" || workflow === "GENERATING_BLUEPRINT" || workflow === "CONFIRMING";

  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/courses" className="hover:text-text-primary transition-colors">
            &larr; Back to courses
          </Link>
        </div>

        {workflow !== "IDLE" && !isLoading && <CreationStepper workflow={workflow} />}

        {isLoading && (
          <div className="flex items-start justify-center pt-16">
            {workflow === "SEARCHING" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-text-primary font-semibold">Checking for existing courses...</p>
              </div>
            ) : (
              <GeneratingScreen workflow={workflow} />
            )}
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
