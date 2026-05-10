import { Card, Button } from "@heroui/react";

export function CoursesErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Card.Root variant="default" className="border border-red-200 bg-red-50">
      <Card.Header>
        <Card.Title className="text-red-600">
          Failed to Load Courses
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-text-secondary text-sm">{message}</p>
      </Card.Content>
      <Card.Footer>
        <Button.Root variant="primary" size="sm" onPress={onRetry}>
          Retry
        </Button.Root>
      </Card.Footer>
    </Card.Root>
  );
}
