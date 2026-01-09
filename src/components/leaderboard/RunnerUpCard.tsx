"use client";

import Link from "next/link";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Flame,
  ChevronRight,
} from "lucide-react";
import {
  LeaderboardUser,
  getAvatarColors,
  getInitials,
} from "@/types/leaderboard";

interface RunnerUpCardProps {
  user: LeaderboardUser;
}

export function RunnerUpCard({ user }: RunnerUpCardProps) {
  const getRankChange = () => {
    const diff = user.previousRank - user.rank;
    if (diff > 0)
      return {
        icon: TrendingUp,
        color: "text-emerald-400",
        text: `+${diff}`,
      };
    if (diff < 0)
      return {
        icon: TrendingDown,
        color: "text-red-400",
        text: `${diff}`,
      };
    return { icon: Minus, color: "text-zinc-400", text: "0" };
  };

  const rankChange = getRankChange();
  const RankIcon = rankChange.icon;

  return (
    <Link href={`/profile/${user.id}`} className="group">
      <div className="relative">
        {/* Hover glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-300" />

        <div className="relative bg-black/40 border border-violet-500/20 rounded-2xl p-5 backdrop-blur-xl hover:border-violet-500/40 transition-all group-hover:scale-[1.02]">
          <div className="flex items-center gap-4">
            {/* Rank */}
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-violet-400">
                #{user.rank}
              </span>
              <div className={`flex items-center gap-1 ${rankChange.color}`}>
                <RankIcon className="h-3 w-3" />
                <span className="text-xs font-medium">{rankChange.text}</span>
              </div>
            </div>

            {/* Avatar */}
            <div
              className={`relative w-16 h-16 rounded-full border-2 border-violet-500/40 overflow-hidden group-hover:border-violet-400 transition-colors ${getAvatarColors(
                user.rank
              )} flex items-center justify-center`}
            >
              <span className="text-xl font-bold">
                {getInitials(user.name)}
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-violet-300 transition-colors">
                {user.name}
              </p>
              <p className="text-sm text-zinc-400">@{user.username}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Star className="h-3 w-3 text-violet-400" />
                  Level {user.level}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-400">
                  <Flame className="h-3 w-3 text-orange-400" />
                  {user.streak} day streak
                </span>
              </div>
            </div>

            {/* XP */}
            <div className="text-right">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-amber-400 font-bold">
                  {user.xp.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {user.coursesCompleted} courses
              </p>
            </div>

            <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-violet-400 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
