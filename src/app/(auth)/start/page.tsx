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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center">
      {/* Pixel art background effects */}
      {/* <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-10 left-10 w-16 h-16 bg-purple-500 animate-float"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <div
          className="absolute top-20 right-20 w-12 h-12 bg-cyan-400 animate-float-delayed"
          style={{
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-fuchsia-500 animate-float-slow"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        <div
          className="absolute bottom-32 right-1/3 w-14 h-14 bg-yellow-400 animate-float"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        />
      </div> */}

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Glowing particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-particle"
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
      <div className="relative z-10 flex flex-col items-center justify-center  space-y-12 px-4 py-8">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-50 animate-pulse" />
          <Link href="/">
            <Image
              src="/assets/img/acadxp-logo.png"
              alt="AcadXP Logo"
              width={150}
              height={150}
              className="relative rounded-3xl shadow-2xl shadow-purple-500/50 pixel-render"
            />
          </Link>
        </div>

        {!showAuthButtons ? (
          // Initial state: Press Start
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <p className="text-2xl text-purple-300 text-center animate-blink pixel-text">
              PRESS START
            </p>

            <Button
              pixelated
              variant="success"
              size="lg"
              onClick={handleStart}
              className=" text-lg font-bold rounded-xl shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 pixel-border animate-pulse-glow pixel-text"
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
                  className="w-full text-md font-bold  rounded-xl shadow-lg shadow-cyan-500/50 transform hover:scale-105 transition-all duration-200 pixel-border pixel-text"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup" className="w-full max-w-xs">
                <Button
                  variant="primary"
                  className="w-full  text-md font-bold  rounded-xl shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 pixel-border pixel-text"
                >
                  Signup
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setShowAuthButtons(false)}
              className="mt-6 flex items-center hover:pointer-cursor text-purple-300 hover:text-white transition-colors pixel-text text-sm"
            >
              <ChevronsLeft className="inline-block mr-1" />
              Back
            </button>
          </div>
        )}

        {/* Retro credits */}
        <p className="text-white/50 text-sm mt-20 text-center pixel-text ">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://dripcodestudio.com/"
            target="_blank"
            className="underline"
          >
            DripCode Studio
          </a>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
}
