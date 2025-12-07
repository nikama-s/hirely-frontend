"use client";

import { useQuery } from "@tanstack/react-query";
import { Tabs, Tab, Box, Paper, Typography, Skeleton } from "@mui/material";
import { useState } from "react";
import {
  fetchAdminAnalytics,
  AdminAnalyticsData,
  MonthlyAdminStats,
  WeeklyAdminStats
} from "../api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function MonthlyChart({ data }: { data: MonthlyAdminStats[] }) {
  return (
    <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
      <Typography variant="h6" className="mb-4 font-semibold">
        Users & Applications by Month (Last 6 Months)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ left: -10, right: 5, top: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis width={40} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            name="Users"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#10b981"
            name="Applications"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

function WeeklyChart({ data }: { data: WeeklyAdminStats[] }) {
  return (
    <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
      <Typography variant="h6" className="mb-4 font-semibold">
        Users & Applications by Week (Last 12 Weeks)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 0, right: 5, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" angle={-45} textAnchor="end" height={100} />
          <YAxis width={40} />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#3b82f6" name="Users" />
          <Bar dataKey="applications" fill="#10b981" name="Applications" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

function MetricsCards({ analytics }: { analytics: AdminAnalyticsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Paper className="p-4 rounded-xl shadow-md">
        <Typography variant="body2" className="text-muted mb-2">
          Total Users
        </Typography>
        <Typography variant="h4" className="font-bold text-primary">
          {analytics.totalUsers}
        </Typography>
      </Paper>
      <Paper className="p-4 rounded-xl shadow-md">
        <Typography variant="body2" className="text-muted mb-2">
          Total Applications
        </Typography>
        <Typography variant="h4" className="font-bold text-success">
          {analytics.totalApplications}
        </Typography>
      </Paper>
      <Paper className="p-4 rounded-xl shadow-md">
        <Typography variant="body2" className="text-muted mb-2">
          Avg Applications per User
        </Typography>
        <Typography variant="h4" className="font-bold text-warning">
          {analytics.averageApplicationsPerUser.toFixed(1)}
        </Typography>
      </Paper>
    </div>
  );
}

export function AdminAnalytics() {
  const [tabValue, setTabValue] = useState(0);
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => fetchAdminAnalytics(),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    );
  }

  if (!analytics) {
    return (
      <Typography variant="h6" className="text-center text-muted">
        No analytics data available
      </Typography>
    );
  }

  return (
    <div className="space-y-6">
      <MetricsCards analytics={analytics} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          aria-label="analytics tabs"
        >
          <Tab label="Monthly" />
          <Tab label="Weekly" />
        </Tabs>
      </Box>

      <Box>
        {tabValue === 0 && <MonthlyChart data={analytics.monthlyStats} />}
        {tabValue === 1 && <WeeklyChart data={analytics.weeklyStats} />}
      </Box>
    </div>
  );
}
