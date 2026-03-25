import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import ProductivityCockpit from "@/components/landing/ProductivityCockpit";
import AICourseGeneration from "@/components/landing/AICourseGeneration";
import SocialDynamics from "@/components/landing/SocialDynamics";
import Stats from "@/components/landing/Stats";
import FinalCTA from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductivityCockpit />
      <AICourseGeneration />
      <SocialDynamics />
      <Stats />
      <FinalCTA />
    </main>
  );
}
