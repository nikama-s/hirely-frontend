import { Application } from "@/types";

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`
  );
  const data = await response.json();
  return data;
};
