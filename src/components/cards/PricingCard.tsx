"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { PricingPlan } from "@/types/pricing";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export const PricingCard = ({ plan, index }: PricingCardProps) => {
  const isHighlighted = plan.highlighted;

  return (
    <div className="relative h-full">
      {/* Premium card container with gradient background */}
      <div
        className={`relative rounded-2xl border-2 overflow-hidden h-full transition-all duration-300 ${
          isHighlighted
            ? "border-cyan-500/50 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 shadow-2xl shadow-cyan-500/50"
            : "border-zinc-700/50 bg-slate-900/40 hover:border-zinc-600"
        }`}
      >
        {/* Content */}
        <div
          className={`p-8 sm:p-10 relative z-10 flex flex-col h-full ${
            isHighlighted ? "text-white" : "text-zinc-100"
          }`}
        >
          {/* Badge */}
          {plan.badge && (
            <div className="inline-flex w-fit mb-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isHighlighted
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-zinc-700/40 text-zinc-300 border border-zinc-600/50"
                }`}
              >
                {plan.badge}
              </div>
            </div>
          )}

          {/* Plan name */}
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              isHighlighted ? "text-white" : "text-white"
            }`}
          >
            {plan.name}
          </h3>
          <p
            className={`text-sm mb-6 ${
              isHighlighted ? "text-white/80" : "text-zinc-400"
            }`}
          >
            {plan.description}
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span
                className={`text-5xl sm:text-6xl font-black ${
                  isHighlighted ? "text-white" : "text-white"
                }`}
              >
                {typeof plan.price === "number" ? "$" : ""}
                {plan.price}
              </span>
              {typeof plan.price === "number" && (
                <span
                  className={`text-lg font-medium ${
                    isHighlighted ? "text-white/70" : "text-zinc-400"
                  }`}
                >
                  /month
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/signup" className="mb-8">
            <button
              className={`w-full py-3 px-6 rounded-lg font-bold text-base transition-all duration-300 ${
                isHighlighted
                  ? "bg-white text-blue-600 hover:bg-white/90 hover:shadow-lg"
                  : "bg-blue-600/30 text-white border border-blue-500/30 hover:bg-blue-600/50 hover:border-blue-500/60"
              }`}
            >
              {plan.cta}
            </button>
          </Link>

          {/* Features list */}
          <div className="space-y-3 flex-1">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    isHighlighted ? "text-white" : "text-blue-400"
                  }`}
                />
                <span
                  className={`text-sm leading-relaxed ${
                    isHighlighted ? "text-white/90" : "text-zinc-300"
                  }`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
