import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main className="flex-1 z-10">{children}</main>
      <Footer />
    </div>
  );
}
