import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "AcadXP - Level up your academic journey",
  description:
    "A premium productivity platform that turns learning into a high-stakes adventure. No fluff. Just data-driven mastery.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen selection:bg-[#4F46E5] selection:text-white bg-white">
      <NavBar />
      <main className="flex-1 z-10">{children}</main>
      <Footer />
    </div>
  );
}
