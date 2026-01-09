"use client";

import Link from "next/link";
import { Crown, Zap } from "lucide-react";
import {
  LeaderboardUser,
  getAvatarColors,
  getInitials,
} from "@/types/leaderboard";

interface PodiumStairsProps {
  users: LeaderboardUser[];
}

const getMedalStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        border: "border-amber-400",
        bg: "from-amber-400 to-yellow-500",
        shadow: "shadow-amber-500/50",
        medal: "🥇",
        glow: "from-amber-500/30 to-yellow-500/30",
      };
    case 2:
      return {
        border: "border-slate-300",
        bg: "from-slate-300 to-slate-400",
        shadow: "shadow-slate-400/50",
        medal: "🥈",
        glow: "from-slate-400/30 to-slate-500/30",
      };
    case 3:
      return {
        border: "border-amber-600",
        bg: "from-amber-600 to-amber-700",
        shadow: "shadow-amber-700/50",
        medal: "🥉",
        glow: "from-amber-600/30 to-amber-700/30",
      };
    default:
      return {
        border: "border-zinc-500",
        bg: "from-zinc-500 to-zinc-600",
        shadow: "shadow-zinc-600/50",
        medal: "",
        glow: "from-zinc-500/30 to-zinc-600/30",
      };
  }
};

function PodiumCard({
  user,
  height,
}: {
  user: LeaderboardUser;
  height: string;
}) {
  const styles = getMedalStyles(user.rank);
  const isFirst = user.rank === 1;

  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex flex-col items-center group"
    >
      {/* Avatar with Medal */}
      <div className="relative mb-3">
        {/* Glow effect */}
        <div
          className={`absolute -inset-3 bg-gradient-to-br ${styles.glow} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Crown for 1st place */}
        {isFirst && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
            <Crown className="h-8 w-8 text-amber-400 drop-shadow-lg" />
          </div>
        )}

        {/* Avatar */}
        <div
          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 ${
            styles.border
          } overflow-hidden shadow-lg ${
            styles.shadow
          } group-hover:scale-110 transition-transform duration-300 ${getAvatarColors(
            user.rank
          )} flex items-center justify-center`}
        >
          <span className="text-2xl md:text-3xl font-bold">
            {getInitials(user.name)}
          </span>
        </div>

        {/* Medal Badge */}
        <div
          className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${styles.bg} flex items-center justify-center text-xl shadow-lg ${styles.shadow}`}
        >
          {styles.medal}
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-3">
        <p className="font-bold text-white group-hover:text-violet-300 transition-colors">
          {user.name}
        </p>
        <p className="text-sm text-zinc-400">@{user.username}</p>
      </div>

      {/* XP Badge */}
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4">
        <Zap className="h-4 w-4 text-amber-400" />
        <span className="text-amber-400 font-bold text-sm">
          {user.xp.toLocaleString()} XP
        </span>
      </div>

      {/* Podium Step */}
      <div
        className={`w-28 md:w-36 ${height} rounded-t-xl bg-gradient-to-b ${
          isFirst
            ? "from-amber-500/30 to-amber-600/50 border-amber-500/50"
            : user.rank === 2
            ? "from-slate-400/30 to-slate-500/50 border-slate-400/50"
            : "from-amber-700/30 to-amber-800/50 border-amber-700/50"
        } border-t border-x backdrop-blur-sm flex items-center justify-center relative overflow-hidden group-hover:brightness-125 transition-all`}
      >
        {/* Step number */}
        <span
          className={`text-5xl md:text-6xl font-black ${
            isFirst
              ? "text-amber-400/30"
              : user.rank === 2
              ? "text-slate-400/30"
              : "text-amber-700/30"
          }`}
        >
          {user.rank}
        </span>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Link>
  );
}

export function PodiumStairs({ users }: PodiumStairsProps) {
  const [first, second, third] = [users[0], users[1], users[2]];

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4 mb-12">
      {/* 2nd Place - Left */}
      <PodiumCard user={second} height="h-28 md:h-36" />

      {/* 1st Place - Center (Tallest) */}
      <PodiumCard user={first} height="h-36 md:h-48" />

      {/* 3rd Place - Right */}
      <PodiumCard user={third} height="h-24 md:h-28" />
    </div>
  );
}
