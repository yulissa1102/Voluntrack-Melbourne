import opportunitiesData from "@/data/opportunities.json";
import type {
  ApplicationStatus,
  CareerRelevance,
  Category,
  CheckStatus,
  DateConfidence,
  Opportunity,
  OpportunityType,
  RecordType
} from "@/lib/types";

export const opportunities = opportunitiesData as Opportunity[];

export const categoryOptions: Category[] = [
  "Events",
  "Arts & Culture",
  "Community",
  "Sustainability",
  "Museum",
  "Sports",
  "Film & Media",
  "Education",
  "Food Relief",
  "Visitor Experience"
];

export const careerRelevanceOptions: CareerRelevance[] = [
  "Business",
  "Marketing",
  "Communications",
  "Event Management",
  "Media",
  "Arts",
  "Sustainability",
  "Education",
  "Health",
  "Tourism",
  "IT / Tech",
  "Social Impact"
];

export const opportunityTypeOptions: OpportunityType[] = [
  "One-off",
  "Short-term",
  "Long-term",
  "Event-based",
  "Project-based",
  "Ongoing"
];

export const statusCopy: Record<ApplicationStatus, string> = {
  "Open now": "Applications are open",
  "Closing soon": "Application deadline is coming up",
  "Opening soon": "Applications are expected to open soon",
  "EOI open": "Expression of interest is open",
  "Future reminder": "Worth tracking for a future cycle",
  Closed: "Closed for this cycle",
  Ongoing: "Open on an ongoing or rolling basis"
};

export const recordTypeCopy: Record<RecordType, string> = {
  specific_opportunity: "Event role",
  opportunity_channel: "Opportunity source"
};

export const checkStatusTone: Record<CheckStatus, string> = {
  Yes: "border-leaf/25 bg-leaf/10 text-leaf",
  No: "border-slate-200 bg-slate-50 text-slate-600",
  "Role-dependent": "border-sun/35 bg-sun/15 text-amber-800",
  "Not confirmed": "border-slate-200 bg-white text-slate-600"
};

export const dateConfidenceCopy: Record<DateConfidence, string> = {
  confirmed: "Confirmed date",
  estimated: "Estimated date",
  not_announced: "Not announced",
  role_dependent: "Role-dependent"
};

export function getOpportunityById(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}

export function formatDate(date: string | null) {
  if (!date) {
    return "Not announced";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function getReminderTags(opportunity: Opportunity) {
  const tags = new Set<string>();

  if (opportunity.applicationStatus === "Closing soon") {
    tags.add("Closing soon");
  }

  if (opportunity.applicationStatus === "Opening soon") {
    tags.add("Opens soon");
  }

  if (opportunity.applicationStatus === "Future reminder") {
    tags.add("Future reminder");
  }

  if (opportunity.applicationStatus === "Closed") {
    tags.add("Closed for this cycle");
  }

  if (!opportunity.applicationDeadline && opportunity.dateConfidence === "not_announced") {
    tags.add("Deadline not announced");
  }

  if (opportunity.dateConfidence === "role_dependent") {
    tags.add("Date role-dependent");
  }

  return [...tags];
}

export function getOpenOrUpcomingCount() {
  return opportunities.filter((opportunity) => opportunity.applicationStatus !== "Closed").length;
}

export function getCategoryCount() {
  return categoryOptions.filter((category) =>
    opportunities.some((opportunity) => opportunity.categories.includes(category))
  ).length;
}
