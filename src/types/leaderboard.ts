export interface LeaderboardUser {
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
export const getAvatarColors = (rank: number) => {
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
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
