export enum ApplicationStatus {
  NOT_APPLIED = "NOT_APPLIED",
  APPLIED = "APPLIED",
  INTERVIEW = "INTERVIEW",
  REJECTED = "REJECTED",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  GHOSTED = "GHOSTED",
}

export type Application = {
  id: string;
  company: string;
  jobTitle: string;
  status: ApplicationStatus;
  dateApplied: string;
  jobPostUrl: string;
  notes: string;
  salary: string;
  location: string;
};
