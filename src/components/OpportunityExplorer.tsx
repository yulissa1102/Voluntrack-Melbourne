"use client";

import { ArrowDownUp, Info, Search, SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";
import { useId, useMemo, useState } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import {
  careerRelevanceOptions,
  categoryOptions,
  getEffectiveApplicationStatus,
  opportunityTypeOptions,
  recordTypeCopy,
  uniqueSorted
} from "@/lib/opportunities";
import type {
  ApplicationStatus,
  CareerRelevance,
  Category,
  CheckStatus,
  Opportunity,
  OpportunityType,
  RecordType
} from "@/lib/types";

type Filters = {
  categories: string[];
  careerRelevance: string[];
  opportunityType: string;
  applicationStatus: string;
  wwccStatus: string;
  policeCheckStatus: string;
  recordType: string;
};

type OpportunityExplorerProps = {
  opportunities: Opportunity[];
  title?: string;
  subtitle?: string;
};

type SortMode = "Closest deadline first" | "Latest deadline first" | "No deadline / ongoing last";

const emptyFilters: Filters = {
  categories: [],
  careerRelevance: [],
  opportunityType: "All",
  applicationStatus: "All",
  wwccStatus: "All",
  policeCheckStatus: "All",
  recordType: "All"
};

const defaultSortMode: SortMode = "Closest deadline first";

const availabilityOptions: ApplicationStatus[] = [
  "Open now",
  "Closing soon",
  "EOI open",
  "Ongoing",
  "Future reminder",
  "Closed"
];

export function OpportunityExplorer({ opportunities, title = "Browse opportunities", subtitle }: OpportunityExplorerProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sortMode, setSortMode] = useState<SortMode>(defaultSortMode);

  const options = useMemo(() => {
    return {
      categories: categoryOptions,
      careerRelevance: careerRelevanceOptions,
      opportunityTypes: opportunityTypeOptions,
      statuses: availabilityOptions.filter((status) =>
        opportunities.some((opportunity) => getEffectiveApplicationStatus(opportunity) === status)
      ),
      wwccStatuses: uniqueSorted(opportunities.map((opportunity) => opportunity.wwccStatus)) as CheckStatus[],
      policeStatuses: uniqueSorted(opportunities.map((opportunity) => opportunity.policeCheckStatus)) as CheckStatus[],
      recordTypes: uniqueSorted(opportunities.map((opportunity) => opportunity.recordType)) as RecordType[]
    };
  }, [opportunities]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const searchable = [
        opportunity.title,
        opportunity.organisation,
        opportunity.location,
        opportunity.shortDescription,
        opportunity.description,
        ...opportunity.categories,
        ...opportunity.recommendedMajors,
        ...opportunity.opportunityType
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some((category) => opportunity.categories.includes(category as Category));
      const matchesCareerRelevance =
        filters.careerRelevance.length === 0 ||
        filters.careerRelevance.some((career) => opportunity.recommendedMajors.includes(career as CareerRelevance));
      const matchesType =
        filters.opportunityType === "All" || opportunity.opportunityType.includes(filters.opportunityType as OpportunityType);
      const effectiveStatus = getEffectiveApplicationStatus(opportunity);
      const matchesStatus =
        filters.applicationStatus === "All" || effectiveStatus === filters.applicationStatus;
      const matchesWwcc = filters.wwccStatus === "All" || opportunity.wwccStatus === filters.wwccStatus;
      const matchesPolice =
        filters.policeCheckStatus === "All" || opportunity.policeCheckStatus === filters.policeCheckStatus;
      const matchesRecordType = filters.recordType === "All" || opportunity.recordType === filters.recordType;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCareerRelevance &&
        matchesType &&
        matchesStatus &&
        matchesWwcc &&
        matchesPolice &&
        matchesRecordType
      );
    });
  }, [filters, opportunities, search]);

  const sorted = useMemo(() => sortOpportunities(filtered, sortMode), [filtered, sortMode]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const toggleMultiFilter = (key: "categories" | "careerRelevance", value: string) => {
    setFilters((current) => {
      const selected = current[key];
      return {
        ...current,
        [key]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value]
      };
    });
  };

  const hasActiveFilters =
    search.trim() ||
    filters.categories.length > 0 ||
    filters.careerRelevance.length > 0 ||
    filters.opportunityType !== "All" ||
    filters.applicationStatus !== "All" ||
    filters.wwccStatus !== "All" ||
    filters.policeCheckStatus !== "All" ||
    filters.recordType !== "All";

  return (
    <section id="opportunities" className="scroll-mt-20 bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-gum">Opportunity tracker</p>
            <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">{title}</h2>
            {subtitle ? <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{subtitle}</p> : null}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm">
            {sorted.length} of {opportunities.length} shown
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-black uppercase text-slate-500">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-4 lg:items-end">
            <label className="relative block lg:col-span-2">
              <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">Search</span>
              <Search className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, organisation, location or career relevance"
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium text-ink outline-none transition placeholder:text-slate-400 focus:border-river focus:bg-white focus:ring-2 focus:ring-river/15"
              />
            </label>

            <Select
              label="Deadline order"
              value={sortMode}
              onChange={(value) => setSortMode(value as SortMode)}
              icon={<ArrowDownUp className="h-4 w-4 text-river" aria-hidden="true" />}
            >
              <option>Closest deadline first</option>
              <option>Latest deadline first</option>
              <option>No deadline / ongoing last</option>
            </Select>

            <Select
              label="Opportunity type"
              value={filters.opportunityType}
              onChange={(value) => updateFilter("opportunityType", value)}
            >
              <option>All</option>
              {options.opportunityTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </div>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
            <MultiSelectGroup
              label="Category"
              hint="Role type or volunteering setting"
              options={options.categories}
              selected={filters.categories}
              onToggle={(value) => toggleMultiFilter("categories", value)}
            />
            <MultiSelectGroup
              label="Career Relevance"
              hint="Career direction or employability area"
              options={options.careerRelevance}
              selected={filters.careerRelevance}
              onToggle={(value) => toggleMultiFilter("careerRelevance", value)}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              label="Availability"
              value={filters.applicationStatus}
              onChange={(value) => updateFilter("applicationStatus", value)}
            >
              <option>All</option>
              {options.statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>

            <Select
              label="WWCC"
              labelAddon={
                <InfoTooltip
                  label="WWCC"
                  text="WWCC means Working with Children Check. Some roles involving children, young people or public programs may require it."
                />
              }
              value={filters.wwccStatus}
              onChange={(value) => updateFilter("wwccStatus", value)}
            >
              <option>All</option>
              {options.wwccStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>

            <Select
              label="Police Check"
              labelAddon={
                <InfoTooltip
                  label="Police Check"
                  text="A Police Check is a background check. Some organisations may request it for roles involving vulnerable people, money handling or sensitive settings."
                />
              }
              value={filters.policeCheckStatus}
              onChange={(value) => updateFilter("policeCheckStatus", value)}
            >
              <option>All</option>
              {options.policeStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>

            <Select label="Listing type" value={filters.recordType} onChange={(value) => updateFilter("recordType", value)}>
              <option>All</option>
              {options.recordTypes.map((type) => (
                <option key={type} value={type}>
                  {recordTypeCopy[type]}
                </option>
              ))}
            </Select>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Use the info icons for quick explanations of checks before applying.
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilters(emptyFilters);
                setSortMode(defaultSortMode);
              }}
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-ink transition hover:border-gum hover:text-gum"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Reset filters
            </button>
          ) : null}
        </div>

        {sorted.length ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {sorted.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-xl font-black text-ink">No matching opportunities</p>
            <p className="mt-2 text-sm text-slate-600">Try a broader category, status, or keyword.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilters(emptyFilters);
                setSortMode(defaultSortMode);
              }}
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-bold text-white transition hover:bg-river"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
  icon,
  labelAddon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  icon?: ReactNode;
  labelAddon?: ReactNode;
}) {
  const id = useId();

  return (
    <div className="block">
      <div className="mb-1.5 flex items-center gap-1.5">
        <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
          {icon}
          {label}
        </label>
        {labelAddon}
      </div>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-ink outline-none transition focus:border-river focus:bg-white focus:ring-2 focus:ring-river/15"
      >
        {children}
      </select>
    </div>
  );
}

function InfoTooltip({ label, text }: { label: string; text: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`${label} information`}
        aria-describedby={isOpen ? id : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-river hover:text-river focus:outline-none focus:ring-2 focus:ring-river/20"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {isOpen ? (
        <span
          id={id}
          role="tooltip"
          className="absolute left-0 top-6 z-20 w-64 rounded-lg border border-slate-200 bg-white p-3 text-xs font-semibold normal-case leading-5 text-slate-700 shadow-soft"
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}

function MultiSelectGroup({
  label,
  hint,
  options,
  selected,
  onToggle
}: {
  label: string;
  hint: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <details className="self-start rounded-lg border border-slate-200 bg-slate-50 p-3">
      <summary className="cursor-pointer list-none text-xs font-bold uppercase text-slate-500 marker:hidden">
        <span className="flex items-center justify-between gap-3">
          <span>
            <span className="block">{label}</span>
            <span className="mt-1 block text-[11px] font-semibold normal-case text-slate-500">{hint}</span>
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-[11px] text-slate-600">
            {selected.length ? `${selected.length} selected` : "Tap to expand"}
          </span>
        </span>
      </summary>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                active
                  ? "border-river bg-river text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-river hover:text-river"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </details>
  );
}

function sortOpportunities(opportunities: Opportunity[], sortMode: SortMode) {
  return [...opportunities].sort((a, b) => {
    const rankDifference = getDeadlineRank(a, sortMode) - getDeadlineRank(b, sortMode);
    if (rankDifference !== 0) {
      return rankDifference;
    }

    const aDate = getDeadlineValue(a);
    const bDate = getDeadlineValue(b);
    const dateDifference = sortMode === "Latest deadline first" ? bDate - aDate : aDate - bDate;

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return a.title.localeCompare(b.title);
  });
}

function getDeadlineRank(opportunity: Opportunity, sortMode: SortMode) {
  const effectiveStatus = getEffectiveApplicationStatus(opportunity);

  if (effectiveStatus === "Closed") {
    return 3;
  }

  if (effectiveStatus === "Ongoing") {
    return sortMode === "No deadline / ongoing last" ? 2 : 1;
  }

  return opportunity.applicationDeadline ? 0 : 1;
}

function getDeadlineValue(opportunity: Opportunity) {
  const date = opportunity.applicationDeadline;

  return date ? new Date(`${date}T00:00:00`).getTime() : Number.MAX_SAFE_INTEGER;
}
