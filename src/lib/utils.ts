import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
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
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const maskApiKey = (key: string): string => {
  if (key.length <= 8) return key;
  return `${key.slice(0, 8)}••••••••${key.slice(-4)}`;
};

export const getApiKeyStatus = ({
  isActive,
  expiresAt,
}: {
  isActive: boolean;
  expiresAt?: string | null;
}): { label: string; color: string } => {
  if (!isActive) return { label: "Revoked", color: "text-red-500 bg-red-50" };
  if (expiresAt && new Date(expiresAt) < new Date())
    return { label: "Expired", color: "text-amber-600 bg-amber-50" };
  return { label: "Active", color: "text-emerald-600 bg-emerald-50" };
};

export const formatLastUsed = (lastUsedAt: string | null): string => {
  if (!lastUsedAt) return "Never";
  const diff = Date.now() - new Date(lastUsedAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(lastUsedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const generateApiKeyName = (): string => {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  return `API Key - ${month} ${year}`;
};
