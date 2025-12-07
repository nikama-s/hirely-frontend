import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const createApplicationRequest = async (
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

const updateApplicationRequest = async ({
  id,
  data
}: {
  id: number;
  data: ApplicationFormData;
}): Promise<Application> => {
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

export const useCreateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplicationRequest,
    onSuccess: (newApplication) => {
      queryClient.setQueryData(
        ["applications"],
        (old: Application[] | undefined) => {
          if (!old) return [newApplication];
          return [...old, newApplication];
        }
      );
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });
};

export const useUpdateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationRequest,
    onSuccess: (updatedApplication) => {
      queryClient.setQueryData(
        ["applications"],
        (old: Application[] | undefined) => {
          if (!old) return [updatedApplication];
          return old.map((app) =>
            app.id === updatedApplication.id ? updatedApplication : app
          );
        }
      );
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });
};
