"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitEmail } from "@/api/api";
import { AxiosError } from "axios";

export default function HomePage() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await submitEmail(email);
      return response;
    },
    onSuccess: (data) => {
      setSuccessMessage(data?.message || "Successfully joined the waitlist!");
      setErrorMessage("");
      setWaitlistEmail("");
    },

    // TODO : improve error handling with types
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
    <>
      <section className="hero-section flex flex-col items-center justify-center  px-4 text-white ">
        <p className="mb-5 bg-purple-900 p-2 rounded-4xl text-center">
          Coming soon!!!
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-center  bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent my-2">
          Turn Your Degree into a Game
        </h1>
        <p className="max-w-xl text-center text-lg text-zinc-400 my-2">
          Experience a new way to learn: track your progress, earn rewards, and
          level up your academic journey with AcadXP.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center flex-col justify-center md:flex-row gap-4 mt-6"
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
    </>
  );
}
