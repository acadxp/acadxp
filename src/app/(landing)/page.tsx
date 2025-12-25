import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
    </main>
  );
}
