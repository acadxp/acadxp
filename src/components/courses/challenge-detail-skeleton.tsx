import { Skeleton } from "@heroui/react";

export function ChallengeDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton.Root className="h-4 w-48 rounded-md" />
        <div className="flex gap-3">
          <Skeleton.Root className="h-6 w-20 rounded" />
          <Skeleton.Root className="h-6 w-16 rounded" />
          <Skeleton.Root className="h-6 w-24 rounded" />
        </div>
        <Skeleton.Root className="h-10 w-96 rounded-md" />
        <div className="flex gap-6">
          <Skeleton.Root className="h-5 w-32 rounded-md" />
          <Skeleton.Root className="h-5 w-40 rounded-md" />
          <Skeleton.Root className="h-5 w-36 rounded-md" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          <div className="lg:col-span-8 space-y-6">
            <Skeleton.Root className="h-10 w-full rounded-md" />
            <Skeleton.Root className="h-24 w-full rounded-xl" />
            <Skeleton.Root className="h-48 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Skeleton.Root className="h-48 w-full rounded-[20px]" />
            <Skeleton.Root className="h-56 w-full rounded-[20px]" />
            <Skeleton.Root className="h-32 w-full rounded-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
