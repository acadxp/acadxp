"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { profileService } from "@/services/profile.service";
import { courseService } from "@/services/course.service";
import { motion } from "motion/react";
import {
  MapPin, Calendar, Github, Linkedin, ExternalLink,
  Terminal, Brain, TrendingUp, Award, CheckCircle,
  FileText, Zap, ChevronRight, BookOpen, Users,
  Flame, Layout, Star, Link as LinkIcon, Loader2,
} from "lucide-react";
import type { Profile, StudentCourseEnrollment, StudentBadge, StudentSkill } from "@/types";
import Link from "next/link";

const IconMap: Record<string, any> = {
  terminal: Terminal, brain: Brain, "trending-up": TrendingUp,
  award: Award, "check-circle": CheckCircle, "file-text": FileText,
  zap: Zap, "book-open": BookOpen, users: Users, flame: Flame,
  layout: Layout, star: Star,
};

const STATIC_BADGES: { icon: string; name: string; color: string }[] = [
  { icon: "zap", name: "Speed Demon", color: "bg-amber-100 text-amber-600" },
  { icon: "brain", name: "Scholar", color: "bg-indigo-100 text-indigo-600" },
  { icon: "trending-up", name: "Rising Star", color: "bg-emerald-100 text-emerald-600" },
  { icon: "flame", name: "Streak Master", color: "bg-orange-100 text-orange-600" },
  { icon: "star", name: "Top Performer", color: "bg-yellow-100 text-yellow-600" },
  { icon: "book-open", name: "Bookworm", color: "bg-cyan-100 text-cyan-600" },
  { icon: "users", name: "Collaborator", color: "bg-purple-100 text-purple-600" },
  { icon: "award", name: "Champion", color: "bg-rose-100 text-rose-600" },
  { icon: "check-circle", name: "Completionist", color: "bg-teal-100 text-teal-600" },
];

const STATIC_SKILLS: { id: string; name: string; level: string; xp: number; percentile: string }[] = [
  { id: "1", name: "Machine Learning", level: "Master", xp: 12500, percentile: "Top 5%" },
  { id: "2", name: "React Development", level: "Advanced", xp: 8400, percentile: "Top 15%" },
  { id: "3", name: "System Design", level: "Advanced", xp: 7200, percentile: "Top 20%" },
  { id: "4", name: "Data Structures", level: "Master", xp: 11000, percentile: "Top 8%" },
  { id: "5", name: "Cloud Architecture", level: "Intermediate", xp: 4800, percentile: "Top 30%" },
  { id: "6", name: "UI/UX Design", level: "Intermediate", xp: 3600, percentile: "Top 40%" },
];

const STATIC_ACTIVITIES: { id: string; icon: string; color: string; title: string; subtitle: string; timestamp: string; type: string }[] = [
  { id: "1", icon: "check-circle", color: "bg-emerald-500", title: "Completed", subtitle: "ML Fundamentals", timestamp: "2 hours ago", type: "completion" },
  { id: "2", icon: "zap", color: "bg-amber-500", title: "Earned 450 XP from", subtitle: "Neural Networks Quiz", timestamp: "Yesterday", type: "xp" },
  { id: "3", icon: "award", color: "bg-purple-500", title: "Unlocked badge:", subtitle: "Speed Demon", timestamp: "3 days ago", type: "badge" },
  { id: "4", icon: "trending-up", color: "bg-indigo-500", title: "Leveled up to", subtitle: "Level 24", timestamp: "1 week ago", type: "level" },
  { id: "5", icon: "file-text", color: "bg-sky-500", title: "Submitted", subtitle: "System Design Project", timestamp: "1 week ago", type: "submission" },
];

const difficultyColors: Record<string, string> = {
  Master: "bg-emerald-100 text-emerald-700",
  Advanced: "bg-primary/10 text-primary",
  Intermediate: "bg-amber-100 text-amber-700",
};

const courseColors = [
  "bg-indigo-100 text-indigo-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-cyan-100 text-cyan-600",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getProgress(enrollment: StudentCourseEnrollment, totalXp: number) {
  if (!totalXp) return 0;
  return Math.min(Math.round((enrollment.xpEarned / totalXp) * 100), 100);
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<StudentCourseEnrollment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, enrollRes] = await Promise.all([
          profileService.getProfile(),
          courseService.getEnrollments(),
        ]);
        setProfile(profileRes.data.data?.profile ?? null);
        setEnrollments(enrollRes.data.data ?? []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const acadInfo = profile?.academicInfo;
  const totalXp = acadInfo?.xp ?? 0;
  const level = acadInfo?.level ?? 1;
  const badgeCount = acadInfo?.badges?.length ?? STATIC_BADGES.length;
  const completedCount = acadInfo?.courses?.filter((e: StudentCourseEnrollment) => e.completedStatus).length ?? 0;
  const courseEnrollments = enrollments.length > 0 ? enrollments : (acadInfo?.courses ?? []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 pb-24 md:pb-12 bg-bg-secondary"
    >
      {/* Header Section */}
      <section className="w-full bg-primary py-12 px-6 md:px-12 relative text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white/20">
            {getInitials(user?.name ?? "User")}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{user?.name ?? "User"}</h1>
              <span className="text-white/70 font-medium">@{profile?.username ?? "username"}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-white/90 mb-4">
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Award size={14} className="fill-current" />
                Level {level}
              </span>
              {profile?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {profile.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-white/60">
                <Calendar size={14} />
                Joined {new Date(profile?.createdAt ?? Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
            <p className="text-lg text-white/90 max-w-2xl font-light italic leading-relaxed">
              &ldquo;{profile?.bio ?? "No bio yet. Tell the world about your learning journey."}&rdquo;
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 self-center md:self-end">
            <Link
              href="/settings"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
            >
              Edit profile
            </Link>
            <div className="flex gap-4">
              {profile?.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
              )}
              {profile?.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
              {profile?.socials?.website && (
                <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="max-w-6xl mx-auto -mt-8 px-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total XP", value: totalXp.toLocaleString() },
            { label: "Current Level", value: String(level) },
            { label: "Badges Earned", value: String(badgeCount) },
            { label: "Completed", value: String(completedCount) },
          ].map((stat, i) => (
            <div key={i} className="bg-bg-primary p-6 rounded-xl shadow-sm border border-bg-tertiary">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body Two-Column */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:w-3/5 space-y-12">
            {/* In-Progress Courses */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-text-primary">In-Progress Courses</h2>
                <Link href="/courses" className="text-primary font-bold text-sm hover:underline">
                  View all &rarr;
                </Link>
              </div>
              <div className="space-y-4">
                {courseEnrollments.length === 0 ? (
                  <p className="text-text-muted text-sm">No courses enrolled yet.</p>
                ) : (
                  courseEnrollments.map((enrollment, i) => {
                    const Icon = IconMap[enrollment.course?.title?.toLowerCase().includes("ml") ? "brain" : "terminal"] || Terminal;
                    const progress = enrollment.course ? getProgress(enrollment, enrollment.course.xp) : 0;
                    return (
                      <Link
                        key={enrollment.id}
                        href={`/courses/${enrollment.courseId}`}
                        className="bg-bg-primary p-5 rounded-xl flex gap-5 items-center hover:bg-bg-secondary transition-colors group cursor-pointer border border-bg-tertiary"
                      >
                        <div className={`w-16 h-16 rounded-lg ${courseColors[i % courseColors.length]} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={32} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-text-primary mb-1 truncate">{enrollment.course?.title ?? "Course"}</h3>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-bg-tertiary h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-text-secondary">{progress}%</span>
                          </div>
                        </div>
                        <ChevronRight className="text-text-muted group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Activity</h2>
              <div className="space-y-6 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-bg-tertiary">
                {STATIC_ACTIVITIES.map((activity) => {
                  const Icon = IconMap[activity.icon] || CheckCircle;
                  return (
                    <div key={activity.id} className="flex gap-4 relative">
                      <div className={`w-6 h-6 rounded-full ${activity.color} text-white flex items-center justify-center z-10`}>
                        <Icon size={14} className={activity.type === "completion" ? "fill-current" : ""} />
                      </div>
                      <div className="flex-1">
                        <p className="text-text-primary font-medium">
                          {activity.title} <span className="text-primary font-bold">{activity.subtitle}</span>
                        </p>
                        <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-2/5 space-y-12">
            {/* Achievement Badges */}
            <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary">
              <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Award size={20} className="text-primary" />
                Achievement Badges
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(acadInfo?.badges && acadInfo.badges.length > 0 ? acadInfo.badges : STATIC_BADGES).map((badge: any, i: number) => {
                  const title = badge.badge?.title ?? badge.name ?? "Badge";
                  const iconName = badge.badge?.icon ?? badge.icon ?? "zap";
                  const color = badge.color ?? "bg-primary/10 text-primary";
                  const Icon = IconMap[iconName] || Zap;
                  return (
                    <div key={badge.badgeId ?? badge.id ?? i} className="flex flex-col items-center text-center gap-2">
                      <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center border-4 border-white shadow-sm`}>
                        <Icon size={32} className={color.split(" ")[1] ?? "text-primary"} />
                      </div>
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter">{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expertise Focus */}
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-6">Expertise Focus</h2>
              <div className="space-y-4">
                {(acadInfo?.studentSkills && acadInfo.studentSkills.length > 0 ? acadInfo.studentSkills : STATIC_SKILLS).map((skill: any) => {
                  const name = skill.skill?.name ?? skill.name ?? "Skill";
                  const level = skill.level ?? "Intermediate";
                  const xp = skill.xpEarned ?? skill.xp ?? 0;
                  const pct = skill.percentile ?? `Top ${Math.max(10, 100 - Math.round(xp / 100))}%`;
                  return (
                    <div key={skill.skillId ?? skill.id} className="bg-bg-primary p-4 rounded-xl border border-bg-tertiary hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-text-primary">{name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${difficultyColors[level] ?? difficultyColors["Intermediate"]}`}>
                          {level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>{xp.toLocaleString()} XP earned</span>
                        <span className="font-bold text-primary">{pct}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
