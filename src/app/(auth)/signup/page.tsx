"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const signupMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = await registerUser(payload);
      return response;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: any) => {
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });

  const fields: (keyof FormValues)[] = [
    "name",
    "email",
    "password",
    "confirmPassword",
  ];

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const field = fields[step];
    const valid = await trigger(field);
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = (vals: FormValues) => {
    signupMutation.mutate({
      name: vals.name.trim(),
      email: vals.email.trim(),
      password: vals.password,
    });
  };

  const isLoading = signupMutation.isPending;
  const apiError = signupMutation.error as Error | undefined;

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
            {step === 0 && "What's your name, Adventurer?"}
            {step === 1 && "Where should we send your XP updates?"}
            {step === 2 && "Create a secure password for your quest chest"}
            {step === 3 && "Choose a public handle — your academy tag"}
            {step === 4 && "Ready to start your journey?"}
          </CardTitle>
          <p className="text-center text-sm text-purple-200/80">
            {step === 0 && "Let's start your learning journey"}
            {step === 1 && "We'll send updates, never spam"}
            {step === 2 && "Keep your progress safe and secure"}
            {step === 3 && "This will be your unique identifier"}
            {step === 4 && "Create your account and unlock Level 1!"}
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={step < 3 ? handleNext : handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <p className="text-xs text-purple-300 text-center">
              Step {step + 1} of 4
            </p>

            {step === 0 && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-purple-200"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-sm text-pink-300">{errors.name.message}</p>
                )}
              </div>
            )}

            {step === 1 && (
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
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-pink-300">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
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
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <p className="text-xs text-purple-300">Min 8 characters.</p>
                {errors.password && (
                  <p className="text-sm text-pink-300">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-purple-200"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-pink-300">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {apiError && (
              <p className="text-sm text-pink-300">{apiError.message}</p>
            )}

            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-purple-500/50 text-purple-200"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  disabled={isLoading}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </Button>
              )}
            </div>

            <p className="text-center text-sm text-purple-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-pink-400 hover:text-pink-300 font-semibold"
              >
                Login
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
