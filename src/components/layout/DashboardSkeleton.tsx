import { cn } from "@/lib/utils";

function DashboardSkeleton() {
  const shimmer = "animate-pulse bg-bg-tertiary";

  return (
    <div className="flex bg-white min-h-screen">
      <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-bg-secondary flex-col py-8 px-6 z-50 border-r border-bg-tertiary">
        <div className="mb-10 flex justify-center">
          <div className={cn(shimmer, "h-20 w-20 rounded-2xl")} />
        </div>
        <nav className="flex-1 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={cn(shimmer, "h-10 w-full rounded-xl")} />
          ))}
        </nav>
        <div className="mt-auto space-y-4">
          <div className={cn(shimmer, "h-11 w-full rounded-xl")} />
          <div className="space-y-2 pt-6 border-t border-bg-tertiary">
            <div className={cn(shimmer, "h-9 w-full rounded-lg")} />
            <div className={cn(shimmer, "h-9 w-full rounded-lg")} />
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 bg-white relative pb-20 lg:pb-0 min-w-0 flex flex-col">
        <header className="h-16 border-b border-bg-tertiary bg-white sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className={cn(shimmer, "h-6 w-48 rounded-md")} />
          <div className="flex items-center gap-3 md:gap-6">
            <div className={cn(shimmer, "hidden lg:block h-9 w-64 rounded-xl")} />
            <div className="flex items-center gap-1 md:gap-2">
              <div className={cn(shimmer, "h-9 w-9 rounded-full")} />
              <div className={cn(shimmer, "hidden sm:block h-9 w-9 rounded-full")} />
            </div>
            <div className={cn(shimmer, "h-9 w-9 rounded-full")} />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 space-y-6 bg-bg-secondary">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <div className={cn(shimmer, "h-14 w-14 rounded-xl")} />
              <div className="space-y-2">
                <div className={cn(shimmer, "h-7 w-64")} />
                <div className={cn(shimmer, "h-4 w-40")} />
              </div>
            </div>
            <div className={cn(shimmer, "h-48 w-full rounded-xl")} />
            <div className={cn(shimmer, "h-48 w-full rounded-xl")} />
          </div>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-bg-tertiary flex items-center justify-around px-2 py-2 pb-safe">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={cn(shimmer, "h-10 w-12 rounded-xl")} />
        ))}
      </nav>
    </div>
  );
}

export default DashboardSkeleton;
