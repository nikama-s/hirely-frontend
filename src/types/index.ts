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
  id: number;
  userId: string;
  company: string;
  jobTitle: string;
  status: ApplicationStatus;
  dateApplied: string | null;
  jobPostUrl: string | null;
  notes: string | null;
  salary_from: number | null;
  salary_to: number | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};
