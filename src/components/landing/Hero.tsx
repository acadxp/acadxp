"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-section relative max-h-screen flex flex-col items-center justify-center px-4 py-20 text-white overflow-hidden">
      {/* Content container with subtle backdrop */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-6xl press-start-2p-regular text-center mb-4 drop-shadow-lg">
          Turn Your Degree into a Game
        </h1>

        <p className="max-w-2xl text-center text-3xl sm:text-xl text-white/90 mb-8 drop-shadow-md leading-relaxed">
          Experience a new way to learn: track your progress, earn rewards, and
          level up your academic journey with AcadXP.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/start">
            <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-violet-500/50 flex items-center gap-2 group">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <a
            href="#about"
            className="px-8 py-4 border-2 border-white/60 hover:border-white text-white font-bold text-lg rounded-lg transition-all duration-200 hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
