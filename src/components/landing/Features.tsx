"use client";

import {
  Gamepad2,
  BarChart3,
  Trophy,
  BookOpen,
  TrendingUp,
  Target,
  Bell,
  Users,
  Zap,
  Medal,
} from "lucide-react";
import { Feature } from "@/types/feature";
import { MainFeatureCard } from "@/components/cards/MainFeatureCard";
import { SecondaryFeatureCard } from "@/components/cards/SecondaryFeatureCard";

// Main featured features (4 large cards)
const mainFeatures: Feature[] = [
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description:
      "Turn your studies into an epic adventure with XP, levels, and achievements",
    image: "/assets/img/feature-gamified.png",
  },
  {
    icon: Zap,
    title: "AI Challenge Generator",
    description:
      "Generate personalized challenges and quizzes based on your courses",
    image: "/assets/img/feature-ai-challenges.png",
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Get insights into your learning patterns and productivity",
    image: "/assets/img/feature-analytics.png",
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description:
      "Unlock badges and rewards as you complete academic milestones",
    image: "/assets/img/feature-achievements.png",
  },
];

// Secondary features (6 smaller cards - no images)
const secondaryFeatures: Feature[] = [
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your academic journey with intuitive dashboards",
    image: "/assets/img/feature-progress.png",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Organize and track all your courses in one place",
    image: "/assets/img/feature-courses.png",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and achieve academic goals with progress tracking",
    image: "/assets/img/feature-goals.png",
  },
  {
    icon: Bell,
    title: "Reminders & Notifications",
    description: "Stay on top of deadlines and important dates",
    image: "/assets/img/feature-notifications.png",
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Connect with fellow students and share your achievements",
    image: "/assets/img/feature-community.png",
  },
  {
    icon: Medal,
    title: "Skill Generator with Badges",
    description:
      "Earn skill badges by mastering topics and demonstrate your expertise",
    image: "/assets/img/feature-skills.png",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-10 sm:py-15 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">
            Epic Features
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto">
            Everything you need to transform your academic journey into an
            unforgettable adventure
          </p>
        </div>

        {/* Main Features Grid (4 large cards) */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {mainFeatures.map((feature, index) => (
              <MainFeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>

        {/* Secondary Features Grid (6 small cards) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <SecondaryFeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
