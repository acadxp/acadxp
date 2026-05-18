export function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-muted">{label}</span>
      {children || (
        <span className="text-sm font-medium text-text-primary">{value}</span>
      )}
    </div>
  );
}
