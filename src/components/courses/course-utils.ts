export function formatEnum(value: string | null | undefined): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const statusColorMap: Record<string, "success" | "warning" | "default"> = {
  ACTIVE: "success",
  ARCHIVED: "warning",
  DRAFT: "default",
  INACTIVE: "default",
};
