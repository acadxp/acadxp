"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitEmail } from "@/lib/api";
import Link from "next/link";

const Hero = () => {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await submitEmail(email);
      return response;
    },
    onSuccess: (data) => {
      setSuccessMessage(data?.message);
      setErrorMessage("");
      setWaitlistEmail("");
    },
    onError: () => {
      setErrorMessage("Failed to join the waitlist. Please try again.");
      setSuccessMessage("");
    },
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (waitlistEmail.trim() === "") {
      setErrorMessage("Email address cannot be empty.");
      return;
    }

    if (!validateEmail(waitlistEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    emailMutation.mutate(waitlistEmail);
  };

  return (
    <section className="hero-section max-h-screen  flex flex-col items-center justify-center px-4 py-20 text-white">
      <h1 className="text-4xl press-start-2p-regular sm:text-6xl font-bold text-center my-2">
        Turn Your Degree into a Game
      </h1>
      <p className="max-w-xl text-center text-xl text-white my-2">
        Experience a new way to learn: track your progress, earn rewards, and
        level up your academic journey with AcadXP.
      </p>

      {/* Waitlist Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center flex-col justify-center md:flex-row gap-4 mt-12"
      >
        <input
          type="email"
          id="waitlist-email"
          placeholder="Email Address"
          value={waitlistEmail}
          onChange={(e) => setWaitlistEmail(e.target.value)}
          className="border shadow-[0_0_20px_rgba(168,85,247,0.5)] rounded-lg px-4 py-3 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white border-zinc-700 text-black"
        />
        <button
          type="submit"
          disabled={emailMutation.isPending}
          className="inline-flex align-middle px-8 py-4 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          {emailMutation.isPending ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>
      <div className="mt-3">
        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
