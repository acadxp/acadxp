import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic XP Tracker",
  description: "Track your academic progress and earn XP for your achievements",
};

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent my-2">
          Coming soon!!!
        </h1>
        <p className="max-w-xl text-center sm:text-left text-lg text-zinc-400 my-2">
          AcadXP is revolutionizing how students experience their academic
          journey — by transforming education into an engaging, game-like
          adventure.
        </p>
        <div className="flex items-center justify-center md:justify-start">
          <a
            href="https://github.com/acadxp/acadxp"
            target="_blank"
            className="inline-flex align-middle mt-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            Check Updates here
          </a>
        </div>
      </section>
    </>
  );
}
