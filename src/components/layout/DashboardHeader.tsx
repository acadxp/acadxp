"use client";

import Image from "next/image";
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
} from "lucide-react";
import { logoutUser } from "@/lib/api";
import NotificationModal, { Notification } from "./NotificationModal";
import NotificationDropdown from "./NotificationDropdown";
import MobileMenu from "./MobileMenu";
import XPProgressBar, { XPData } from "./XPProgressBar";

// Default XP data (will come from backend/user state)
const defaultXPData: XPData = {
  currentXP: 0,
  level: 1,
  xpInCurrentLevel: 0,
  xpNeededForNextLevel: 100,
  progress: 0,
};

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: "New Achievement Unlocked!",
    message: "Congratulations! You've completed your first course module.",
    content:
      "You've successfully completed the 'Introduction to Programming' module. This achievement marks an important milestone in your learning journey. Keep up the great work and continue exploring new topics to unlock more achievements!",
    time: "5 min ago",
    read: false,
    type: "achievement",
  },
  {
    id: 2,
    title: "Weekly Challenge Available",
    message: "A new coding challenge is waiting for you.",
    content:
      "This week's challenge focuses on algorithm optimization. You'll need to solve 3 problems within the time limit to earn bonus XP. The challenge covers sorting algorithms, dynamic programming, and graph traversal. Complete it before Sunday to maximize your rewards!",
    time: "1 hour ago",
    read: false,
    type: "challenge",
  },
  {
    id: 3,
    title: "Course Update",
    message: "New content has been added to your enrolled course.",
    content:
      "The 'Advanced JavaScript' course has been updated with 5 new lessons covering ES2024 features, async patterns, and performance optimization techniques. Check out the new material to stay up-to-date with the latest JavaScript developments.",
    time: "2 hours ago",
    read: true,
    type: "update",
  },
  {
    id: 4,
    title: "Leaderboard Update",
    message: "You've moved up 3 positions on the leaderboard!",
    content:
      "Great progress! Your consistent effort has paid off. You're now ranked #15 on the weekly leaderboard. Keep completing courses and challenges to climb even higher. The top 10 students will receive special rewards at the end of the month!",
    time: "1 day ago",
    read: true,
    type: "leaderboard",
  },
];

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

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const { user } = useAuthStore();

  const isActive = (href: string) => pathname === href;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-violet-500/30 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src="/assets/img/acadxp-logo.png"
                alt="AcadXP"
                width={48}
                height={48}
                className="rounded-xl"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive(link.href)
                      ? "bg-violet-600/20 text-white border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "text-zinc-400 hover:text-white hover:bg-violet-600/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {/* XP Progress */}
              <XPProgressBar data={defaultXPData} compact />

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUserMenuOpen(false);
                  }}
                  className="relative p-2 rounded-lg hover:bg-violet-600/10 transition-all duration-300 cursor-pointer"
                >
                  <Bell className="w-5 h-5 text-zinc-400 hover:text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-fuchsia-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <NotificationDropdown
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onNotificationClick={handleNotificationClick}
                    onClose={() => setNotificationsOpen(false)}
                  />
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-violet-600/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-zinc-400 hidden lg:block">
                    {user?.name || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-violet-400 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-violet-500/30 bg-black/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-violet-500/20">
                        <p className="text-sm font-medium text-white">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
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
                                ? "bg-violet-600/20 text-white"
                                : "text-zinc-400 hover:bg-violet-600/10 hover:text-white"
                            }`}
                          >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-violet-500/20 py-2">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logoutUser();
                            router.push("/login");
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile XP Progress */}
              <XPProgressBar data={defaultXPData} compact />

              {/* Mobile Notifications */}
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setMobileMenuOpen(false);
                }}
                className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-violet-600/10 transition-all duration-300 cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-fuchsia-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setNotificationsOpen(false);
                }}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-violet-600/10 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu user={user} onClose={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Notifications Dropdown */}
        {notificationsOpen && (
          <NotificationDropdown
            notifications={notifications}
            unreadCount={unreadCount}
            onNotificationClick={handleNotificationClick}
            onClose={() => setNotificationsOpen(false)}
            isMobile
          />
        )}
      </header>

      {/* Notification Modal - Outside header to avoid stacking context issues */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={closeModal}
        />
      )}
    </>
  );
}
