"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  Loader2,
  Sparkles,
  Trophy,
  Users,
  Zap,
  GraduationCap,
  Lightbulb,
  Target,
  Star,
  CheckCircle2,
  Code,
  Palette,
  FlaskConical,
  Briefcase,
  Stethoscope,
  Scale,
  Cpu,
  BookMarked,
} from "lucide-react";

const Department = {
  EDUCATION: "EDUCATION",
  ENGINEERING: "ENGINEERING",
  SCIENCE: "SCIENCE",
  ARTS: "ARTS",
  BUSINESS: "BUSINESS",
  MEDICINE: "MEDICINE",
  LAW: "LAW",
  TECHNOLOGY: "TECHNOLOGY",
} as const;

type DepartmentType = (typeof Department)[keyof typeof Department];

const departmentConfig: Record<
  DepartmentType,
  { label: string; icon: typeof BookOpen; color: string; gradient: string }
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

const schema = z.object({
  courseCode: z
    .string()
    .min(2, "Course code must be at least 2 characters")
    .max(20, "Course code must be less than 20 characters")
    .regex(
      /^[A-Z0-9-]+$/,
      "Course code must contain only uppercase letters, numbers, and hyphens"
    ),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  xp: z
    .number("XP must be a number")
    .int("XP must be a whole number")
    .min(0, "XP must be at least 0")
    .max(10000, "XP must be less than 10,000"),
  department: z.enum(
    Object.keys(Department) as [DepartmentType, ...DepartmentType[]]
  ),
});

type FormValues = z.infer<typeof schema>;

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      courseCode: "",
      title: "",
      description: "",
      xp: 100,
      department: "EDUCATION",
    },
  });

  const watchedValues = watch();
  const selectedDept = departmentConfig[watchedValues.department];
  const DeptIcon = selectedDept.icon;

  // Calculate form completion percentage
  const totalFields = 4; // courseCode, title, xp, department (description is optional)
  const completedFields = [
    dirtyFields.courseCode && !errors.courseCode,
    dirtyFields.title && !errors.title,
    true, // xp has default value
    true, // department has default value
  ].filter(Boolean).length;
  const completionPercentage = Math.round(
    (completedFields / totalFields) * 100
  );

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      console.log("Creating course:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to courses page on success
      router.push("/courses");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/courses">
            <Button
              variant="ghost"
              size="icon"
              className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border border-violet-500/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create New Course
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 border border-violet-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Form Completion</span>
                <span className="text-sm font-medium text-violet-400">
                  {completionPercentage}%
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Course Identity Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                    <BookMarked className="h-5 w-5 text-violet-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Course Identity
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course Code */}
                  <div className="space-y-2">
                    <label
                      htmlFor="courseCode"
                      className="text-sm font-medium text-violet-300 flex items-center gap-2"
                    >
                      Course Code <span className="text-red-400">*</span>
                      {dirtyFields.courseCode && !errors.courseCode && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </label>
                    <input
                      id="courseCode"
                      type="text"
                      {...register("courseCode")}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all uppercase"
                      placeholder="CS-101"
                    />
                    <p className="text-xs text-zinc-500">
                      Uppercase letters, numbers, and hyphens only
                    </p>
                    {errors.courseCode && (
                      <p className="text-sm text-red-400">
                        {errors.courseCode.message}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <label
                      htmlFor="department"
                      className="text-sm font-medium text-violet-300"
                    >
                      Department <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="department"
                      {...register("department")}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-violet-500/30 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {Object.entries(departmentConfig).map(
                        ([value, config]) => (
                          <option
                            key={value}
                            value={value}
                            className="bg-zinc-900 text-white"
                          >
                            {config.label}
                          </option>
                        )
                      )}
                    </select>
                    {errors.department && (
                      <p className="text-sm text-red-400">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-violet-300 flex items-center gap-2"
                  >
                    Course Title <span className="text-red-400">*</span>
                    {dirtyFields.title && !errors.title && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    )}
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="Introduction to Computer Science"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Course Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30">
                    <Lightbulb className="h-5 w-5 text-pink-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Course Details
                  </h2>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-violet-300"
                  >
                    Description{" "}
                    <span className="text-zinc-500 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="description"
                    {...register("description")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    placeholder="A brief description of the course content and objectives..."
                  />
                  <div className="flex justify-between">
                    <p className="text-xs text-zinc-500">
                      Describe what students will learn
                    </p>
                    <p className="text-xs text-zinc-500">
                      {watchedValues.description?.length || 0}/500
                    </p>
                  </div>
                  {errors.description && (
                    <p className="text-sm text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* XP & Rewards Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <Trophy className="h-5 w-5 text-amber-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    XP & Rewards
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* XP */}
                  <div className="space-y-2">
                    <label
                      htmlFor="xp"
                      className="text-sm font-medium text-violet-300"
                    >
                      XP Points <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="xp"
                      type="number"
                      {...register("xp", { valueAsNumber: true })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      placeholder="100"
                      min={0}
                      max={10000}
                    />
                    {errors.xp && (
                      <p className="text-sm text-red-400">
                        {errors.xp.message}
                      </p>
                    )}
                  </div>

                  {/* XP Preview */}
                  <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                        <span className="text-3xl font-bold text-amber-400">
                          {watchedValues.xp || 0}
                        </span>
                        <span className="text-lg text-amber-400/70">XP</span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Awarded on completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-zinc-800">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full sm:flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Course...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Course
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Preview Card */}
          <div className="bg-black/40 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-violet-400" />
              <h3 className="font-semibold text-white">Live Preview</h3>
            </div>

            <div
              className={`rounded-xl p-4 bg-gradient-to-br ${selectedDept.gradient} bg-opacity-10 border border-white/10 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm`}
                  >
                    <DeptIcon className={`h-6 w-6 ${selectedDept.color}`} />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {watchedValues.xp || 0} XP
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-1">
                  {watchedValues.courseCode || "COURSE-CODE"}
                </p>
                <h4 className="font-semibold text-white mb-2 line-clamp-2">
                  {watchedValues.title || "Course Title"}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  {watchedValues.description ||
                    "Course description will appear here..."}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-medium ${selectedDept.color}`}>
                    {selectedDept.label}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Users className="h-3 w-3" />
                    <span className="text-xs">0 enrolled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-black/40 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-white">Pro Tips</h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-violet-500/20 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-violet-400" />
                </div>
                <p className="text-sm text-zinc-400">
                  Use clear, descriptive course codes like{" "}
                  <span className="text-violet-300">CS-101</span> or{" "}
                  <span className="text-violet-300">MATH-201</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-pink-500/20 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-pink-400" />
                </div>
                <p className="text-sm text-zinc-400">
                  Write engaging titles that spark curiosity
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-amber-500/20 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-amber-400" />
                </div>
                <p className="text-sm text-zinc-400">
                  Balance XP rewards based on course difficulty and length
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-emerald-500/20 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </div>
                <p className="text-sm text-zinc-400">
                  Add a detailed description to help students understand the
                  course
                </p>
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <h3 className="font-semibold text-white">What You'll Create</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Course Page</span>
                <span className="text-sm text-emerald-400">
                  ✓ Auto-generated
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Enrollment System</span>
                <span className="text-sm text-emerald-400">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">XP Tracking</span>
                <span className="text-sm text-emerald-400">✓ Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Leaderboard</span>
                <span className="text-sm text-emerald-400">✓ Integrated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
