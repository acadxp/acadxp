"use client";

import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";

export default function ProductivityCockpit() {
  return (
    <section className="bg-[#f7f7f6] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#4F46E5] uppercase mb-4 block">
              Visualized Progress
            </span>
            <h2 className="text-4xl font-normal tracking-tighter text-[#111110] mb-6">
              The Productivity Cockpit
            </h2>
            <p className="text-[#6b6a65] leading-relaxed mb-8 text-lg">
              Experience data density designed for scholars. Structural
              gamification integrates XP bars, level counters, and streak
              numbers directly into your workflow. Every task completed is a
              step toward architectural mastery.
            </p>
            <div className="flex items-start gap-4">
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <BarChart3 className="text-[#4F46E5]" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#111110]">
                  Real-time XP Analytics
                </h4>
                <p className="text-sm text-[#6b6a65]">
                  Track your learning velocity with millisecond precision.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#a8a7a2] block mb-1">
                    Current Level
                  </span>
                  <span className="text-6xl font-black text-[#111110]">42</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#a8a7a2] block mb-1">
                    Academic Rank
                  </span>
                  <span className="text-lg font-bold text-[#4F46E5]">
                    Elite Scholar
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="w-full h-2.5 bg-[#f7f7f6] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-[#4F46E5]"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-medium text-[#a8a7a2] uppercase tracking-tighter">
                  <span>24,500 / 30,000 XP</span>
                  <span>78% To Level 43</span>
                </div>
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-[8px] font-bold text-[#e8e8e7] uppercase [writing-mode:vertical-lr]">
                Technical Specification • Protocol 042-XP
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
