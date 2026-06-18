"use client";

import { ArrowDownUp, Search, SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import {
  careerRelevanceOptions,
  categoryOptions,
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

type SortMode = "Closing soon" | "Opening soon" | "Open now";

const emptyFilters: Filters = {
  categories: [],
  careerRelevance: [],
  opportunityType: "All",
  applicationStatus: "All",
  wwccStatus: "All",
  policeCheckStatus: "All",
  recordType: "All"
};

export function OpportunityExplorer({ opportunities, title = "Browse opportunities", subtitle }: OpportunityExplorerProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sortMode, setSortMode] = useState<SortMode>("Closing soon");

  const options = useMemo(() => {
    return {
      categories: categoryOptions,
      careerRelevance: careerRelevanceOptions,
      opportunityTypes: opportunityTypeOptions,
      statuses: uniqueSorted(opportunities.map((opportunity) => opportunity.applicationStatus)) as ApplicationStatus[],
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
      const matchesStatus =
        filters.applicationStatus === "All" || opportunity.applicationStatus === filters.applicationStatus;
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
    <section id="opportunities" className="bg-paper py-12 sm:py-16">
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

          <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <label className="relative block">
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
              label="Sort by deadline"
              value={sortMode}
              onChange={(value) => setSortMode(value as SortMode)}
              icon={<ArrowDownUp className="h-4 w-4 text-river" aria-hidden="true" />}
            >
              <option>Closing soon</option>
              <option>Opening soon</option>
              <option>Open now</option>
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
              options={options.categories}
              selected={filters.categories}
              onToggle={(value) => toggleMultiFilter("categories", value)}
            />
            <MultiSelectGroup
              label="Career Relevance"
              options={options.careerRelevance}
              selected={filters.careerRelevance}
              onToggle={(value) => toggleMultiFilter("careerRelevance", value)}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Select
              label="Application status"
              value={filters.applicationStatus}
              onChange={(value) => updateFilter("applicationStatus", value)}
            >
              <option>All</option>
              {options.statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>

            <Select label="WWCC" value={filters.wwccStatus} onChange={(value) => updateFilter("wwccStatus", value)}>
              <option>All</option>
              {options.wwccStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>

            <Select
              label="Police Check"
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
            WWCC stands for Working with Children Check. Some roles involving children or public programs may require it.
          </p>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilters(emptyFilters);
                setSortMode("Closing soon");
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
                setSortMode("Closing soon");
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
  icon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
        {icon}
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-ink outline-none transition focus:border-river focus:bg-white focus:ring-2 focus:ring-river/15"
      >
        {children}
      </select>
    </label>
  );
}

function MultiSelectGroup({
  label,
  options,
  selected,
  onToggle
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <details className="self-start rounded-lg border border-slate-200 bg-slate-50 p-3">
      <summary className="cursor-pointer list-none text-xs font-bold uppercase text-slate-500 marker:hidden">
        <span className="flex items-center justify-between gap-3">
          <span>{label}</span>
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
    const rankDifference = getStatusRank(a, sortMode) - getStatusRank(b, sortMode);
    if (rankDifference !== 0) {
      return rankDifference;
    }

    const dateDifference = getSortDateValue(a, sortMode) - getSortDateValue(b, sortMode);
    if (dateDifference !== 0) {
      return dateDifference;
    }

    return a.title.localeCompare(b.title);
  });
}

function getStatusRank(opportunity: Opportunity, sortMode: SortMode) {
  const ranks: Record<SortMode, Record<ApplicationStatus, number>> = {
    "Closing soon": {
      "Closing soon": 0,
      "Open now": 1,
      "EOI open": 2,
      "Opening soon": 3,
      Ongoing: 4,
      "Future reminder": 5,
      Closed: 6
    },
    "Opening soon": {
      "Opening soon": 0,
      "Future reminder": 1,
      "Open now": 2,
      "EOI open": 3,
      Ongoing: 4,
      "Closing soon": 5,
      Closed: 6
    },
    "Open now": {
      "Open now": 0,
      "EOI open": 1,
      Ongoing: 2,
      "Closing soon": 3,
      "Opening soon": 4,
      "Future reminder": 5,
      Closed: 6
    }
  };

  return ranks[sortMode][opportunity.applicationStatus];
}

function getSortDateValue(opportunity: Opportunity, sortMode: SortMode) {
  const date =
    sortMode === "Opening soon"
      ? opportunity.applicationOpenDate ?? opportunity.eventStartDate ?? opportunity.applicationDeadline
      : opportunity.applicationDeadline ?? opportunity.applicationOpenDate ?? opportunity.eventStartDate;

  return date ? new Date(`${date}T00:00:00`).getTime() : Number.MAX_SAFE_INTEGER;
}
