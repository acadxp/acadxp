"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Zap, BookOpen, Loader2 } from "lucide-react";
import useCourseStore from "@/store/CourseStore";
import { courseService } from "@/services/course.service";
import { formatEnum } from "@/components/courses/course-utils";
import { CourseDetailSkeleton } from "@/components/courses/course-detail-skeleton";
import { CourseDetailError } from "@/components/courses/course-detail-error";
import { motion } from "motion/react";
import type { StudentCourseEnrollment } from "@/types";

const tabs = ["Overview", "Skills"];

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { currentCourse: course, loading, error, fetchCourseById } = useCourseStore();
  const [activeTab, setActiveTab] = useState("Overview");
  const [enrollment, setEnrollment] = useState<StudentCourseEnrollment | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchCourseById(id);
    courseService.getEnrollments().then((res) => {
      const list: StudentCourseEnrollment[] = res.data.data ?? [];
      const match = list.find((e) => e.courseId === id);
      setEnrollment(match ?? null);
    }).catch(() => {});
  }, [id, fetchCourseById]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const { data } = await courseService.enroll(id);
      setEnrollment(data.data!);
    } catch {
      // ignore
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    setEnrolling(true);
    try {
      await courseService.unenroll(id);
      setEnrollment(null);
    } catch {
      // ignore
    } finally {
      setEnrolling(false);
    }
  };

  const isEnrolled = !!enrollment;

  if (loading || (!course && !error)) return <CourseDetailSkeleton />;
  if (error) return <CourseDetailError message={error} />;
  if (!course) return null;

  const circumference = 2 * Math.PI * 58;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-secondary"
    >
      {/* Hero Banner */}
      <section className="bg-text-primary text-white py-12 px-4 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {formatEnum(course.department)}
            </span>
            <span className="text-white/60 text-xs font-medium">{course.courseCode}</span>
          </div>
          <div className="flex justify-between items-start flex-col lg:flex-row gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[32px] font-semibold tracking-tight leading-tight mb-3">
                {course.title}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                {course.description || "No description available."}
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Total XP</p>
                  <p className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    {course.xp.toLocaleString()}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Status</p>
                  <p className="text-lg font-medium tracking-tight">{formatEnum(course.status)}</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Created</p>
                  <p className="text-lg font-medium tracking-tight">{new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="max-w-6xl mx-auto px-4 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-[65%_35%] gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="flex gap-8 border-b border-bg-tertiary">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <section className="space-y-10">
              <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Course Mastery</h3>
                  <span className="text-xs font-medium text-primary">Total: {course.xp.toLocaleString()} XP</span>
                </div>
                <div className="w-full h-3 bg-bg-tertiary rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-primary w-0 rounded-full"></div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {isEnrolled ? "You are enrolled. Complete challenges to earn XP and track your progress." : "Enroll in this course to start earning XP and track your progress."}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-text-primary flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  About this course
                </h3>
                <div className="text-text-secondary leading-relaxed space-y-4 text-sm">
                  <p>{course.description || "No description provided."}</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === "Skills" && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium text-text-primary">Course Skills</h3>
              </div>
              <p className="text-sm text-text-muted">Skills will be available once the course blueprint is generated.</p>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-bg-primary p-8 rounded-xl border border-bg-tertiary text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-bg-tertiary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={isEnrolled ? circumference * 0.3 : circumference} strokeWidth="8" strokeLinecap="round"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold tracking-tighter">
                  {isEnrolled ? `${enrollment!.xpEarned}` : "0%"}
                </span>
                <span className="text-[10px] uppercase font-bold text-text-muted">
                  {isEnrolled ? "XP EARNED" : "Progress"}
                </span>
              </div>
            </div>
            <h4 className="font-medium text-sm mb-1 text-text-primary">
              {isEnrolled ? "Enrolled" : "Not Enrolled"}
            </h4>
            <p className="text-xs text-text-muted mb-6">
              {isEnrolled ? "You are enrolled in this course." : "Enroll to start tracking your progress."}
            </p>
            {enrolling ? (
              <button disabled className="w-full py-2.5 rounded-xl bg-primary/50 text-white text-sm font-bold flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEnrolled ? "Unenrolling..." : "Enrolling..."}
              </button>
            ) : isEnrolled ? (
              <button onClick={handleUnenroll} className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 active:scale-95 transition-all">
                Unenroll
              </button>
            ) : (
              <button onClick={handleEnroll} className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                Enroll Now
              </button>
            )}
          </div>

          <div className="bg-bg-primary p-6 rounded-xl border border-bg-tertiary">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-text-secondary">Course Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Code</span>
                <span className="text-sm font-medium text-text-primary">{course.courseCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Department</span>
                <span className="text-sm font-medium text-text-primary">{formatEnum(course.department)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Status</span>
                <span className="text-sm font-medium text-primary">{formatEnum(course.status)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Created</span>
                <span className="text-sm font-medium text-text-primary">{new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Updated</span>
                <span className="text-sm font-medium text-text-primary">{new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
