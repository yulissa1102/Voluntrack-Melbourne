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
  "Community",
  "Visitor experience",
  "Environment",
  "Education support",
  "Fundraising",
  "Arts & culture",
  "Animal welfare",
  "Online / remote",
  "Food / hospitality support"
];

export const careerRelevanceOptions: CareerRelevance[] = [
  "Business & operations",
  "Marketing & communications",
  "Customer service",
  "Event management",
  "Sustainability",
  "Education",
  "Social impact",
  "Tourism & hospitality",
  "Arts & design",
  "Data / technology"
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

export function getMelbourneTodayDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Australia/Melbourne",
    year: "numeric"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function getEffectiveApplicationStatus(
  opportunity: Opportunity,
  today = getMelbourneTodayDateString()
): ApplicationStatus {
  if (opportunity.applicationStatus === "Closed" || opportunity.applicationStatus === "Ongoing") {
    return opportunity.applicationStatus;
  }

  if (opportunity.applicationDeadline && opportunity.applicationDeadline < today) {
    return "Closed";
  }

  const openStatusWithoutDeadline =
    opportunity.applicationStatus === "Open now" ||
    opportunity.applicationStatus === "Closing soon" ||
    opportunity.applicationStatus === "Opening soon" ||
    opportunity.applicationStatus === "EOI open";

  if (!opportunity.applicationDeadline && opportunity.eventEndDate && opportunity.eventEndDate < today && openStatusWithoutDeadline) {
    return "Closed";
  }

  return opportunity.applicationStatus;
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function getReminderTags(opportunity: Opportunity) {
  const tags = new Set<string>();
  const effectiveStatus = getEffectiveApplicationStatus(opportunity);

  if (effectiveStatus === "Closing soon") {
    tags.add("Closing soon");
  }

  if (effectiveStatus === "Opening soon") {
    tags.add("Opens soon");
  }

  if (effectiveStatus === "Future reminder") {
    tags.add("Future reminder");
  }

  if (effectiveStatus === "Closed") {
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

export function getResumeSupport(opportunity: Opportunity) {
  const usefulFor = opportunity.resumeUsefulFor?.length
    ? opportunity.resumeUsefulFor
    : getFallbackResumeUsefulFor(opportunity);

  return {
    usefulFor,
    bullet: opportunity.resumeBullet ?? getFallbackResumeBullet(opportunity, usefulFor)
  };
}

export function getNotifyButtonLabel(opportunity: Opportunity) {
  const effectiveStatus = getEffectiveApplicationStatus(opportunity);

  if (effectiveStatus === "Closed") {
    return "Notify me for next cycle";
  }

  if (effectiveStatus === "Ongoing") {
    return "Notify me about new roles";
  }

  if (effectiveStatus === "Open now" || effectiveStatus === "Closing soon") {
    return "Remind me before the deadline";
  }

  if (
    effectiveStatus === "Opening soon" ||
    effectiveStatus === "Future reminder" ||
    !opportunity.applicationOpenDate ||
    (!opportunity.applicationDeadline && opportunity.dateConfidence === "not_announced")
  ) {
    return "Notify me when applications open";
  }

  return opportunity.applicationDeadline ? "Remind me before the deadline" : "Notify me when applications open";
}

export function getOpenOrUpcomingCount() {
  return opportunities.filter((opportunity) => getEffectiveApplicationStatus(opportunity) !== "Closed").length;
}

export function getCategoryCount() {
  return categoryOptions.filter((category) =>
    opportunities.some((opportunity) => opportunity.categories.includes(category))
  ).length;
}

function getFallbackResumeUsefulFor(opportunity: Opportunity) {
  const skills = new Set<string>();

  if (opportunity.categories.includes("Events")) {
    skills.add("event support");
    skills.add("teamwork");
  }

  if (opportunity.categories.includes("Visitor experience")) {
    skills.add("customer service");
    skills.add("communication");
  }

  if (opportunity.categories.includes("Community") || opportunity.categories.includes("Food / hospitality support")) {
    skills.add("community impact");
    skills.add("service delivery");
  }

  if (opportunity.categories.includes("Environment")) {
    skills.add("sustainability projects");
    skills.add("hands-on problem solving");
  }

  if (opportunity.categories.includes("Arts & culture")) {
    skills.add("public engagement");
    skills.add("cultural programs");
  }

  if (opportunity.recommendedMajors.includes("Marketing & communications")) {
    skills.add("marketing exposure");
  }

  if (opportunity.recommendedMajors.includes("Event management")) {
    skills.add("event operations");
  }

  if (skills.size === 0) {
    skills.add("communication");
    skills.add("teamwork");
    skills.add("local experience");
  }

  return [...skills].slice(0, 4);
}

function getFallbackResumeBullet(opportunity: Opportunity, usefulFor: string[]) {
  const skills = formatList(usefulFor.slice(0, 3));
  const context = getResumeContext(opportunity);

  return `Supported ${context}, strengthening ${skills} skills in a local volunteer setting.`;
}

function getResumeContext(opportunity: Opportunity) {
  if (opportunity.categories.includes("Events") || opportunity.opportunityType.includes("Event-based")) {
    return `event operations and visitor engagement with ${opportunity.organisation}`;
  }

  if (opportunity.categories.includes("Environment")) {
    return `environmental volunteering activities with ${opportunity.organisation}`;
  }

  if (opportunity.categories.includes("Food / hospitality support") || opportunity.categories.includes("Community")) {
    return `community support activities with ${opportunity.organisation}`;
  }

  if (opportunity.categories.includes("Arts & culture")) {
    return `visitor engagement and public program support with ${opportunity.organisation}`;
  }

  return `volunteer activities with ${opportunity.organisation}`;
}

function formatList(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? "communication";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
