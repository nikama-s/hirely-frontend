"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApplications } from "./api";
import { Application, ApplicationStatus } from "@/types";
import { getApplicationColumns } from "./utils/columns";
import {
  TableHeader,
  ApplicationTable,
  StatCard,
  AddApplicationForm,
} from "./components";
import {
  WorkOutline as AppliedIcon,
  PersonSearch as InterviewIcon,
  EmojiEvents as OfferedIcon,
  ThumbDownAlt as RejectedIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export default function ApplicationsPage() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(),
    staleTime: 1000 * 60 * 5,
  });
  const queryClient = useQueryClient();

  const [addApplicationOpen, setAddApplicationOpen] = useState(false);

  const columns = getApplicationColumns();

  const handleApplicationAdded = (application: Application) => {
    toast.success("Application added successfully", {
      duration: 3000,
    });
    // to not refetch immediately
    queryClient.setQueryData(["applications"], (old: Application[]) => [
      ...old,
      application,
    ]);
    // refetch the next time it's needed (reload, in the future sorting changes, etc.)
    queryClient.invalidateQueries({ queryKey: ["applications"] });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16 relative">
      <div className="mx-auto">
        <TableHeader applications={applications || []} isLoading={isLoading} />

        <ApplicationTable
          applications={applications || []}
          columns={columns}
          isLoading={isLoading}
        />

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            value={
              applications?.filter(
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
              applications?.filter(
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
              applications?.filter(
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
              applications?.filter(
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
          onApplicationAdded={handleApplicationAdded}
          open={addApplicationOpen}
          setOpen={setAddApplicationOpen}
        />
      </div>

      <Button
        onClick={() => setAddApplicationOpen(true)}
        className="fixed bottom-5 right-5 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md md:text-base rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300 z-50"
      >
        + Add
      </Button>
    </div>
  );
}
