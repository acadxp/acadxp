"use client";

import { motion } from "motion/react";
import { Zap, ChevronRight, Award } from "lucide-react";

export default function AICourseGeneration() {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-normal tracking-tight text-[#111110] mb-4">
            AI Course Generation
          </h2>
          <p className="text-[#6b6a65] max-w-2xl mx-auto text-lg">
            Rapidly architect your curriculum. Generate blueprints, challenges,
            and badges with our multi-step AI flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#f7f7f6] rounded-2xl p-10 flex flex-col justify-between"
          >
            <div className="max-w-sm">
              <h3 className="text-2xl font-semibold mb-4 text-[#111110]">
                Learning Blueprints
              </h3>
              <p className="text-[#6b6a65]">
                Transform any topic into a structured course with AI-driven
                sequencing and milestone mapping.
              </p>
            </div>
            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-black/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center">
                  <Zap size={14} className="text-white fill-current" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#111110]">
                  Generating Curriculum...
                </span>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-[#f7f7f6] rounded"></div>
                <div className="h-2 w-3/4 bg-[#f7f7f6] rounded"></div>
                <div className="h-2 w-1/2 bg-[#f7f7f6] rounded"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#4F46E5] rounded-2xl p-10 text-white flex flex-col justify-between overflow-hidden relative"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-4">Dynamic Badges</h3>
              <p className="text-white/70 text-sm">
                AI-generated achievement tokens for every milestone reached.
              </p>
            </div>
            <div className="mt-8 flex justify-center relative z-10">
              <Award
                size={120}
                strokeWidth={1}
                className="text-white/20 absolute -bottom-10 -right-10"
              />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Award size={96} strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#f3f4f3] rounded-2xl p-10"
          >
            <h3 className="text-xl font-bold mb-4 text-[#111110]">
              Challenges
            </h3>
            <p className="text-sm text-[#6b6a65] mb-8">
              Procedurally generated assessments that test true mastery.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg shadow-sm text-xs font-semibold text-[#111110] flex justify-between items-center">
                Quantative Analysis II
                <ChevronRight size={14} className="text-[#a8a7a2]" />
              </div>
              <div className="p-4 bg-white/50 rounded-lg text-xs font-semibold text-[#6b6a65] flex justify-between items-center">
                Neural Logic Basics
                <ChevronRight size={14} className="text-[#a8a7a2]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111110] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center gap-12 overflow-hidden"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">Skill Radar</h3>
              <p className="text-sm text-white/60 mb-8">
                Visualize your cognitive growth across six dimensions of
                academic performance.
              </p>
              <button className="px-6 py-3 bg-white text-[#111110] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors">
                View Progress
              </button>
            </div>
            <div className="flex-1 flex justify-center relative">
              <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/40"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-white/10 rotate-45"></div>
                  <div className="w-full h-[1px] bg-white/10 -rotate-45"></div>
                  <div className="h-full w-[1px] bg-white/10"></div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute bg-[#4F46E5] w-3 h-3 rounded-full top-10 right-10 ring-4 ring-indigo-500/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
