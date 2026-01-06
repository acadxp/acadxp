"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import { Button } from "@acadxp/xpui";

export default function StartPage() {
  const [showAuthButtons, setShowAuthButtons] = useState(false);

  const handleStart = () => {
    setShowAuthButtons(true);
  };

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Glowing particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-4 py-8">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 blur-3xl opacity-50 animate-pulse" />
          <Link href="/">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={150}
              height={150}
              className="relative rounded-3xl shadow-2xl shadow-violet-500/50 pixel-render"
            />
          </Link>
        </div>

        {!showAuthButtons ? (
          // Initial state: Press Start
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <p className="text-2xl text-violet-300 text-center animate-blink pixel-text">
              PRESS START
            </p>

            <Button
              pixelated
              variant="success"
              size="lg"
              onClick={handleStart}
              className="text-lg font-bold rounded-xl !shadow-lg !shadow-green-500/50 transform hover:scale-105 hover:!shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-200 pixel-border animate-pulse-glow pixel-text"
            >
              START
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6 animate-slide-up">
            <h2 className="text-md md:text-4xl font-bold text-white pixel-text mb-4">
              Choose Your Path
            </h2>

            <div className="my-3 flex flex-col gap-5 md:flex-row">
              <Link href="/login" className="w-full max-w-xs">
                <Button
                  variant="primary"
                  className="w-full text-md font-bold rounded-xl !shadow-lg !shadow-blue-500/50 transform hover:scale-105 hover:!shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-200 pixel-border pixel-text"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup" className="w-full max-w-xs">
                <Button
                  variant="primary"
                  className="w-full text-md font-bold rounded-xl !shadow-lg !shadow-blue-500/50 transform hover:scale-105 hover:!shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-200 pixel-border pixel-text"
                >
                  Signup
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setShowAuthButtons(false)}
              className="mt-6 flex items-center cursor-pointer text-zinc-400 hover:text-violet-400 transition-colors pixel-text text-sm"
            >
              <ChevronsLeft className="inline-block mr-1" />
              Back
            </button>
          </div>
        )}
      </div>

      {/* Retro credits */}
      <p className="text-zinc-500 text-sm text-center pixel-text fixed bottom-4 left-0 right-0 z-10">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://dripcodestudio.com/"
          target="_blank"
          className="underline hover:text-violet-400 transition-colors"
        >
          DripCode Studio
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}
