"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center px-3 py-1 bg-[#f7f7f6] rounded-full text-[10px] font-bold tracking-widest uppercase text-[#6b6a65] mb-8">
          v2.0 Architectural Update
        </div>
        <h1 className="text-5xl md:text-7xl font-normal tracking-[-0.04em] text-[#111110] leading-[1.1] mb-8 text-balance">
          Architect Your <br className="hidden md:block" /> Academic Journey.
        </h1>
        <p className="max-w-2xl mx-auto text-[#6b6a65] text-lg md:text-xl leading-relaxed mb-12">
          A premium productivity platform that turns learning into a high-stakes
          adventure. No fluff. Just data-driven mastery.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/start"
            className="w-full sm:w-auto px-8 py-4 bg-[#4F46E5] text-white rounded-lg font-bold text-base hover:bg-[#4338ca] transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            Get Started Free
          </Link>
          <button
            disabled={true}
            title="Demo comming soon"
            className="w-full sm:w-auto px-8 py-4 bg-[#f7f7f6] text-[#111110] rounded-lg font-bold text-base hover:bg-[#f0efec] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-not-allowed shadow-sm"
          >
            <Play size={16} fill="currentColor" /> Watch the Demo
          </button>
        </div>

        <div className="relative max-w-5xl mx-auto bg-[#f7f7f6] p-2 rounded-2xl shadow-2xl overflow-hidden group">
          <Image
            src="/assets/img/hero-bg.png"
            alt="AcadXP Dashboard"
            width={1200}
            height={800}
            className="w-full rounded-xl object-cover aspect-video grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </div>
      </motion.div>
    </section>
  );
}
