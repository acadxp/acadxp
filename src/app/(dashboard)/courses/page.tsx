import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Plus,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Search,
  Filter,
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { CourseCard, type Course } from "@/components/cards/CourseCard";

// Static course data - replace with API call later
const courses: Course[] = [
  {
    id: "1",
    courseCode: "CS-301",
    title: "Data Structures & Algorithms",
    description:
      "Master the fundamental building blocks of computer science with sorting, searching, and optimization techniques.",
    xp: 1500,
    department: "TECHNOLOGY",
    enrolledCount: 342,
    progress: 100,
    status: "COMPLETED",
  },
  {
    id: "2",
    courseCode: "CS-201",
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, and JavaScript to build modern, responsive websites from scratch.",
    xp: 1200,
    department: "TECHNOLOGY",
    enrolledCount: 567,
    progress: 75,
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    courseCode: "BUS-101",
    title: "Introduction to Entrepreneurship",
    description:
      "Discover the principles of starting and growing a successful business venture.",
    xp: 800,
    department: "BUSINESS",
    enrolledCount: 234,
    progress: 45,
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    courseCode: "SCI-202",
    title: "Quantum Physics Basics",
    description:
      "Explore the mysterious world of quantum mechanics and its applications.",
    xp: 2000,
    department: "SCIENCE",
    enrolledCount: 156,
    status: "NOT_STARTED",
  },
  {
    id: "5",
    courseCode: "ART-150",
    title: "Digital Art & Design",
    description:
      "Create stunning digital artwork using modern tools and techniques.",
    xp: 1000,
    department: "ARTS",
    enrolledCount: 289,
    progress: 100,
    status: "COMPLETED",
  },
  {
    id: "6",
    courseCode: "MED-301",
    title: "Human Anatomy Essentials",
    description:
      "Comprehensive study of the human body systems and their functions.",
    xp: 1800,
    department: "MEDICINE",
    enrolledCount: 198,
    status: "NOT_STARTED",
  },
  {
    id: "7",
    courseCode: "ENG-250",
    title: "Mechanical Engineering Principles",
    description:
      "Understand the core concepts of mechanics, thermodynamics, and materials.",
    xp: 1600,
    department: "ENGINEERING",
    enrolledCount: 276,
    progress: 30,
    status: "IN_PROGRESS",
  },
  {
    id: "8",
    courseCode: "LAW-101",
    title: "Introduction to Legal Studies",
    description:
      "Foundation course covering legal systems, constitutional law, and ethics.",
    xp: 900,
    department: "LAW",
    enrolledCount: 145,
    status: "NOT_STARTED",
  },
];

// Calculate stats
const completedCourses = courses.filter((c) => c.status === "COMPLETED").length;
const inProgressCourses = courses.filter(
  (c) => c.status === "IN_PROGRESS"
).length;
const totalXpEarned = courses
  .filter((c) => c.status === "COMPLETED")
  .reduce((sum, c) => sum + c.xp, 0);
const averageProgress =
  Math.round(
    courses
      .filter((c) => c.status === "IN_PROGRESS")
      .reduce((sum, c) => sum + (c.progress || 0), 0) / inProgressCourses
  ) || 0;

export default function CoursesPage() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                <GraduationCap className="h-7 w-7 text-violet-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Courses
              </h1>
            </div>
            <p className="text-zinc-400">
              Your epic learning journey continues here! 🎮
            </p>
          </div>
          <Link href="/courses/create">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all duration-200 gap-2">
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="group bg-black/40 border border-violet-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-violet-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/20 group-hover:bg-violet-500/30 transition-colors">
                <BookOpen className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {courses.length}
                </p>
                <p className="text-xs text-zinc-400">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="group bg-black/40 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-emerald-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {completedCourses}
                </p>
                <p className="text-xs text-zinc-400">Completed</p>
              </div>
            </div>
          </div>
          <div className="group bg-black/40 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {totalXpEarned.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-400">XP Earned</p>
              </div>
            </div>
          </div>
          <div className="group bg-black/40 border border-pink-500/20 rounded-xl p-4 backdrop-blur-sm hover:border-pink-500/40 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {averageProgress}%
                </p>
                <p className="text-xs text-zinc-400">Avg Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-black/40 border border-violet-500/20 rounded-xl p-4 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search courses by name, code, or department..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/20 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-300 hover:bg-violet-500/10 gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <select className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-violet-500/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all appearance-none cursor-pointer">
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Quests Section */}
        {inProgressCourses > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <Target className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Active Quests</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                {inProgressCourses} in progress
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.status === "IN_PROGRESS")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </div>
        )}

        {/* Completed Quests Section */}
        {completedCourses > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                <Trophy className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Conquered Quests</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                {completedCourses} completed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.status === "COMPLETED")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </div>
        )}

        {/* Available Quests Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
              <Sparkles className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Available Quests</h2>
            <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium">
              {courses.filter((c) => c.status === "NOT_STARTED").length} new
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((c) => c.status === "NOT_STARTED")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 border border-violet-500/30 rounded-2xl p-6 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-6 w-6 text-violet-400" />
              <span className="text-2xl">🎯</span>
              <Sparkles className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Keep pushing, Adventurer!
            </h3>
            <p className="text-zinc-300 max-w-lg mx-auto">
              You&apos;re making great progress! Complete more quests to unlock
              legendary skills and climb the leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
