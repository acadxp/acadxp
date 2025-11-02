import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic XP Tracker",
  description: "Track your academic progress and earn XP for your achievements",
};

export default function HomePage() {
  return (
    <>
      <section className="hero-section flex flex-col items-center justify-center  px-4 text-white ">
        <p className="mb-5 bg-purple-900 p-2 rounded-4xl text-center">
          Coming soon!!!
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-center  bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent my-2">
          Turn Your Degree into a Game
        </h1>
        <p className="max-w-xl text-center text-lg text-zinc-400 my-2">
          Experience a new way to learn: track your progress, earn rewards, and
          level up your academic journey with AcadXP.
        </p>
        <form className="w-full flex items-center flex-col justify-center md:flex-row gap-4 mt-6">
          <input
            type="email"
            id="waitlist-email"
            placeholder="Email Address"
            required
            className="border shadow-[0_0_20px_rgba(168,85,247,0.5)] rounded-lg px-4 py-3 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white border-zinc-700 text-black"
          />
          <button
            type="button"
            className="inline-flex align-middle px-8 py-4 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            Join the Waitlist
          </button>
        </form>
      </section>
    </>
  );
}
