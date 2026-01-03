import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header Skeleton */}
      <header className="bg-transparent border-b border-white/10 mx-auto w-full px-6 py-4 flex items-center justify-between">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8 space-y-6">
        {/* Title area */}
        <Skeleton className="h-10 w-64" />

        {/* Stats cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* Additional content */}
        <Skeleton className="h-48 w-full rounded-lg" />
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-white/20 px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardSkeleton;
