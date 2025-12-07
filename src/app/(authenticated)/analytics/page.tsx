"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "./api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Paper, Typography, Skeleton } from "@mui/material";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1"
];

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16">
        <div className="mx-auto space-y-6">
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="rectangular" height={400} />
          <Skeleton variant="rectangular" height={400} />
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16">
        <div className="mx-auto">
          <Typography variant="h4" className="text-center text-muted">
            No analytics data available
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16">
      <div className="mx-auto space-y-6">
        <div className="mb-8">
          <Typography
            variant="h3"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Analytics & Insights
          </Typography>
          <Typography variant="body1" className="text-muted mt-2">
            Track your job application progress and trends
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Paper className="p-4 rounded-xl shadow-md">
            <Typography variant="body2" className="text-muted mb-2">
              Total Applications
            </Typography>
            <Typography variant="h4" className="font-bold text-primary">
              {analytics.totalApplications}
            </Typography>
          </Paper>
          <Paper className="p-4 rounded-xl shadow-md">
            <Typography variant="body2" className="text-muted mb-2">
              Offer Rate
            </Typography>
            <Typography variant="h4" className="font-bold text-success">
              {analytics.offerRate.toFixed(1)}%
            </Typography>
          </Paper>
          <Paper className="p-4 rounded-xl shadow-md">
            <Typography variant="body2" className="text-muted mb-2">
              Rejection Rate
            </Typography>
            <Typography variant="h4" className="font-bold text-error">
              {analytics.rejectionRate.toFixed(1)}%
            </Typography>
          </Paper>
        </div>

        <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
          <Typography variant="h5" className="mb-4 font-semibold">
            Applications by Month (Last 6 Months)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={analytics.monthlyStats}
              margin={{ left: -10, right: 5, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis width={40} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                name="Total"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="offers"
                stroke="#10b981"
                name="Offers"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#ef4444"
                name="Rejected"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
          <Typography variant="h5" className="mb-4 font-semibold">
            Applications by Week (Last 12 Weeks)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={analytics.weeklyStats}
              margin={{ left: 0, right: 5, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" angle={-45} textAnchor="end" height={100} />
              <YAxis width={40} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" name="Total" />
              <Bar dataKey="offers" fill="#10b981" name="Offers" />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
            <Typography variant="h5" className="mb-4 font-semibold">
              Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusDistribution.map((item) => ({
                    name: item.status,
                    value: item.count,
                    percentage: item.percentage
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => {
                    const pieData = analytics.statusDistribution.map(
                      (item) => ({
                        name: item.status,
                        value: item.count,
                        percentage: item.percentage
                      })
                    );
                    const dataPoint = pieData.find(
                      (d) => d.name === (entry as { name?: string }).name
                    );
                    if (!dataPoint) return "";

                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < 768
                    ) {
                      return dataPoint.name;
                    }

                    return `${dataPoint.name}: ${dataPoint.percentage.toFixed(
                      1
                    )}%`;
                  }}
                  outerRadius={
                    typeof window !== "undefined" && window.innerWidth < 460
                      ? "50%"
                      : "70%"
                  }
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper className="p-6 rounded-xl shadow-lg">
            <Typography variant="h5" className="mb-4 font-semibold">
              Status Breakdown
            </Typography>
            <div className="space-y-3 mt-4">
              {analytics.statusDistribution.map((item, index) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                    <Typography variant="body1" className="capitalize">
                      {item.status}
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography variant="body1" className="font-semibold">
                      {item.count}
                    </Typography>
                    <Typography variant="body2" className="text-muted">
                      {item.percentage.toFixed(1)}%
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}
