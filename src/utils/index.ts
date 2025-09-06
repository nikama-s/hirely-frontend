import { ApplicationStatus } from "@/types";

export const getStatusStyle = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.NOT_APPLIED:
      return "bg-muted-bg text-muted";
    case ApplicationStatus.APPLIED:
      return "bg-info-bg text-primary";
    case ApplicationStatus.INTERVIEW:
      return "bg-warning-bg text-warning";
    case ApplicationStatus.REJECTED:
      return "bg-error-bg text-error";
    case ApplicationStatus.OFFERED:
      return "bg-success-bg text-success";
    case ApplicationStatus.ACCEPTED:
      return "bg-accepted-bg text-accepted";
    case ApplicationStatus.GHOSTED:
      return "bg-ghosted-bg text-ghosted";
    default:
      return "bg-muted-bg text-muted";
  }
};

export const getStatusLabel = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.NOT_APPLIED:
      return "Not Applied";
    case ApplicationStatus.APPLIED:
      return "Applied";
    case ApplicationStatus.INTERVIEW:
      return "Interview";
    case ApplicationStatus.REJECTED:
      return "Rejected";
    case ApplicationStatus.OFFERED:
      return "Offered";
    case ApplicationStatus.ACCEPTED:
      return "Accepted";
    case ApplicationStatus.GHOSTED:
      return "Ghosted";
    default:
      return status;
  }
};
