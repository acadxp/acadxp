"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { useCourseStore } from "@/stores/course.store";
import { EnrolledCourseCard } from "@/components/courses/enrolled-course-card";
import { CoursesGridSkeleton } from "@/components/courses/courses-grid-skeleton";
import { CoursesEmptyState } from "@/components/courses/courses-empty-state";
import { motion, AnimatePresence } from "motion/react";

const tabs = ["All", "In Progress", "Completed"];

export default function CoursesPage() {
  const { enrollments, isLoading, fetchEnrollments } = useCourseStore();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const filtered = enrollments.filter((e) => {
    const matchesSearch =
      e.course.title.toLowerCase().includes(search.toLowerCase()) ||
      e.course.courseCode.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "All") return true;
    if (activeTab === "In Progress") return !e.completedStatus;
    if (activeTab === "Completed") return e.completedStatus;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href="/dashboard">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Courses</Breadcrumbs.Item>
        </Breadcrumbs.Root>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-text-primary">My Courses</h1>
            <p className="text-text-secondary text-sm mt-1">
              Managing your academic journey and professional certifications.
            </p>
          </div>
          <Link
            href="/courses/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add course
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6 border-b border-bg-tertiary">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "text-text-primary border-b-2 border-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
                {tab === "All" && ` (${enrollments.length})`}
                {tab === "In Progress" && ` (${enrollments.filter((e) => !e.completedStatus).length})`}
                {tab === "Completed" && ` (${enrollments.filter((e) => e.completedStatus).length})`}
              </button>
            ))}
          </div>
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-bg-tertiary bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {isLoading && <CoursesGridSkeleton />}
        {!isLoading && filtered.length === 0 && (
          <CoursesEmptyState
            hasSearch={search.length > 0}
            hasCourses={enrollments.length > 0}
            filterTab={activeTab}
          />
        )}

        {!isLoading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((enrollment) => (
                <motion.div
                  key={enrollment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <EnrolledCourseCard enrollment={enrollment} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
