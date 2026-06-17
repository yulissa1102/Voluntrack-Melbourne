import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { SaveButton } from "@/components/SaveButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Tag } from "@/components/Tag";
import {
  checkStatusTone,
  formatDate,
  getReminderTags,
  recordTypeCopy
} from "@/lib/opportunities";
import type { Opportunity } from "@/lib/types";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const dateText = opportunity.applicationDeadline
    ? `Deadline: ${formatDate(opportunity.applicationDeadline)}`
    : opportunity.dateNote;

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-river/40 hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={opportunity.applicationStatus} />
        <Tag tone={opportunity.recordType === "specific_opportunity" ? "green" : "blue"}>
          {recordTypeCopy[opportunity.recordType]}
        </Tag>
      </div>

      <div className="mt-4 flex-1">
        <p className="text-sm font-semibold text-river">{opportunity.organisation}</p>
        <h3 className="mt-1 text-xl font-black leading-tight text-ink">{opportunity.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{opportunity.shortDescription}</p>

        <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
          <MapPin className="mt-0.5 h-4 w-4 flex-none text-gum" aria-hidden="true" />
          <span>{opportunity.location}</span>
        </div>

        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
          <CalendarDays className="mt-0.5 h-4 w-4 flex-none text-river" aria-hidden="true" />
          <span className="line-clamp-2">{dateText}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {opportunity.categories.slice(0, 4).map((category) => (
            <Tag key={category}>{category}</Tag>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <RequirementLabel label="WWCC" value={opportunity.wwccStatus} />
          <RequirementLabel label="Police" value={opportunity.policeCheckStatus} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {getReminderTags(opportunity).map((tag) => (
            <Tag key={tag} tone="warm">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
        <SaveButton id={opportunity.id} />
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-ink px-3 text-sm font-semibold text-white transition hover:bg-river"
        >
          View details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function RequirementLabel({ label, value }: { label: string; value: Opportunity["wwccStatus"] }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${checkStatusTone[value]}`}>
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      <span>{label}: {value}</span>
    </div>
  );
}
