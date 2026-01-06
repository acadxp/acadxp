"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { checkEmailAvailability } from "@/lib/api";
import { registerUser } from "@/lib/api";
import type { RegisterUserPayload } from "../../../types/user";
import useAuthStore from "@/store/AuthStore";
import { AxiosError } from "axios";

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
  const { setUser, setAccessToken, error, setAuthError, loading, setLoading } =
    useAuthStore();

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
    },
  });
  // Loading flags for async field checks
  const [checkingEmail, setCheckingEmail] = useState(false);

  const signupMutation = useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      return await registerUser(payload);
    },
    onSuccess: (data) => {
      setAuthError(null);
      setUser(data.user);
      setAccessToken(data.accessToken);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setAuthError(
        error.response?.data?.message || "An error occurred during signup."
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

    // Run client-side validation for current field
    const valid = await trigger(field);
    if (!valid) return;

    if (error) setAuthError(null);

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
      } catch (err: unknown) {
        const msg =
          err instanceof AxiosError
            ? err.response?.data?.message
            : "Could not verify email.";
        setError("email", {
          type: "manual",
          message: msg,
        });
        return;
      } finally {
        setCheckingEmail(false);
      }
    }

    // Advance only after passing all checks
    setStep((prev) => prev + 1);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((s) => Math.max(0, s - 1));

    if (error) {
      setAuthError(null);
    }
  };

  const onSubmit = (vals: FormValues) => {
    signupMutation.mutate({
      name: vals.name.trim(),
      email: vals.email.trim(),
      password: vals.password,
    });
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
            {step === 0 && "What's your name, Adventurer?"}
            {step === 1 && "Where should we send your XP updates?"}
            {step === 2 && "Create a secure password for your quest chest"}
            {step === 3 && "Ready to start your journey?"}
          </CardTitle>
          <p className="text-center text-sm text-zinc-400">
            {step === 0 && "Let's start your learning journey"}
            {step === 1 && "We'll send updates, never spam"}
            {step === 2 && "Keep your progress safe and secure"}
            {step === 3 && "Create your account and unlock Level 1!"}
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={step < 3 ? handleNext : handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <p className="text-xs text-violet-400 text-center">
              Step {step + 1} of 4
            </p>

            {step === 0 && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-violet-300"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
            )}

            {step === 1 && (
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
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            )}

            {step === 2 && (
              <>
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
                    {...register("password")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <p className="text-xs text-zinc-500">Min 8 characters.</p>
                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-violet-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-violet-500/30 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-violet-500/30 bg-zinc-900/40 p-4">
                  <h3 className="text-sm font-semibold text-violet-300 mb-3">
                    Review your details
                  </h3>
                  <dl className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-sm text-zinc-400">Name</dt>
                      <dd className="text-sm text-white">
                        {getValues("name")}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-sm text-zinc-400">Email</dt>
                      <dd className="text-sm text-white">
                        {getValues("email")}
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="text-xs text-zinc-500">
                  Password is kept secure and not shown here.
                </p>
              </div>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-6 border-violet-500/50 text-violet-300 hover:bg-violet-600/10 hover:text-white transition-all"
                  onClick={handleBack}
                  disabled={loading || checkingEmail}
                >
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg font-bold bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                  disabled={loading || checkingEmail}
                >
                  {checkingEmail ? "Checking..." : "Next"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1 py-6 text-lg font-bold bg-violet-600 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              )}
            </div>

            <p className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Login
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
