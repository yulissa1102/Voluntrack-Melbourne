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
  | "Community"
  | "Visitor experience"
  | "Environment"
  | "Education support"
  | "Fundraising"
  | "Arts & culture"
  | "Animal welfare"
  | "Online / remote"
  | "Food / hospitality support";

export type CareerRelevance =
  | "Business & operations"
  | "Marketing & communications"
  | "Customer service"
  | "Event management"
  | "Sustainability"
  | "Education"
  | "Social impact"
  | "Tourism & hospitality"
  | "Arts & design"
  | "Data / technology";

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
  resumeUsefulFor?: string[];
  resumeBullet?: string;
};
