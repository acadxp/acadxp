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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-purple-500/30 backdrop-blur-xl">
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
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-purple-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-purple-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}

            <p className="text-center text-sm text-purple-300">
              Do not have an account?{" "}
              <Link
                href="/signup"
                className="text-pink-400 hover:text-pink-300 font-semibold"
              >
                Sign up
              </Link>
            </p>

            <Link
              href="/start"
              className="block text-center text-sm text-purple-400 hover:text-purple-300"
            >
              ← Back to start
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
