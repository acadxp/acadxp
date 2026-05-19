"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bolt,
  Clock,
  Donut,
  CheckCircle2,
  FileText,
  Database,
  Shield,
  Timer,
  Star,
  Award,
  MoreHorizontal,
  Headphones,
  Share2,
  Trophy,
} from "lucide-react";
import { courseService } from "@/services/course.service";
import { ChallengeDetailSkeleton } from "@/components/courses/challenge-detail-skeleton";
import { formatEnum } from "@/components/courses/course-utils";
import type { Challenge } from "@/types";

type ChallengeWithProgress = Challenge & {
  progress: number;
  status: string;
  attempts: number;
  completedAt: string | null;
};

const tabs = ["Overview", "Resources", "Workspace"];

export default function ChallengeDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const challengeId = params?.challengeId as string;
  const [challenge, setChallenge] = useState<ChallengeWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    if (!courseId || !challengeId) return;
    setLoading(true);
    courseService.getChallenge(courseId, challengeId)
      .then(({ data }) => setChallenge(data.data!))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load challenge"))
      .finally(() => setLoading(false));
  }, [courseId, challengeId]);

  if (loading) return <ChallengeDetailSkeleton />;
  if (error) return (
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <Link href={`/courses/${courseId}`} className="text-sm text-primary hover:underline">
          Back to course
        </Link>
      </div>
    </div>
  );
  if (!challenge) return null;

  const diffColor = challenge.difficulty === "hard" ? "text-red-500 bg-red-50" : challenge.difficulty === "medium" ? "text-amber-500 bg-amber-50" : "text-green-600 bg-green-100";
  const circumference = 2 * Math.PI * 42;
  const progressOffset = circumference * (1 - (challenge.progress || 0) / 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-secondary"
    >
      {/* Header Banner */}
      <section className="bg-bg-primary border-b border-bg-tertiary px-4 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="space-y-4 w-full lg:w-auto">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to course
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-bg-tertiary text-text-secondary px-3 py-1 rounded text-[11px] font-bold tracking-wider">
                {courseId.slice(0, 8)}...
              </span>
              <span className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase ${diffColor}`}>
                {challenge.difficulty}
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded text-[11px] font-bold tracking-wider">
                {formatEnum(challenge.type)}
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-normal tracking-tight text-text-primary">
              {challenge.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Bolt className="w-4 h-4" />
                <span>+{challenge.xpReward} XP</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <Clock className="w-4 h-4" />
                <span>{challenge.endsAt ? new Date(challenge.endsAt).toLocaleDateString() : "No due date"}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-medium">
                <Donut className="w-4 h-4" />
                <span>{challenge.progress || 0}% Complete</span>
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
            Submit for review
          </button>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex gap-6 lg:gap-8 border-b border-bg-tertiary overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "text-text-primary border-b-2 border-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div className="space-y-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Context</h3>
                <p className="text-text-primary text-base lg:text-lg leading-relaxed font-normal">
                  {challenge.description}
                </p>
              </div>

              {/* Objectives */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary">Objectives</h3>
                <div className="grid gap-3">
                  {challenge.criteria?.rules?.map((rule, idx) => {
                    const done = idx < Math.ceil(challenge.progress / 25);
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                          done ? "bg-bg-primary border-transparent" : "bg-bg-primary border-bg-tertiary"
                        } hover:border-primary/30 cursor-pointer`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          done ? "bg-primary" : "border-2 border-bg-tertiary"
                        }`}>
                          {done && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${done ? "text-text-primary" : "text-text-secondary"}`}>
                            {rule.type}: {rule.target} {rule.operator} {rule.value}
                          </p>
                          <p className="text-xs text-text-secondary mt-1">
                            {done ? "Completed" : "Pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Referenced Materials */}
              <div className="pt-8 border-t border-bg-tertiary space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary">Referenced Materials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-primary hover:bg-bg-tertiary cursor-pointer transition-colors border border-bg-tertiary">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium truncate text-text-primary">Course Materials.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-primary hover:bg-bg-tertiary cursor-pointer transition-colors border border-bg-tertiary">
                    <Database className="w-5 h-5 text-text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium truncate text-text-primary">Reference Guide</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Overview" && (
            <div className="py-16 text-center">
              <p className="text-text-muted text-sm">{activeTab} content coming soon.</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Card */}
          <div className="p-6 rounded-[20px] bg-bg-primary border border-bg-tertiary shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-text-primary">Challenge Progress</h4>
              <MoreHorizontal className="w-4 h-4 text-text-secondary cursor-pointer" />
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-bg-tertiary" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={progressOffset} strokeWidth="8" strokeLinecap="round"></circle>
                </svg>
                <span className="absolute text-2xl font-black text-text-primary">
                  {challenge.progress || 0}<span className="text-[10px] font-bold text-text-secondary">%</span>
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xl font-black text-text-primary leading-none">
                  {challenge.criteria?.rules?.filter((_, i) => i < Math.ceil(challenge.progress / 25)).length ?? 0} / {challenge.criteria?.rules?.length ?? 0}
                </p>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-tight">tasks completed</p>
                <p className="text-[11px] text-primary font-semibold pt-1 flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {challenge.status === "COMPLETED" ? "Completed" : challenge.status === "IN_PROGRESS" ? "In progress" : "Not started"}
                </p>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="p-6 rounded-[20px] bg-bg-primary border border-bg-tertiary space-y-6">
            <h4 className="text-sm font-bold text-text-primary">Rewards breakdown</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center shadow-sm">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">Base Completion</span>
                </div>
                <span className="text-xs font-black text-text-primary">+{challenge.xpReward} XP</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center shadow-sm">
                    <Award className="w-4 h-4 text-primary fill-primary" />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">Bonus Criteria</span>
                </div>
                <span className="text-xs font-black text-text-primary">+{Math.round(challenge.xpReward * 0.3)} XP</span>
              </div>
            </div>
            <div className="p-4 bg-bg-secondary rounded-xl flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center border-2 border-primary/20">
                  <Shield className="w-6 h-6 text-primary fill-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary text-[8px] font-black text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {challenge.attempts + 1}
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Attempts</p>
                <p className="text-xs font-bold text-text-primary">{challenge.attempts} attempt{challenge.attempts !== 1 ? "s" : ""}</p>
                <div className="h-1 w-full bg-bg-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Impacted Card */}
          <div className="p-6 rounded-[20px] bg-bg-primary border border-bg-tertiary shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-text-primary">Skills impacted</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: `${formatEnum(challenge.difficulty)} Difficulty`, color: "bg-primary" },
                { label: `${challenge.type} Challenge`, color: "bg-text-secondary" },
              ].map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary rounded-lg text-[10px] font-bold text-text-primary hover:bg-primary hover:text-white transition-colors cursor-default"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${skill.color} group-hover:bg-white`}></span>
                  {skill.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hint & Share */}
          <div className="flex items-center justify-center gap-4 py-4">
            <button className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
              <Headphones className="w-3 h-3" />
              Ask for hint
            </button>
            <div className="w-1 h-1 bg-bg-tertiary rounded-full"></div>
            <button className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
              <Share2 className="w-3 h-3" />
              Share challenge
            </button>
          </div>
        </div>
      </div>

      {/* Floating XP Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-text-primary text-white p-3 lg:p-4 rounded-2xl shadow-2xl flex items-center gap-3 lg:gap-4 border border-white/10 hover:-translate-y-1 transition-transform">
          <div className="text-center">
            <span className="block text-[8px] font-black uppercase tracking-[0.2em] opacity-50">XP Reward</span>
            <span className="text-xl lg:text-2xl font-black text-primary">+{challenge.xpReward}</span>
          </div>
          <div className="h-8 lg:h-10 w-px bg-white/10"></div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/70">Status</span>
            <span className="text-xs font-semibold text-white">{formatEnum(challenge.status)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
