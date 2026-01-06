"use client";

import { Zap, Star, ChevronUp } from "lucide-react";
import { useState } from "react";

// Level titles mapping
const LEVEL_TITLES: Record<number, string> = {
  1: "Novice",
  2: "Apprentice",
  3: "Student",
  4: "Scholar",
  5: "Adept",
  6: "Expert",
  7: "Specialist",
  8: "Master",
  9: "Grandmaster",
  10: "Sage",
  11: "Virtuoso",
  12: "Legend",
  13: "Mythic",
};

export interface XPData {
  currentXP: number;
  level: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  progress: number; // 0-100 percentage
}

interface XPProgressBarProps {
  data: XPData;
  compact?: boolean;
}

function getLevelTitle(level: number): string {
  return LEVEL_TITLES[level] || "Mythic+";
}

export default function XPProgressBar({
  data,
  compact = false,
}: XPProgressBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div className="relative">
        {/* Compact Badge - Clickable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
        >
          {/* Level Badge */}
          <div className="flex items-center gap-1.5">
            <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-violet-600 shadow-lg shadow-violet-500/30">
              <span className="text-[10px] sm:text-xs font-bold text-white">
                {data.level}
              </span>
            </div>
            <span className="text-[10px] sm:text-sm font-semibold text-violet-300">
              Level {data.level}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-violet-500/30 hidden sm:block" />

          {/* XP Display */}
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fuchsia-400" />
            <span className="text-xs sm:text-sm font-semibold text-violet-300">
              {data.currentXP.toLocaleString()}
            </span>
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 sm:w-64 p-3 sm:p-4 rounded-xl border border-violet-500/30 bg-black/95 backdrop-blur-xl shadow-2xl z-50">
              <ExpandedXPView data={data} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs p-3 sm:p-4 rounded-xl border border-violet-500/30 bg-black/80 backdrop-blur-xl">
      <ExpandedXPView data={data} />
    </div>
  );
}

function ExpandedXPView({ data }: { data: XPData }) {
  const xpToNextLevel = data.xpNeededForNextLevel - data.xpInCurrentLevel;

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Level Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Animated Level Badge */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-violet-500 blur-md opacity-60 animate-pulse" />
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-violet-600 shadow-lg">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
              <span className="text-sm sm:text-lg font-bold text-white">
                {data.level}
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
              Level
            </p>
            <p className="text-xs sm:text-sm font-bold text-white">
              {getLevelTitle(data.level)}
            </p>
          </div>
        </div>

        {/* Total XP */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-400" />
            <span className="text-sm sm:text-lg font-bold text-white">
              {data.currentXP.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-500">Total XP</p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1 sm:space-y-1.5">
        {/* Progress Labels */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <span className="text-zinc-400">
            Progress to Level {data.level + 1}
          </span>
          <span className="text-violet-400 font-medium">
            {Math.round(data.progress)}%
          </span>
        </div>

        {/* Game-style Progress Bar */}
        <div className="relative h-5 sm:h-6 rounded-lg overflow-hidden bg-zinc-900 border border-violet-500/20">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(139, 92, 246, 0.3) 8px, rgba(139, 92, 246, 0.3) 9px)",
            }}
          />

          {/* Progress Fill */}
          <div
            className="absolute inset-y-0 left-0 bg-violet-600 transition-all duration-500 ease-out"
            style={{ width: `${data.progress}%` }}
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

            {/* Animated Glow on Edge */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-white/50 animate-pulse" />
          </div>

          {/* XP Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-lg">
              {data.xpInCurrentLevel.toLocaleString()} /{" "}
              {data.xpNeededForNextLevel.toLocaleString()} XP
            </span>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l-2 border-t-2 border-violet-400/50" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r-2 border-t-2 border-violet-400/50" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-l-2 border-b-2 border-violet-400/50" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 border-r-2 border-b-2 border-violet-400/50" />
        </div>

        {/* XP to Next Level */}
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-zinc-500">
          <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-fuchsia-400" />
          <span>
            <span className="text-fuchsia-400 font-medium">
              {xpToNextLevel.toLocaleString()}
            </span>{" "}
            XP to next level
          </span>
        </div>
      </div>
    </div>
  );
}
