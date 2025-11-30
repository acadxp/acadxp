import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Animated background */}
      {/* <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/25 to-purple-500/25 rounded-full blur-3xl animate-gradient-move" />
        <div className="absolute bottom-0 -right-20 w-[550px] h-[550px] bg-gradient-to-br from-cyan-400/25 via-blue-500/25 to-emerald-400/25 rounded-full blur-3xl animate-gradient-move-reverse" />
        <div className="absolute top-1/3 left-1/2 w-[800px] h-[800px] -translate-x-1/2 bg-gradient-radial from-fuchsia-500/10 via-transparent to-transparent rounded-full blur-2xl animate-pulse-slow" />
      </div> */}

      <NavBar />
      <main className="flex-1 z-10">{children}</main>
      <Footer />
    </div>
  );
}
