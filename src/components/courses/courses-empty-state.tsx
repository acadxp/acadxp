import Link from "next/link";
import { Card } from "@heroui/react";
import { Plus, GraduationCap } from "lucide-react";

export function CoursesEmptyState({
  hasSearch,
  hasCourses,
}: {
  hasSearch: boolean;
  hasCourses: boolean;
}) {
  return (
    <Card.Root variant="default" className="text-center py-16">
      <Card.Content>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-text-muted" />
          </div>
          {hasSearch ? (
            <>
              <Card.Title className="text-lg font-semibold text-text-primary">
                No courses found
              </Card.Title>
              <p className="text-sm text-text-muted max-w-sm">
                Try adjusting your search to find what you&apos;re looking for.
              </p>
            </>
          ) : (
            <>
              <Card.Title className="text-lg font-semibold text-text-primary">
                No courses yet
              </Card.Title>
              <p className="text-sm text-text-muted max-w-sm">
                Get started by creating your first course.
              </p>
              <Link
                href="/courses/create"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Course
              </Link>
            </>
          )}
        </div>
      </Card.Content>
    </Card.Root>
  );
}
