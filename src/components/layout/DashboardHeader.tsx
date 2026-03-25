"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useAuthStore from "@/store/AuthStore";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Map,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
  Zap,
} from "lucide-react";
import { logoutUser } from "@/lib/api";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/lib/utils";

const userLinks = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const isActive = (href: string) => pathname === href;

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard Overview";
      case "/courses":
        return "Courses";
      case "/leaderboard":
        return "Leaderboard";
      case "/profile":
        return "Profile";
      case "/settings":
        return "Settings";
      default:
        // Also handle dynamic routes if starting with
        if (pathname?.startsWith("/courses/")) return "Course Details";
        return "Dashboard Overview";
    }
  };

  const pageTitle = getPageTitle();

  return (
    <>
      <header className="h-16 border-b border-bg-tertiary bg-bg-primary sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-10">
          <h2 className="text-lg font-black tracking-tight truncate hidden sm:block max-w-[200px] lg:max-w-none">
            {pageTitle}
          </h2>
          <nav className="hidden md:flex gap-4 lg:gap-8 h-16">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm flex items-center transition-colors ${
                  isActive(link.href)
                    ? "font-bold text-primary border-b-2 border-primary"
                    : "font-medium text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden lg:block relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search XP components..."
              className="bg-bg-secondary border-none rounded-xl text-xs pl-10 pr-4 py-2.5 w-64 focus:ring-1 focus:ring-primary outline-none transition-all text-text-primary placeholder:text-text-muted"
            />
          </div>
          <div className="flex items-center gap-1 md:gap-2 relative">
            <button className="relative p-2 text-primary hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              {
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-700 border-2 border-red-700 rounded-full"></span>
              }
            </button>

            <button className="hidden sm:block p-2 text-primary hover:text-primary transition-colors">
              <Zap className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);

                setMobileMenuOpen(false);
              }}
              className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-bg-tertiary cursor-pointer block"
            >
              <img
                src="https://picsum.photos/seed/alex/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* User Dropdown */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-bg-tertiary bg-bg-primary shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-bg-tertiary">
                    <p className="text-sm font-medium text-text-primary">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <div className="py-2">
                    {userLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setUserMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-300 ${
                          isActive(link.href)
                            ? "bg-bg-secondary text-text-primary"
                            : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                        }`}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-bg-tertiary py-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logoutUser();
                        router.push("/login");
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-1">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setUserMenuOpen(false);
              }}
              className="p-2 text-text-muted hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu user={user} onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
