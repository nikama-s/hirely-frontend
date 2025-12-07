import { z } from "zod";
import { ApplicationStatus } from "@/types";

const companyNameRegex = /^[a-zA-Z0-9\s\-]+$/;

export const applicationFormSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .regex(
      companyNameRegex,
      "Company name can only contain letters, numbers, spaces, and hyphens"
    ),
  jobTitle: z.string().min(1, "Job title is required"),
  status: z.enum(ApplicationStatus),
  dateApplied: z.string().optional(),
  jobPostUrl: z.url("Invalid URL format").optional().or(z.literal("")),
  notes: z.string().optional(),
  salary_from: z.number().optional(),
  salary_to: z.number().optional(),
  location: z.string().optional()
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
