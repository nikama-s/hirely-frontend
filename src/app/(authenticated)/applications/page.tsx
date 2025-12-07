"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplications, useDeleteApplicationMutation } from "./api";
import { Application, ApplicationStatus } from "@/types";
import { getApplicationColumns } from "./utils/columns";
import {
  TableHeader,
  ApplicationTable,
  StatCard,
  AddApplicationForm
} from "@/components/applications";
import {
  WorkOutline as AppliedIcon,
  PersonSearch as InterviewIcon,
  EmojiEvents as OfferedIcon,
  ThumbDownAlt as RejectedIcon
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function ApplicationsPage() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(),
    staleTime: 1000 * 60 * 5
  });

  const [addApplicationOpen, setAddApplicationOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deleteMutation = useDeleteApplicationMutation();

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setAddApplicationOpen(true);
  };

  const handleDelete = async (application: Application) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the application for ${application.company} - ${application.jobTitle}?`
      )
    ) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(application.id);
      toast.success("Application deleted successfully", { duration: 3000 });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete application"
      );
    }
  };

  const columns = getApplicationColumns(handleEdit, handleDelete);

  const handleCloseForm = () => {
    setAddApplicationOpen(false);
    setEditingApplication(null);
  };

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    if (!searchQuery.trim()) return applications;

    const query = searchQuery.toLowerCase().trim();
    return applications.filter((app) => {
      const company = app.company?.toLowerCase() || "";
      const jobTitle = app.jobTitle?.toLowerCase() || "";
      const location = app.location?.toLowerCase() || "";
      const notes = app.notes?.toLowerCase() || "";
      const status = app.status?.toLowerCase() || "";

      return (
        company.includes(query) ||
        jobTitle.includes(query) ||
        location.includes(query) ||
        notes.includes(query) ||
        status.includes(query)
      );
    });
  }, [applications, searchQuery]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16 relative">
      <div className="mx-auto">
        <TableHeader applications={applications || []} isLoading={isLoading} />

        <div className="mb-4">
          <TextField
            fullWidth
            placeholder="Search by company, job title, location, notes, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-muted" />
                  </InputAdornment>
                )
              }
            }}
            sx={{
              "& .MuiOutlinedInput-input": {
                paddingTop: "8px",
                paddingBottom: "8px"
              }
            }}
          />
          {searchQuery && (
            <p className="text-sm text-muted mt-2">
              Showing {filteredApplications.length} of{" "}
              {applications?.length || 0} applications
            </p>
          )}
        </div>

        <ApplicationTable
          applications={filteredApplications}
          columns={columns}
          isLoading={isLoading}
        />

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            value={
              filteredApplications?.filter(
                (app) => app.status !== ApplicationStatus.NOT_APPLIED
              ).length || 0
            }
            label="Applications Sent"
            color="primary"
            icon={AppliedIcon}
            isLoading={isLoading}
          />
          <StatCard
            value={
              filteredApplications?.filter(
                (app) => app.status === ApplicationStatus.INTERVIEW
              ).length || 0
            }
            label="Upcoming Interviews"
            color="warning"
            icon={InterviewIcon}
            isLoading={isLoading}
          />
          <StatCard
            value={
              filteredApplications?.filter(
                (app) =>
                  app.status === ApplicationStatus.OFFERED ||
                  app.status === ApplicationStatus.ACCEPTED
              ).length || 0
            }
            label="Offers Received"
            color="success"
            icon={OfferedIcon}
            isLoading={isLoading}
          />
          <StatCard
            value={
              filteredApplications?.filter(
                (app) =>
                  app.status === ApplicationStatus.REJECTED ||
                  app.status === ApplicationStatus.GHOSTED
              ).length || 0
            }
            label="Rejected / Ghosted"
            color="error"
            icon={RejectedIcon}
            isLoading={isLoading}
          />
        </div>
        <AddApplicationForm
          open={addApplicationOpen}
          setOpen={handleCloseForm}
          editingApplication={editingApplication}
        />
      </div>

      <Button
        onClick={() => {
          setEditingApplication(null);
          setAddApplicationOpen(true);
        }}
        className="fixed bottom-5 right-5 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md md:text-base rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300 z-50"
      >
        + Add
      </Button>
    </div>
  );
}
