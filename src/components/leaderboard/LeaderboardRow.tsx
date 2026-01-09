"use client";

import Link from "next/link";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
} from "lucide-react";
import {
  LeaderboardUser,
  getAvatarColors,
  getInitials,
} from "@/types/leaderboard";

interface LeaderboardRowProps {
  user: LeaderboardUser;
}

export function LeaderboardRow({ user }: LeaderboardRowProps) {
  const getRankChange = () => {
    const diff = user.previousRank - user.rank;
    if (diff > 0)
      return {
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
      };
    if (diff < 0)
      return { icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" };
    return { icon: Minus, color: "text-zinc-500", bg: "bg-zinc-500/10" };
  };

  const rankChange = getRankChange();
  const RankIcon = rankChange.icon;

  return (
    <Link href={`/profile/${user.id}`}>
      <div className="group flex items-center gap-4 p-4 bg-black/20 border border-zinc-800 rounded-xl hover:border-violet-500/30 hover:bg-black/40 transition-all cursor-pointer">
        {/* Rank */}
        <div className="w-12 text-center">
          <span className="text-xl font-bold text-zinc-400 group-hover:text-violet-400 transition-colors">
            {user.rank}
          </span>
        </div>

        {/* Rank Change */}
        <div
          className={`w-8 h-8 rounded-full ${rankChange.bg} flex items-center justify-center`}
        >
          <RankIcon className={`h-4 w-4 ${rankChange.color}`} />
        </div>

        {/* Avatar */}
        <div
          className={`relative w-10 h-10 rounded-full border border-zinc-700 overflow-hidden group-hover:border-violet-500/50 transition-colors ${getAvatarColors(
            user.rank
          )} flex items-center justify-center`}
        >
          <span className="text-sm font-bold">{getInitials(user.name)}</span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate group-hover:text-violet-300 transition-colors">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500 truncate">@{user.username}</p>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-violet-400">{user.level}</p>
            <p className="text-xs text-zinc-500">Level</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-orange-400">{user.streak}</p>
            <p className="text-xs text-zinc-500">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-emerald-400">
              {user.coursesCompleted}
            </p>
            <p className="text-xs text-zinc-500">Courses</p>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="text-amber-400 font-semibold text-sm">
            {user.xp.toLocaleString()}
          </span>
        </div>

        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-violet-400 transition-colors" />
      </div>
    </Link>
  );
}
