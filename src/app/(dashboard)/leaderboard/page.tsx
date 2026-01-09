"use client";

import Link from "next/link";
import {
  Trophy,
  Medal,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Star,
  Flame,
  Target,
  Users,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  rank: number;
  previousRank: number;
  name: string;
  username: string;
  xp: number;
  level: number;
  coursesCompleted: number;
  streak: number;
}

// Get avatar colors based on rank
const getAvatarColors = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-br from-amber-400 to-yellow-600 text-amber-900";
    case 2:
      return "bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900";
    case 3:
      return "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100";
    case 4:
      return "bg-gradient-to-br from-violet-500 to-purple-700 text-white";
    case 5:
      return "bg-gradient-to-br from-pink-500 to-rose-700 text-white";
    case 6:
      return "bg-gradient-to-br from-blue-500 to-indigo-700 text-white";
    case 7:
      return "bg-gradient-to-br from-emerald-500 to-green-700 text-white";
    case 8:
      return "bg-gradient-to-br from-cyan-500 to-teal-700 text-white";
    case 9:
      return "bg-gradient-to-br from-orange-500 to-red-700 text-white";
    case 10:
      return "bg-gradient-to-br from-fuchsia-500 to-purple-700 text-white";
    default:
      return "bg-gradient-to-br from-zinc-500 to-zinc-700 text-white";
  }
};

// Get user initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

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

// Podium Component for Top 3
function PodiumStairs() {
  const top3 = leaderboardData.slice(0, 3);
  const [first, second, third] = [top3[0], top3[1], top3[2]];

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

  const PodiumCard = ({
    user,
    height,
    position,
  }: {
    user: LeaderboardUser;
    height: string;
    position: "left" | "center" | "right";
  }) => {
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
  };

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4 mb-12">
      {/* 2nd Place - Left */}
      <PodiumCard user={second} height="h-28 md:h-36" position="left" />

      {/* 1st Place - Center (Tallest) */}
      <PodiumCard user={first} height="h-36 md:h-48" position="center" />

      {/* 3rd Place - Right */}
      <PodiumCard user={third} height="h-24 md:h-28" position="right" />
    </div>
  );
}

// Runner Up Card (4th and 5th position)
function RunnerUpCard({ user }: { user: LeaderboardUser }) {
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

// Leaderboard Table Row
function LeaderboardRow({ user }: { user: LeaderboardUser }) {
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

export default function LeaderboardPage() {
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

            <PodiumStairs />

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
