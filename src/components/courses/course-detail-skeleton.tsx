import { Skeleton } from "@heroui/react";

export function CourseDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton.Root className="h-4 w-64 rounded-md" />
        <Skeleton.Root className="h-4 w-32 rounded-md" />
        <Skeleton.Root className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton.Root className="h-48 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton.Root className="h-32 w-full rounded-xl" />
            <Skeleton.Root className="h-56 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
