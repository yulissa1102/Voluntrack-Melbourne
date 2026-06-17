import type { ApplicationStatus } from "@/lib/types";
import { statusCopy } from "@/lib/opportunities";

const statusClasses: Record<ApplicationStatus, string> = {
  "Open now": "border-leaf/30 bg-leaf/10 text-leaf",
  "Closing soon": "border-gum/30 bg-gum/10 text-gum",
  "Opening soon": "border-river/30 bg-river/10 text-river",
  "EOI open": "border-sun/40 bg-sun/15 text-amber-800",
  "Future reminder": "border-slate-200 bg-white text-slate-700",
  Closed: "border-slate-200 bg-slate-100 text-slate-500",
  Ongoing: "border-river/25 bg-river/10 text-river"
};

type StatusBadgeProps = {
  status: ApplicationStatus;
  showDescription?: boolean;
};

export function StatusBadge({ status, showDescription = false }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusClasses[status]}`}
    >
      {status}
      {showDescription ? <span className="font-medium opacity-80">· {statusCopy[status]}</span> : null}
    </span>
  );
}
