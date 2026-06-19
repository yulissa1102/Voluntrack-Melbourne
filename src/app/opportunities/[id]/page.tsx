import Link from "next/link";
import { notFound } from "next/navigation";
import type { ElementType, ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  ListChecks,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { NotifyButton } from "@/components/NotifyButton";
import { OfficialApplicationLink } from "@/components/OfficialApplicationLink";
import { SaveButton } from "@/components/SaveButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Tag } from "@/components/Tag";
import {
  checkStatusTone,
  dateConfidenceCopy,
  formatDate,
  getNotifyButtonLabel,
  getOpportunityById,
  getReminderTags,
  getResumeSupport,
  opportunities,
  recordTypeCopy
} from "@/lib/opportunities";
import type { Opportunity } from "@/lib/types";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({ id: opportunity.id }));
}

export async function generateMetadata({ params }: DetailPageProps) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);

  return {
    title: opportunity ? `${opportunity.title} | VolunTrack Melbourne` : "Opportunity | VolunTrack Melbourne"
  };
}

export default async function OpportunityDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    notFound();
  }

  const resumeSupport = getResumeSupport(opportunity);
  const notifyButtonLabel = getNotifyButtonLabel(opportunity);

  return (
    <main className="bg-paper">
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/#opportunities" className="inline-flex items-center gap-2 text-sm font-bold text-river hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to opportunities
          </Link>

          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={opportunity.applicationStatus} showDescription />
                <Tag tone={opportunity.recordType === "specific_opportunity" ? "green" : "blue"}>
                  {recordTypeCopy[opportunity.recordType]}
                </Tag>
              </div>
              <p className="mt-5 text-sm font-black uppercase text-gum">{opportunity.organisation}</p>
              <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl">
                {opportunity.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{opportunity.shortDescription}</p>
            </div>
            <SaveButton id={opportunity.id} className="md:mt-9" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-paper py-5">
        <div className="mx-auto grid max-w-5xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <SummaryItem icon={CalendarDays} label="Status" value={opportunity.applicationStatus} />
          <SummaryItem icon={CalendarDays} label="Deadline" value={formatDate(opportunity.applicationDeadline)} />
          <SummaryItem icon={MapPin} label="Location" value={opportunity.location} />
          <SummaryItem
            icon={ShieldCheck}
            label="Checks"
            value={`WWCC: ${opportunity.wwccStatus}; Police: ${opportunity.policeCheckStatus}`}
          />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.85fr] lg:px-8">
          <div className="space-y-6">
            <OfficialApplicationLink opportunityId={opportunity.id} href={opportunity.applicationLink} />

            <Panel title="Before you apply" icon={ListChecks}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "Check deadline on the official page",
                  "Prepare a short motivation statement",
                  "Check whether WWCC is required",
                  "Check shift dates and location",
                  "Save this opportunity for follow-up"
                ].map((item) => (
                  <li key={item} className="flex gap-2 rounded-lg border border-slate-200 bg-paper px-3 py-2 text-sm font-bold text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-leaf" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Application requirements" icon={ShieldCheck}>
              <ul className="space-y-3">
                {opportunity.hardRequirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gum" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="How this can support your resume" icon={BriefcaseBusiness}>
              <div>
                <p className="text-xs font-black uppercase text-slate-500">Useful for</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {resumeSupport.usefulFor.map((item) => (
                    <Tag key={item} tone="green">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-river/20 bg-river/10 p-3">
                <p className="text-xs font-black uppercase text-river">Example resume bullet</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{resumeSupport.bullet}</p>
              </div>
            </Panel>

            <Panel title="About this opportunity" icon={FileText}>
              <p className="text-base leading-8 text-slate-700">{opportunity.description}</p>
            </Panel>

            <Panel title="Career Relevance" icon={GraduationCap}>
              <p className="mb-3 text-sm leading-6 text-slate-600">
                Career relevance only. These are not application restrictions.
              </p>
              <div className="flex flex-wrap gap-2">
                {opportunity.recommendedMajors.map((major) => (
                  <Tag key={major}>{major}</Tag>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Panel title="Application" icon={CalendarDays}>
              <div className="space-y-3">
                <InfoRow label="Status" value={opportunity.applicationStatus} />
                <InfoRow label="Application opens" value={formatDate(opportunity.applicationOpenDate)} />
                <InfoRow label="Deadline" value={formatDate(opportunity.applicationDeadline)} />
                <InfoRow label="Event starts" value={formatDate(opportunity.eventStartDate)} />
                <InfoRow label="Event ends" value={formatDate(opportunity.eventEndDate)} />
                <InfoRow label="Date confidence" value={dateConfidenceCopy[opportunity.dateConfidence]} />
              </div>
              <div className="mt-4 rounded-lg border border-sun/30 bg-sun/10 p-3 text-sm leading-6 text-amber-900">
                {opportunity.dateNote}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {getReminderTags(opportunity).map((tag) => (
                  <Tag key={tag} tone="warm">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Panel>

            <Panel title="Checks and eligibility" icon={ShieldCheck}>
              <div className="space-y-3">
                <CheckRow label="WWCC" value={opportunity.wwccStatus} />
                <CheckRow label="Police Check" value={opportunity.policeCheckStatus} />
                <InfoRow label="English" value={opportunity.englishRequirement} />
                <InfoRow label="International student friendly" value={opportunity.internationalStudentFriendly} />
              </div>
              <p className="mt-4 rounded-lg border border-river/20 bg-river/10 p-3 text-sm leading-6 text-slate-700">
                WWCC stands for Working with Children Check. Some roles involving children or public programs may require it.
              </p>
            </Panel>

            <Panel title="Opportunity details" icon={MapPin}>
              <div className="space-y-3">
                <InfoRow label="Type" value={opportunity.opportunityType.join(", ")} />
                <InfoRow label="Location" value={opportunity.location} />
                <InfoRow label="Source" value={opportunity.source} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {opportunity.categories.map((category) => (
                  <Tag key={category} tone="green">
                    {category}
                  </Tag>
                ))}
              </div>
            </Panel>

            <Panel title="Notify me" icon={Bell}>
              <NotifyButton label={notifyButtonLabel} />
            </Panel>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-paper text-river">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-bold leading-5 text-ink">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  children
}: {
  title: string;
  icon: ElementType;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-paper text-river">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-black text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-xs font-black uppercase text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold leading-6 text-ink">{value}</dd>
    </div>
  );
}

function CheckRow({ label, value }: { label: string; value: Opportunity["wwccStatus"] }) {
  return (
    <div className={`rounded-lg border px-3 py-2 text-sm font-bold ${checkStatusTone[value]}`}>
      {label}: {value}
    </div>
  );
}
