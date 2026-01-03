export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center p-8">
      <div className="text-center max-w-xl">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
          <span className="text-5xl">🚧</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Under Construction
        </h1>

        <p className="text-xl text-purple-200/90 mb-2">
          We&apos;re building something amazing! ✨
        </p>

        <div className="mt-8 rounded-2xl border border-purple-500/30 bg-gray-900/50 p-8 backdrop-blur-sm">
          <p className="text-lg text-white/90 mb-3">
            Thanks for signing up! 🎉
          </p>
          <p className="text-purple-200/70 mb-6 leading-relaxed">
            The dashboard is currently under development and will be available
            soon. We&apos;re working hard to bring you an incredible experience
            to track your academic progress.
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-purple-300/70 mb-2">
              <span>Development Progress</span>
              <span>Coming Soon</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-purple-300/50">
          Stay tuned for updates. Great things are on the way! 🚀
        </p>
      </div>
    </div>
  );
}
