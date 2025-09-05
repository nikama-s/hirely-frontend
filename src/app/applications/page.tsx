"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "./api";
import { ApplicationStatus } from "@/types";
import { getApplicationColumns } from "./utils/columns";
import { TableHeader, ApplicationTable, StatCard } from "./components";
import {
  WorkOutline as AppliedIcon,
  PersonSearch as InterviewIcon,
  EmojiEvents as OfferedIcon,
  ThumbDownAlt as RejectedIcon,
} from "@mui/icons-material";

export default function ApplicationsPage() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(),
  });

  const columns = getApplicationColumns();

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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
                (app) => app.status === ApplicationStatus.APPLIED
              ).length || 0
            }
            label="Applied"
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
            label="Interviews"
            color="warning"
            icon={InterviewIcon}
            isLoading={isLoading}
          />
          <StatCard
            value={
              applications?.filter(
                (app) => app.status === ApplicationStatus.OFFERED
              ).length || 0
            }
            label="Offers"
            color="success"
            icon={OfferedIcon}
            isLoading={isLoading}
          />
          <StatCard
            value={
              applications?.filter(
                (app) => app.status === ApplicationStatus.REJECTED
              ).length || 0
            }
            label="Rejected"
            color="error"
            icon={RejectedIcon}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
