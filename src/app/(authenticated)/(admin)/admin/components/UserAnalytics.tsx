"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper
} from "@mui/material";
interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  users: User[];
  totalCount: number;
  nextToken?: string;
  hasMore: boolean;
}

async function fetchUsers(): Promise<UsersResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=50`,
    {
      credentials: "include"
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}
import { fetchUserAnalytics } from "../api/analytics";
import {
  MetricsCards,
  MonthlyChart,
  WeeklyChart,
  StatusDistributionChart,
  StatusBreakdown,
  AnalyticsLoading,
  AnalyticsEmpty
} from "@/components/analytics";

export function UserAnalytics() {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { data: usersData } = useQuery<UsersResponse>({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
    retry: false
  });

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["user-analytics", selectedUserId],
    queryFn: () => fetchUserAnalytics(selectedUserId),
    enabled: !!selectedUserId,
    staleTime: 1000 * 60 * 5
  });

  const selectedUser = usersData?.users.find(
    (u: User) => u.id === selectedUserId
  );

  return (
    <div className="space-y-6">
      <Paper className="p-4 rounded-xl shadow-md">
        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select
            value={selectedUserId}
            label="Select User"
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {usersData?.users.map((user: User) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email} {user.isAdmin && "(Admin)"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {selectedUserId && (
        <Box>
          {selectedUser && (
            <Typography variant="h6" className="mb-4">
              Analytics for: {selectedUser.email}
            </Typography>
          )}

          {isLoading ? (
            <AnalyticsLoading />
          ) : !analytics ? (
            <AnalyticsEmpty />
          ) : (
            <div className="space-y-6">
              <MetricsCards analytics={analytics} />
              <MonthlyChart data={analytics.monthlyStats} />
              <WeeklyChart data={analytics.weeklyStats} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <StatusDistributionChart data={analytics.statusDistribution} />
                <StatusBreakdown data={analytics.statusDistribution} />
              </div>
            </div>
          )}
        </Box>
      )}

      {!selectedUserId && (
        <Paper className="p-8 rounded-xl shadow-md">
          <Typography variant="body1" className="text-center text-muted">
            Please select a user to view their analytics
          </Typography>
        </Paper>
      )}
    </div>
  );
}
