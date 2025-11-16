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
import {
  registerUser,
  checkEmailAvailability,
  checkUsernameAvailability,
} from "@/lib/api";
import type { RegisterUserPayload } from "../../../types/user";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    username: z.string().min(3, "Username must be at least 3 characters"),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [apiError, setApiError] = useState<null | { message: string }>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });
  // Loading flags for async field checks
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const signupMutation = useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      const response = await registerUser(payload);
      return response;
    },
    onSuccess: (data) => {
      router.push("/dashboard");
      console.log("Signup successful:", data);
    },
    onError: (error: any) => {
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      setApiError({
        message: error.response?.data?.message || "Signup failed.",
      });
    },
  });

  const isLoading = signupMutation.isPending;

  const fields: (keyof FormValues)[] = [
    "name",
    "email",
    "password",
    "confirmPassword",
    "username",
  ];

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const field = fields[step];

    // Run client-side validation for current field
    const valid = await trigger(field);
    if (!valid) return;

    if (apiError) setApiError(null);

    // Email uniqueness check on step 1
    if (step === 1) {
      const email = getValues("email").trim();
      if (!email) return; // safety guard
      setCheckingEmail(true);
      try {
        const available = await checkEmailAvailability(email);
        if (!available) {
          setError("email", {
            type: "manual",
            message: "Email is already in use.",
          });
          return;
        } else {
          clearErrors("email");
        }
      } catch (err: any) {
        setError("email", {
          type: "manual",
          message: err?.message || "Could not verify email.",
        });
        return;
      } finally {
        setCheckingEmail(false);
      }
    }

    // Username uniqueness check on step 3
    if (step === 3) {
      const username = getValues("username").trim();
      if (!username) return; // safety guard
      setCheckingUsername(true);
      try {
        const available = await checkUsernameAvailability(username);
        if (!available) {
          setError("username", {
            type: "manual",
            message: "Username is taken.",
          });
          return;
        } else {
          clearErrors("username");
        }
      } catch (err: any) {
        setError("username", {
          type: "manual",
          message: err?.message || "Could not verify username.",
        });
        return;
      } finally {
        setCheckingUsername(false);
      }
    }

    // Advance only after passing all checks
    setStep((prev) => prev + 1);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((s) => Math.max(0, s - 1));

    if (apiError) {
      setApiError(null);
    }
  };

  const onSubmit = (vals: FormValues) => {
    signupMutation.mutate({
      name: vals.name.trim(),
      email: vals.email.trim(),
      password: vals.password,
      username: vals.username.trim(),
    });
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
            onSubmit={step < 4 ? handleNext : handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <p className="text-xs text-purple-300 text-center">
              Step {step + 1} of 5
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
              <>
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
              </>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-purple-200"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your username"
                  autoComplete="username"
                />
                <p className="text-sm text-white/70">
                  https://acadxp.vercel.app/@{getValues("username")}
                </p>
                {errors.username && (
                  <p className="text-sm text-pink-300">
                    {errors.username.message}
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
                  className="flex-1 py-6 border-purple-500/50 text-purple-200"
                  onClick={handleBack}
                  disabled={isLoading || checkingEmail || checkingUsername}
                >
                  Back
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  disabled={isLoading || checkingEmail || checkingUsername}
                >
                  {checkingEmail || checkingUsername ? "Checking..." : "Next"}
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
