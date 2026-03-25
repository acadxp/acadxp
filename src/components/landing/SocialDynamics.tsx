"use client";

import { motion } from "motion/react";

export default function SocialDynamics() {
  return (
    <section className="py-32 bg-[#f7f7f6]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 max-w-md mx-auto">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8a7a2] mb-8">
                Global Leaderboard
              </h4>
              <div className="space-y-2">
                {[
                  {
                    rank: "01",
                    name: "Alex Rivera",
                    xp: "124,502 XP",
                    active: true,
                  },
                  {
                    rank: "02",
                    name: "Sofia Chen",
                    xp: "122,190 XP",
                    active: false,
                  },
                  {
                    rank: "03",
                    name: "Marcus Thorne",
                    xp: "118,400 XP",
                    active: false,
                  },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      user.active
                        ? "bg-indigo-50 border-l-4 border-[#4F46E5]"
                        : "hover:bg-[#f7f7f6]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-bold w-4 ${user.active ? "text-[#4F46E5]" : "text-[#a8a7a2]"}`}
                      >
                        {user.rank}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#f0efec] overflow-hidden">
                        <img
                          src={`https://i.pravatar.cc/150?u=${user.name}`}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span
                        className={`text-sm font-semibold ${user.active ? "text-[#111110]" : "text-[#6b6a65]"}`}
                      >
                        {user.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold ${user.active ? "text-[#4F46E5]" : "text-[#a8a7a2]"}`}
                    >
                      {user.xp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#4F46E5] uppercase mb-4 block">
              Social Dynamics
            </span>
            <h2 className="text-4xl font-normal tracking-tighter text-[#111110] mb-6">
              Compete and Conquer
            </h2>
            <p className="text-[#6b6a65] leading-relaxed mb-10 text-lg">
              Join the elite cohort. Compete in seasonal challenges, climb the
              global leaderboard, and conquer academic milestones alongside the
              world's most ambitious students.
            </p>
            <div className="flex gap-10">
              <div className="border-l border-black/10 pl-6">
                <span className="text-3xl font-bold block text-[#111110]">
                  14,202
                </span>
                <span className="text-[10px] uppercase font-bold text-[#a8a7a2] tracking-widest">
                  Daily Competitors
                </span>
              </div>
              <div className="border-l border-black/10 pl-6">
                <span className="text-3xl font-bold block text-[#111110]">
                  128
                </span>
                <span className="text-[10px] uppercase font-bold text-[#a8a7a2] tracking-widest">
                  Active Challenges
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
