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
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/80 border-violet-500/30 backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-white">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-violet-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-violet-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <p className="text-center text-sm text-zinc-400">
              Do not have an account?{" "}
              <Link
                href="/signup"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>

            <Link
              href="/start"
              className="block text-center text-sm text-zinc-500 hover:text-violet-400 transition-colors"
            >
              ← Back to start
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
