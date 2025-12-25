"use client";

import { Sparkles, Target, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-10 sm:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">
            About AcadXP
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the way students experience education by
            transforming academic learning into an engaging, game-like
            adventure.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Text content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Level Up Your Education
            </h3>
            <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
              AcadXP transforms your academic journey into an epic adventure.
              Instead of traditional learning, earn XP for completing
              assignments, unlock badges for mastering topics, and climb
              leaderboards with your peers.
            </p>
            <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
              We believe that learning should be as exciting as leveling up in
              your favorite game. With personalized AI-generated challenges,
              progress tracking, and community features, education becomes
              engaging and rewarding.
            </p>

            {/* Key points */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-violet-600/20 text-violet-400 flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    Gamified Learning Experience
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Turn studying into an exciting adventure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-violet-600/20 text-violet-400 flex-shrink-0 mt-1">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    AI-Powered Challenges
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Personalized quizzes and challenges based on your courses
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-violet-600/20 text-violet-400 flex-shrink-0 mt-1">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Community Driven</h4>
                  <p className="text-sm text-zinc-400">
                    Connect with thousands of students on their learning journey
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-violet-600/20 text-violet-400 flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Skill Recognition</h4>
                  <p className="text-sm text-zinc-400">
                    Earn badges that showcase your expertise
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats showcase */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-950/40 to-slate-900/40 border border-violet-500/20 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Transform education from a chore into an adventure. We envision
                a world where students are excited to learn, where progress is
                celebrated, and where education is as engaging as the games they
                love to play.
              </p>
            </div>

            <div className="bg-gradient-to-br from-violet-950/40 to-slate-900/40 border border-violet-500/20 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Why Choose AcadXP?
              </h3>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                  Innovative gamification system
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                  AI-powered personalization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                  Real-time progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                  Supportive community
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
                  Always improving
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
