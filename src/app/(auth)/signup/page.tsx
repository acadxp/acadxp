"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { checkEmailAvailability, registerUser } from "@/lib/api";
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
  const { setUser, setAccessToken, error, setAuthError, loading } =
    useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
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
        error.response?.data?.message || "An error occurred during signup.",
      );
    },
  });

  // Email uniqueness check on blur
  const handleEmailBlur = async () => {
    const email = getValues("email").trim();
    if (!email) return;
    try {
      const available = await checkEmailAvailability(email);
      if (!available) {
        setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
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
    <div className="w-full flex items-center justify-center min-h-screen bg-primary-bg p-4">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary text-editorial">
              Create your account
            </h1>
            <p className="text-text-secondary text-sm">
              Join the elite workspace for architectural learning.
            </p>
          </div>
        </div>
        <div className="bg-primary-bg p-10 rounded-2xl space-y-8 border border-primary">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg  border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg  border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="name@company.com"
                autoComplete="email"
                onBlur={handleEmailBlur}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg  border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <p className="text-xs text-zinc-500 mt-1">Min 8 characters.</p>
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 rounded-lg  border border-primary text-text-primary placeholder-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            <Button
              className="mt-4 w-full cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline decoration-2 underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 py-8 opacity-40">
          <div className="h-[1px] w-12 bg-text-muted"></div>
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary">
            Security Level 01
          </div>
          <div className="h-[1px] w-12 bg-text-muted"></div>
        </div>
      </div>
    </div>
  );
}
