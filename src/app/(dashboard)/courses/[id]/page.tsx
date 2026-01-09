"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Clock,
  Zap,
  Star,
  CheckCircle2,
  Lock,
  Scroll,
  Swords,
  Target,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  GraduationCap,
  Users,
  Calendar,
  Award,
  Search,
  GitBranch,
  Binary,
  Cpu,
  Layers,
  TreeDeciduous,
  Hash,
  Infinity,
  Brain,
} from "lucide-react";

// Mock course data - replace with API call
const courseData = {
  id: "1",
  courseCode: "CS-301",
  title: "Data Structures & Algorithms",
  description:
    "Master the fundamental building blocks of computer science. This epic quest will guide you through the mystical arts of sorting, searching, and optimizing code to achieve legendary performance.",
  xp: 1500,
  department: "TECHNOLOGY",
  difficulty: "Expert",
  duration: "8 Weeks",
  enrolledStudents: 342,
  completionRate: 96.2,
  grade: "A+",
  status: "COMPLETED", // COMPLETED | IN_PROGRESS | NOT_STARTED
  xpEarned: 1100,
  hoursInvested: 120,
};

const challenges = [
  {
    id: "1",
    title: "Binary Search Implementation",
    xp: 100,
    status: "COMPLETED",
    progress: 100,
    icon: Binary,
  },
  {
    id: "2",
    title: "Sorting Algorithms Battle",
    xp: 100,
    status: "COMPLETED",
    progress: 100,
    icon: Layers,
  },
  {
    id: "3",
    title: "Graph Traversal Quest",
    xp: 200,
    status: "COMPLETED",
    progress: 82,
    icon: GitBranch,
  },
  {
    id: "4",
    title: "Final Boss: Dynamic Programming",
    xp: 100,
    status: "COMPLETED",
    progress: 100,
    icon: Brain,
  },
];

const abilities = [
  {
    name: "Search Mastery",
    subtitle: "Binary & Linear Search",
    icon: Search,
    unlocked: true,
  },
  {
    name: "Sort Wizard",
    subtitle: "QuickSort & MergeSort",
    icon: Layers,
    unlocked: true,
  },
  {
    name: "Graph Walker",
    subtitle: "BFS & DFS Traversal",
    icon: GitBranch,
    unlocked: true,
  },
  {
    name: "DP Sage",
    subtitle: "Dynamic Programming",
    icon: Brain,
    unlocked: true,
  },
  {
    name: "Stack Master",
    subtitle: "Stack & Queue Operations",
    icon: Layers,
    unlocked: true,
  },
  {
    name: "Tree Guardian",
    subtitle: "Binary Tree & Heaps",
    icon: TreeDeciduous,
    unlocked: true,
  },
  {
    name: "Hash Keeper",
    subtitle: "Hash Tables & Maps",
    icon: Hash,
    unlocked: true,
  },
  {
    name: "Complexity Lord",
    subtitle: "Big O Analysis",
    icon: Infinity,
    unlocked: true,
  },
];

const journalNotes = {
  keyDiscoveries:
    "The recursive approach to dynamic programming was initially challenging, but breaking problems into subproblems became second nature after the Fibonacci optimization quest. The memoization technique proved to be a game-changer for performance.",
  battleStrategies:
    "When facing the Graph Traversal boss, I learned that choosing between BFS and DFS depends on the quest objective. BFS for shortest path quests, DFS for exploring all possible routes. The adjacency list representation saved memory in sparse graphs.",
  legendaryMoments:
    "Achieving 100% on the Dynamic Programming final boss was the highlight of this quest. The solution to the Knapsack problem clicked after hours of debugging, and the eureka moment felt like unlocking a legendary skill.",
  futureQuests:
    "Ready to apply these newfound abilities in Advanced Algorithms and Machine Learning quests. The foundation built here will be crucial for tackling more complex computational challenges ahead.",
};

export default function CourseDetailPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "keyDiscoveries"
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "IN_PROGRESS":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "from-amber-400 to-yellow-500";
    if (grade.startsWith("B")) return "from-emerald-400 to-green-500";
    if (grade.startsWith("C")) return "from-blue-400 to-cyan-500";
    return "from-zinc-400 to-zinc-500";
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/10 to-pink-600/20 rounded-3xl blur-xl" />

          <div className="relative bg-black/40 border border-violet-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl" />

            {/* Back Button */}
            <Link href="/courses" className="inline-block mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                    <Trophy className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {courseData.title}
                      </h1>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          courseData.status
                        )}`}
                      >
                        {courseData.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-violet-400 text-sm mt-1">
                      {courseData.courseCode}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-300 mb-6 leading-relaxed max-w-2xl">
                  {courseData.description}
                </p>

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded-lg bg-red-500/20">
                      <Swords className="h-4 w-4 text-red-400" />
                    </div>
                    <span className="text-zinc-400">Difficulty:</span>
                    <span className="text-red-400 font-medium">
                      {courseData.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded-lg bg-blue-500/20">
                      <Clock className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-zinc-400">Duration:</span>
                    <span className="text-blue-400 font-medium">
                      {courseData.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1.5 rounded-lg bg-violet-500/20">
                      <Users className="h-4 w-4 text-violet-400" />
                    </div>
                    <span className="text-zinc-400">Enrolled:</span>
                    <span className="text-violet-400 font-medium">
                      {courseData.enrolledStudents} students
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade Badge */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${getGradeColor(
                      courseData.grade
                    )} p-1 shadow-lg shadow-amber-500/30`}
                  >
                    <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                        {courseData.grade}
                      </span>
                    </div>
                  </div>
                  {/* Stars decoration */}
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mt-3">Quest Mastery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini-Quests & Challenges */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <Swords className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Mini-Quests & Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              const isCompleted = challenge.status === "COMPLETED";

              return (
                <div
                  key={challenge.id}
                  className="group relative bg-black/40 border border-violet-500/20 rounded-xl p-5 backdrop-blur-sm hover:border-violet-500/40 transition-all duration-300"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isCompleted
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-violet-500/20 border border-violet-500/30"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isCompleted
                                ? "text-emerald-400"
                                : "text-violet-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {challenge.title}
                          </h3>
                          <span
                            className={`text-xs font-medium ${
                              isCompleted
                                ? "text-emerald-400"
                                : "text-amber-400"
                            }`}
                          >
                            {isCompleted ? "COMPLETED" : "IN PROGRESS"}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">
                        <Zap className="h-3 w-3" />+{challenge.xp} XP
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? "bg-gradient-to-r from-emerald-500 to-green-400"
                            : "bg-gradient-to-r from-amber-500 to-orange-400"
                        }`}
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 text-right">
                      {challenge.progress}/100
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abilities Unlocked */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <Star className="h-5 w-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Abilities Unlocked</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {abilities.map((ability, index) => {
              const Icon = ability.icon;
              return (
                <div
                  key={index}
                  className={`group relative text-center p-4 rounded-xl transition-all duration-300 ${
                    ability.unlocked
                      ? "bg-black/40 border border-amber-500/20 hover:border-amber-500/40"
                      : "bg-black/20 border border-zinc-700/30 opacity-50"
                  }`}
                >
                  {ability.unlocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}

                  <div className="relative">
                    <div
                      className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        ability.unlocked
                          ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40"
                          : "bg-zinc-800/50 border-2 border-zinc-700/30"
                      }`}
                    >
                      {ability.unlocked ? (
                        <Icon className="h-6 w-6 text-amber-400" />
                      ) : (
                        <Lock className="h-5 w-5 text-zinc-600" />
                      )}
                    </div>
                    <h4
                      className={`font-semibold text-sm ${
                        ability.unlocked ? "text-white" : "text-zinc-600"
                      }`}
                    >
                      {ability.name}
                    </h4>
                    <p
                      className={`text-xs mt-1 ${
                        ability.unlocked ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {ability.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Adventure Journal */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
              <Scroll className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Adventure Journal</h2>
          </div>

          <div className="bg-black/40 border border-violet-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold text-amber-400">
                Personal Quest Notes
              </h3>
            </div>

            <div className="space-y-4">
              {/* Key Discoveries */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("keyDiscoveries")}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors"
                >
                  <span className="font-medium text-amber-400">
                    Key Discoveries
                  </span>
                  {expandedSection === "keyDiscoveries" ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>
                {expandedSection === "keyDiscoveries" && (
                  <div className="p-4 border-t border-zinc-800">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {journalNotes.keyDiscoveries}
                    </p>
                  </div>
                )}
              </div>

              {/* Battle Strategies */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("battleStrategies")}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors"
                >
                  <span className="font-medium text-purple-400">
                    Battle Strategies
                  </span>
                  {expandedSection === "battleStrategies" ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>
                {expandedSection === "battleStrategies" && (
                  <div className="p-4 border-t border-zinc-800">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {journalNotes.battleStrategies}
                    </p>
                  </div>
                )}
              </div>

              {/* Legendary Moments */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("legendaryMoments")}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors"
                >
                  <span className="font-medium text-pink-400">
                    Legendary Moments
                  </span>
                  {expandedSection === "legendaryMoments" ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>
                {expandedSection === "legendaryMoments" && (
                  <div className="p-4 border-t border-zinc-800">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {journalNotes.legendaryMoments}
                    </p>
                  </div>
                )}
              </div>

              {/* Future Quests */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection("futureQuests")}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-zinc-900/70 transition-colors"
                >
                  <span className="font-medium text-emerald-400">
                    Future Quests
                  </span>
                  {expandedSection === "futureQuests" ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>
                {expandedSection === "futureQuests" && (
                  <div className="p-4 border-t border-zinc-800">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {journalNotes.futureQuests}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 border border-violet-500/30 rounded-2xl p-6 backdrop-blur-xl mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-amber-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-amber-400">
                {courseData.xpEarned}
              </p>
              <p className="text-sm text-zinc-400">Total XP Earned</p>
            </div>
            <div className="text-center border-x border-violet-500/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-blue-400">
                {courseData.hoursInvested}
              </p>
              <p className="text-sm text-zinc-400">Hours Invested</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-emerald-400">
                {courseData.completionRate}%
              </p>
              <p className="text-sm text-zinc-400">Quest Completion</p>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {courseData.status === "COMPLETED" && (
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23fbbf24%22%20fill-opacity%3D%220.05%22%3E%3Cpolygon%20points%3D%2210%2C0%2012%2C7%2020%2C7%2014%2C12%2016%2C20%2010%2C15%204%2C20%206%2C12%200%2C7%208%2C7%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
            <div className="relative flex items-center justify-center gap-3">
              <Award className="h-6 w-6 text-amber-400" />
              <span className="text-amber-400 font-semibold">
                🎉 Quest completed with legendary status! 🎉
              </span>
              <Award className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-violet-500/20 p-4 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Quest Log
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium gap-2">
              Next Adventure
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
