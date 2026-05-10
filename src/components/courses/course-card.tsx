import Link from "next/link";
import { Card, Chip, Avatar } from "@heroui/react";
import { Zap } from "lucide-react";
import type { Course } from "@/types/course";
import { formatEnum, statusColorMap } from "./course-utils";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card.Root
        variant="default"
        className="h-full transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        <Card.Header className="flex items-start gap-3">
          <Avatar.Root size="md" color="accent" variant="soft">
            <Avatar.Fallback className="font-bold">
              {course.title.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex-1 min-w-0">
            <Card.Title className="text-sm font-semibold text-text-primary truncate">
              {course.title}
            </Card.Title>
            <Card.Description className="text-xs text-text-muted truncate">
              {course.courseCode}
            </Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="space-y-3">
          <p className="text-xs text-text-secondary line-clamp-2">
            {course.description || "No description"}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip.Root variant="soft" size="sm">
              <Chip.Label>{formatEnum(course.department)}</Chip.Label>
            </Chip.Root>
            <Chip.Root
              color={statusColorMap[course.status] ?? "default"}
              variant="soft"
              size="sm"
            >
              <Chip.Label>{formatEnum(course.status)}</Chip.Label>
            </Chip.Root>
          </div>
        </Card.Content>
        <Card.Footer className="border-t border-bg-tertiary">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
            <Zap className="w-4 h-4 text-amber-500" />
            {course.xp} XP
          </div>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}
