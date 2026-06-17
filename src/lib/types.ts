export type RecordType = "specific_opportunity" | "opportunity_channel";

export type CheckStatus = "Yes" | "No" | "Role-dependent" | "Not confirmed";

export type ApplicationStatus =
  | "Open now"
  | "Closing soon"
  | "Opening soon"
  | "EOI open"
  | "Future reminder"
  | "Closed"
  | "Ongoing";

export type DateConfidence =
  | "confirmed"
  | "estimated"
  | "not_announced"
  | "role_dependent";

export type Category =
  | "Events"
  | "Arts & Culture"
  | "Community"
  | "Sustainability"
  | "Museum"
  | "Sports"
  | "Film & Media"
  | "Education"
  | "Food Relief"
  | "Visitor Experience";

export type CareerRelevance =
  | "Business"
  | "Marketing"
  | "Communications"
  | "Event Management"
  | "Media"
  | "Arts"
  | "Sustainability"
  | "Education"
  | "Health"
  | "Tourism"
  | "IT / Tech"
  | "Social Impact";

export type OpportunityType =
  | "One-off"
  | "Short-term"
  | "Long-term"
  | "Event-based"
  | "Project-based"
  | "Ongoing";

export type InternationalStudentFriendly =
  | "Yes"
  | "Likely"
  | "Role-dependent"
  | "Not confirmed";

export type Opportunity = {
  id: string;
  recordType: RecordType;
  title: string;
  organisation: string;
  categories: Category[];
  recommendedMajors: CareerRelevance[];
  opportunityType: OpportunityType[];
  location: string;
  shortDescription: string;
  description: string;
  hardRequirements: string[];
  wwccStatus: CheckStatus;
  policeCheckStatus: CheckStatus;
  englishRequirement: string;
  applicationStatus: ApplicationStatus;
  applicationOpenDate: string | null;
  applicationDeadline: string | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  dateConfidence: DateConfidence;
  dateNote: string;
  applicationLink: string;
  source: string;
  internationalStudentFriendly: InternationalStudentFriendly;
};
