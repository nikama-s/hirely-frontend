import { Application } from "@/types";
import { ApplicationFormData } from "@/schemas/applicationForm";

export const fetchApplications = async (): Promise<Application[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
    {
      credentials: "include" // Important for session cookies
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  const data = await response.json();
  return data;
};

export const createApplication = async (
  data: ApplicationFormData
): Promise<Application> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create application");
  }

  return response.json();
};

export const updateApplication = async (
  id: number,
  data: ApplicationFormData
): Promise<Application> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update application");
  }

  return response.json();
};
