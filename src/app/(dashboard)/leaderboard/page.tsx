"use client";

import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <>
      <div className="min-h-screen text-white p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Trophy size={32} className="text-yellow-400" />
          Leaderboard
        </h1>
        <p className="text-gray-400 mb-8">
          See how you stack up against other users in our leaderboard!
        </p>
      </div>
    </>
  );
}
