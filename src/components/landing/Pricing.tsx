"use client";

import { PricingPlan } from "@/types/pricing";
import { PricingCard } from "@/components/cards/PricingCard";

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    cta: "Get Started",
    features: [
      "Unlimited course tracking",
      "Basic gamification (XP & levels)",
      "Achievement badges",
      "Community access",
      "Email support",
      "Basic analytics",
      "Up to 5 courses",
    ],
  },
  {
    name: "Premium",
    price: 4.99,
    description: "Everything you need to level up",
    badge: "MOST POPULAR",
    highlighted: true,
    cta: "Start Free Trial",
    features: [
      "Everything in Free, plus:",
      "AI Challenge Generator",
      "Personalized quiz generation",
      "Advanced analytics & insights",
      "Unlimited courses",
      "Priority support",
      "Custom learning goals",
      "Skill badges with verification",
      "Weekly progress reports",
      "No ads experience",
    ],
  },
];

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 drop-shadow-lg">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-2">
            Choose the plan that fits your learning journey. No hidden fees.
          </p>
          <p className="text-zinc-400 text-sm">
            All plans include a 14-day free trial of Premium features. No credit
            card required.
          </p>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
