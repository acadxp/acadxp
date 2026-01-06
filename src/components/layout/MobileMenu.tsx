"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Map,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/lib/api";
import XPProgressBar, { XPData } from "./XPProgressBar";

// Default XP data (will come from backend/user state)
const defaultXPData: XPData = {
  currentXP: 0,
  level: 1,
  xpInCurrentLevel: 0,
  xpNeededForNextLevel: 100,
  progress: 0,
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/roadmap", label: "Roadmap", icon: Map },
];

const userLinks = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface MobileMenuProps {
  user: {
    name?: string;
    email?: string;
  } | null;
  onClose: () => void;
}

export default function MobileMenu({ user, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    onClose();
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="md:hidden border-t border-violet-500/20 bg-black/95 backdrop-blur-xl">
      {/* User Info */}
      <div className="px-4 py-4 border-b border-violet-500/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-zinc-500">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="px-2 py-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive(link.href)
                ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                : "text-zinc-400 active:text-white active:bg-violet-600/10 active:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User Links */}
      <div className="px-2 py-3 border-t border-violet-500/20 space-y-1">
        {userLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive(link.href)
                ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                : "text-zinc-400 active:text-white active:bg-violet-600/10 active:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            }`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
