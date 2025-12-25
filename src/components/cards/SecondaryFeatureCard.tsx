"use client";

import { Feature } from "@/types/feature";

export const SecondaryFeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <div className="group relative rounded-lg overflow-hidden border border-violet-500/30 bg-gradient-to-br from-slate-900/50 to-slate-950 hover:border-violet-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 p-6 sm:p-7">
      {/* Card content */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-violet-600/20 text-violet-400 flex-shrink-0 group-hover:bg-violet-600/30 transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};
