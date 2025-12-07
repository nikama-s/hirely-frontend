"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "./api";
import {
  AnalyticsHeader,
  MetricsCards,
  MonthlyChart,
  WeeklyChart,
  StatusDistributionChart,
  StatusBreakdown,
  AnalyticsLoading,
  AnalyticsEmpty
} from "@/components/analytics";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchAnalytics(),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <AnalyticsLoading />;
  }

  if (!analytics) {
    return <AnalyticsEmpty />;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16">
      <div className="mx-auto space-y-6">
        <AnalyticsHeader />
        <MetricsCards analytics={analytics} />
        <MonthlyChart data={analytics.monthlyStats} />
        <WeeklyChart data={analytics.weeklyStats} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatusDistributionChart data={analytics.statusDistribution} />
          <StatusBreakdown data={analytics.statusDistribution} />
        </div>
      </div>
    </div>
  );
}
