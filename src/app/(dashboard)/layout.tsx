"use client";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Footer from "@/components/layout/Footer";
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/utils";
import useAuthStore from "@/store/AuthStore";
import { refreshToken } from "@/lib/api";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Sidebar from "@/components/layout/Sidebar";

function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-bg-primary border-t border-bg-tertiary flex items-center justify-around px-2 py-2 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all",
              isActive
                ? "text-primary"
                : "text-text-muted hover:text-text-secondary hover:bg-bg-secondary",
            )}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
    setAuthError,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      // If we already have a valid token, no need to refresh
      if (accessToken && user) {
        setLoading(false);
        setIsInitialized(true);
        return;
      }

      // Try to refresh the token (uses httpOnly cookie)
      try {
        const { data } = await refreshToken();
        setAccessToken(data.accessToken);
        setUser(data.user);
        setAuthError(null);
        setIsInitialized(true);
      } catch (err) {
        // Refresh failed - no valid session, redirect to login
        setAuthError("Session expired. Please log in again.");
        router.replace("/start");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Show skeleton while initializing auth
  if (!isInitialized) {
    return <DashboardSkeleton />;
  }

  return (
    <html lang="en">
      <head>
        {/* Favicon and manifest links */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/img/favicon_io/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/img/favicon_io/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/img/favicon_io/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/assets/img/favicon_io/android-chrome-512x512.png"
        />
      </head>
      <body>
        <div className="flex bg-white min-h-screen">
          <Sidebar />
          <div className="flex-1 lg:ml-64 bg-white relative pb-20 lg:pb-0 min-w-0 flex flex-col">
            <DashboardHeader />
            {children}
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
