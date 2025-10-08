import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Academic XP Tracker",
  description: "Track your academic progress and earn XP for your achievements",
};

export default function HomePage() {
    
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-responsive">
          <h1 className="hero-title">
            Track Your{" "}
            <span className="text-gradient-gold">Academic Journey</span>
          </h1>
          <p className="hero-subtitle">
            Earn XP, unlock achievements, and visualize your learning progress
            with our comprehensive academic tracking system.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="btn-primary-gradient px-8 py-3 text-lg">
              Get Started
            </button>
            <button className="btn-secondary px-8 py-3 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      
    </main>
  );
}
