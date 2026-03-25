"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
          className="text-center bg-[#f7f7f6] py-24 px-8 rounded-[2rem] relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tighter text-[#111110] mb-8">
              Ready to level up?
            </h2>
            <p className="text-[#6b6a65] text-lg mb-12 max-w-xl mx-auto">
              Join the elite cohort of students architecting their future. Start
              your first challenge in less than 60 seconds.
            </p>
            <Link
              href="/start"
              className="px-12 py-5 bg-[#4F46E5] text-white rounded-xl font-bold text-lg hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
            >
              Join AcadXP Today
            </Link>
          </div>

          {/* Abstract architectural accents */}
          <div className="absolute top-0 right-0 w-48 h-48 border-t-2 border-r-2 border-[#111110]/5 -mr-6 -mt-6"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 border-b-2 border-l-2 border-[#111110]/5 -ml-6 -mb-6"></div>
        </motion.div>
      </div>
    </section>
  );
}
