import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-gray-900 via-slate-900 to-zinc-900 relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-60 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/25 to-purple-500/25 rounded-full blur-3xl animate-gradient-move" />
        <div className="absolute bottom-0 -right-20 w-[550px] h-[550px] bg-gradient-to-br from-cyan-400/25 via-blue-500/25 to-emerald-400/25 rounded-full blur-3xl animate-gradient-move-reverse" />
        <div className="absolute top-1/3 left-1/2 w-[800px] h-[800px] -translate-x-1/2 bg-gradient-radial from-fuchsia-500/10 via-transparent to-transparent rounded-full blur-2xl animate-pulse-slow" />
      </div>

      <Header />
      <main className="flex-1 z-10">{children}</main>
      <Footer />
    </div>
  );
}
