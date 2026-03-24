export default function DashboardPage() {
  return (
    <div className="w-full h-full min-h-[calc(100vh-0px)] bg-[#f7f7f6] px-4 py-8 lg:px-12 lg:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-sm">
            🚧
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#111110] mb-1">
              Dashboard Under Construction
            </h1>
            <p className="text-sm text-[#6b6a65]">
              We're building something amazing! ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
