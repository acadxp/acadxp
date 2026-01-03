"use client";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Footer from "@/components/layout/Footer";
import DashboardSkeleton from "@/components/layout/DashboardSkeleton";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/AuthStore";
import { refreshToken } from "@/lib/api";
import { useEffect, useState } from "react";

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
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []); // Only run once on mount

  // Show skeleton while initializing auth
  if (!isInitialized) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <DashboardHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
