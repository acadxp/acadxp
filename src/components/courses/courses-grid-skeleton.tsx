import { Skeleton } from "@heroui/react";

export function CoursesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-bg-tertiary p-4">
          <div className="flex items-center gap-3">
            <Skeleton.Root className="w-10 h-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton.Root className="h-4 w-3/4 rounded-md" />
              <Skeleton.Root className="h-3 w-1/2 rounded-md" />
            </div>
          </div>
          <Skeleton.Root className="h-8 w-full rounded-md" />
          <Skeleton.Root className="h-5 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
