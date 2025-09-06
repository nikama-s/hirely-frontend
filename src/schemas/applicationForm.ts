import { z } from "zod";
import { ApplicationStatus } from "@/types";

export const applicationFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  status: z.enum(ApplicationStatus),
  dateApplied: z.string().optional(),
  jobPostUrl: z.url("Invalid URL format").optional().or(z.literal("")),
  notes: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
