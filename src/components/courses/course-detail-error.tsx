import Link from "next/link";
import { Card } from "@heroui/react";

export function CourseDetailError({ message }: { message: string }) {
  return (
    <div className="w-full min-h-screen bg-bg-secondary px-4 py-6 lg:px-10 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <Card.Root
          variant="default"
          className="border border-red-200 bg-red-50"
        >
          <Card.Header>
            <Card.Title className="text-red-600">
              Failed to Load Course
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-text-secondary">{message}</p>
          </Card.Content>
          <Card.Footer>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Courses
            </Link>
          </Card.Footer>
        </Card.Root>
      </div>
    </div>
  );
}
