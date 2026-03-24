"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { z } from "zod";
import { loginUser } from "@/lib/api";
import useAuthStore from "@/store/AuthStore";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setAccessToken, loading, setLoading, error, setAuthError } =
    useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setAuthError("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });

      setAuthError(null);
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push("/dashboard");
    } catch (error: any) {
      setAuthError(
        error.response?.data?.message || "An error occurred during login.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mb-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <div className="text-3xl font-bold text-center text-text-text-primary">
            Welcome Back
          </div>
        </div>
      </header>
      <main className="w-full max-w-[420px]">
        <div className="bg-primary-bg rounded-2xl p-8 md:p-10 border border-primary">
          <div className="mb-8">
            <h2 className="text-2xl font-normal tracking-tight text-text-primary text-editorial">
              Login
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Access your learning pathway.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className=" text-[10px] font-bold uppercase tracking-[0.3em] text-text-primary ml-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="your@email.com"
              required
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-text-primary ml-1">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] font-medium text-accent hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg  border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-primary/90 hover:bg-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className=" mt-3 ">
            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account?
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/start"
            className="block mt-1 text-center text-sm text-text-primary hover:text-primary transition-colors"
          >
            ← Back to start
          </Link>
        </div>
      </main>
      <div className="fixed bottom-8 right-8 hidden md:block">
        <div className="flex flex-col items-end opacity-20">
          <span className="text-4xl font-extrabold tracking-tighter text-text-primary">
            XP
          </span>
          <div className="w-16 h-1 bg-primary mt-1"></div>
        </div>
      </div>
    </>
  );
}
