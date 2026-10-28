import type { CrowdingStatus } from "@/types/spot";

type StatusBadgeProps = {
  status: CrowdingStatus;
  label: string;
};

export function StatusBadge({
  status,
  label,
}: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}
