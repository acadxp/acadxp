import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  Trophy,
  Settings,
  GraduationCap,
  Zap,
  Shield,
  Target,
  BarChart2,
  BarChart3,
  Bell,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ErrorWithResponse {
  response?: { data?: { message?: string } };
}

export const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null) {
    const errObj = error as ErrorWithResponse;
    return errObj.response?.data?.message;
  }
  return undefined;
};

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: GraduationCap, label: "My Courses", href: "/courses" },
  { icon: Trophy, label: "Challenges", href: "/challenges" },
  { icon: Zap, label: "Skills", href: "/skills" },
  { icon: Shield, label: "Badges", href: "/badges" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
