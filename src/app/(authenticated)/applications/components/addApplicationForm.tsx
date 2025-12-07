"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert
} from "@mui/material";
import { Application, ApplicationStatus } from "@/types";
import {
  applicationFormSchema,
  ApplicationFormData
} from "@/schemas/applicationForm";
import { createApplication, updateApplication } from "../api";

interface AddApplicationFormProps {
  onApplicationAdded: (application: Application) => void;
  onApplicationUpdated?: (application: Application) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  editingApplication?: Application | null;
}

export function AddApplicationForm({
  onApplicationAdded,
  onApplicationUpdated,
  open,
  setOpen,
  editingApplication
}: AddApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isEditMode = !!editingApplication;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      company: "",
      jobTitle: "",
      status: ApplicationStatus.APPLIED,
      dateApplied: "",
      jobPostUrl: "",
      notes: "",
      salary_from: undefined,
      salary_to: undefined,
      location: ""
    }
  });

  useEffect(() => {
    if (editingApplication) {
      const dateApplied = editingApplication.dateApplied
        ? new Date(editingApplication.dateApplied).toISOString().split("T")[0]
        : "";
      setValue("company", editingApplication.company);
      setValue("jobTitle", editingApplication.jobTitle);
      setValue("status", editingApplication.status);
      setValue("dateApplied", dateApplied);
      setValue("jobPostUrl", editingApplication.jobPostUrl || "");
      setValue("notes", editingApplication.notes || "");
      setValue("salary_from", editingApplication.salary_from || undefined);
      setValue("salary_to", editingApplication.salary_to || undefined);
      setValue("location", editingApplication.location || "");
    } else {
      reset({
        company: "",
        jobTitle: "",
        status: ApplicationStatus.APPLIED,
        dateApplied: "",
        jobPostUrl: "",
        notes: "",
        salary_from: undefined,
        salary_to: undefined,
        location: ""
      });
    }
  }, [editingApplication, setValue, reset]);

  const statusValue = watch("status");

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formattedData = {
        ...data,
        dateApplied: data.dateApplied
          ? new Date(data.dateApplied).toISOString()
          : undefined
      };

      if (isEditMode && editingApplication) {
        const application = await updateApplication(
          editingApplication.id,
          formattedData
        );
        setOpen(false);
        if (onApplicationUpdated) {
          onApplicationUpdated(application);
        }
      } else {
        const application = await createApplication(formattedData);
        setOpen(false);
        onApplicationAdded(application);
      }
      reset();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : isEditMode
          ? "Failed to update application"
          : "Failed to create application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    reset();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle className="pt-4 px-4 pb-0 sm:pt-8 sm:px-8">
          {isEditMode ? "Edit Job Application" : "Add New Job Application"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="px-4 sm:px-8">
            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            <Box className="flex flex-col gap-4">
              <Box className="flex gap-4 flex-col sm:flex-row">
                <TextField
                  {...register("company")}
                  label="Company"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  required
                />
                <TextField
                  {...register("jobTitle")}
                  label="Job Title"
                  fullWidth
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                  required
                />
              </Box>

              <Box className="flex gap-2 sm:gap-4">
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusValue}
                    label="Status"
                    onChange={(e) =>
                      setValue("status", e.target.value as ApplicationStatus)
                    }
                  >
                    {Object.values(ApplicationStatus).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  {...register("dateApplied")}
                  label="Date Applied"
                  type="date"
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      shrink: true
                    }
                  }}
                  error={!!errors.dateApplied}
                  helperText={errors.dateApplied?.message}
                />
              </Box>

              <TextField
                {...register("jobPostUrl")}
                label="Job Post URL"
                fullWidth
                error={!!errors.jobPostUrl}
                helperText={errors.jobPostUrl?.message}
                placeholder="https://..."
              />
              <TextField
                {...register("location")}
                label="Location"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
              />

              <Box className="flex gap-2 sm:gap-4">
                <TextField
                  {...register("salary_from", {
                    setValueAs: (value) => {
                      if (value === "" || value == null) return undefined;
                      const num = Number(value);
                      return isNaN(num) ? undefined : num;
                    }
                  })}
                  label="Salary From"
                  slotProps={{
                    htmlInput: {
                      type: "number"
                    }
                  }}
                  fullWidth
                  error={!!errors.salary_from}
                  helperText={errors.salary_from?.message}
                  placeholder="e.g., 1000"
                />
                <TextField
                  {...register("salary_to", {
                    setValueAs: (value) => {
                      if (value === "" || value == null) return undefined;
                      const num = Number(value);
                      return isNaN(num) ? undefined : num;
                    }
                  })}
                  label="Salary To"
                  slotProps={{
                    htmlInput: {
                      type: "number"
                    }
                  }}
                  fullWidth
                  error={!!errors.salary_to}
                  helperText={errors.salary_to?.message}
                  placeholder="leave empty if not a range"
                />
              </Box>

              <TextField
                {...register("notes")}
                label="Notes"
                fullWidth
                multiline
                rows={3}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                placeholder="Any additional notes about this application..."
              />
            </Box>
          </DialogContent>

          <DialogActions className="px-4 pb-4 sm:px-8 sm:pb-8">
            <Button
              onClick={handleClose}
              disabled={isSubmitting}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Application"
                : "Add Application"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
