"use client";

import Image from "next/image";
import { Feature } from "@/types/feature";

export const MainFeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <div className="group relative rounded-lg overflow-hidden border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20">
      {/* Image background */}
      <div className="absolute inset-0">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white min-h-80">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-3 rounded-lg bg-violet-600/40 text-violet-300 flex-shrink-0 group-hover:bg-violet-600/60 transition-all duration-300 backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-violet-300 transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
