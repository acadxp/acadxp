"use client";

import {
  Trophy,
  Medal,
  Zap,
  Target,
  Users,
  Award,
  Sparkles,
  Flame,
} from "lucide-react";
import { LeaderboardUser } from "@/types/leaderboard";
import {
  PodiumStairs,
  RunnerUpCard,
  LeaderboardRow,
} from "@/components/leaderboard";

// Static leaderboard data
const leaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    rank: 1,
    previousRank: 1,
    name: "Alexandra Chen",
    username: "alex_legend",
    xp: 48500,
    level: 42,
    coursesCompleted: 28,
    streak: 156,
  },
  {
    id: "2",
    rank: 2,
    previousRank: 3,
    name: "Marcus Williams",
    username: "marcus_w",
    xp: 45200,
    level: 40,
    coursesCompleted: 25,
    streak: 89,
  },
  {
    id: "3",
    rank: 3,
    previousRank: 2,
    name: "Sofia Rodriguez",
    username: "sofia_coder",
    xp: 42800,
    level: 38,
    coursesCompleted: 24,
    streak: 134,
  },
  {
    id: "4",
    rank: 4,
    previousRank: 5,
    name: "James Anderson",
    username: "james_pro",
    xp: 39100,
    level: 35,
    coursesCompleted: 21,
    streak: 67,
  },
  {
    id: "5",
    rank: 5,
    previousRank: 4,
    name: "Emily Parker",
    username: "emily_dev",
    xp: 37800,
    level: 34,
    coursesCompleted: 20,
    streak: 45,
  },
  {
    id: "6",
    rank: 6,
    previousRank: 6,
    name: "David Kim",
    username: "david_k",
    xp: 35200,
    level: 32,
    coursesCompleted: 19,
    streak: 78,
  },
  {
    id: "7",
    rank: 7,
    previousRank: 9,
    name: "Luna Martinez",
    username: "luna_star",
    xp: 33400,
    level: 30,
    coursesCompleted: 18,
    streak: 56,
  },
  {
    id: "8",
    rank: 8,
    previousRank: 7,
    name: "Ryan Thompson",
    username: "ryan_t",
    xp: 31800,
    level: 29,
    coursesCompleted: 17,
    streak: 34,
  },
  {
    id: "9",
    rank: 9,
    previousRank: 10,
    name: "Ava Wilson",
    username: "ava_w",
    xp: 29500,
    level: 27,
    coursesCompleted: 16,
    streak: 23,
  },
  {
    id: "10",
    rank: 10,
    previousRank: 8,
    name: "Noah Brown",
    username: "noah_coder",
    xp: 28100,
    level: 26,
    coursesCompleted: 15,
    streak: 41,
  },
  {
    id: "11",
    rank: 11,
    previousRank: 12,
    name: "Mia Johnson",
    username: "mia_j",
    xp: 26700,
    level: 25,
    coursesCompleted: 14,
    streak: 19,
  },
  {
    id: "12",
    rank: 12,
    previousRank: 11,
    name: "Ethan Davis",
    username: "ethan_d",
    xp: 25300,
    level: 24,
    coursesCompleted: 13,
    streak: 28,
  },
];

export default function LeaderboardPage() {
  const top3 = leaderboardData.slice(0, 3);
  const runnersUp = leaderboardData.slice(3, 5);
  const remaining = leaderboardData.slice(5);

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
              <Trophy className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent mb-3">
            Leaderboard
          </h1>
          <p className="text-zinc-400 text-lg">
            Compete with fellow adventurers and claim your glory! 🏆
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-black/40 border border-violet-500/20 rounded-xl p-4 backdrop-blur-sm text-center">
            <Users className="h-6 w-6 text-violet-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {leaderboardData.length}
            </p>
            <p className="text-xs text-zinc-400">Total Adventurers</p>
          </div>
          <div className="bg-black/40 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm text-center">
            <Zap className="h-6 w-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {leaderboardData
                .reduce((sum, u) => sum + u.xp, 0)
                .toLocaleString()}
            </p>
            <p className="text-xs text-zinc-400">Total XP Earned</p>
          </div>
          <div className="bg-black/40 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm text-center">
            <Award className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {leaderboardData.reduce((sum, u) => sum + u.coursesCompleted, 0)}
            </p>
            <p className="text-xs text-zinc-400">Quests Completed</p>
          </div>
        </div>

        {/* Podium Section */}
        <div className="relative mb-10">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-amber-500/10 rounded-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-3xl" />

          <div className="relative bg-black/30 border border-violet-500/20 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Champions Arena</h2>
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>

            <PodiumStairs users={top3} />

            {/* Floor line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent rounded-full" />
          </div>
        </div>

        {/* Runners Up (4th & 5th) */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
              <Medal className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Rising Stars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {runnersUp.map((user) => (
              <RunnerUpCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Remaining Leaderboard */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-zinc-500/20 to-zinc-600/20 border border-zinc-500/30">
              <Target className="h-5 w-5 text-zinc-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Adventurers</h2>
          </div>

          <div className="space-y-3">
            {remaining.map((user) => (
              <LeaderboardRow key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Your Position Banner */}
        <div className="mt-10 relative overflow-hidden bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 border border-violet-500/30 rounded-2xl p-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                ?
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  Your Position Awaits!
                </p>
                <p className="text-zinc-400 text-sm">
                  Complete quests and climb the ranks to glory
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30">
              <Flame className="h-5 w-5 text-orange-400" />
              <span className="text-violet-300 font-medium">
                Start your journey today!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
