export interface MonthlyStats {
  month: string;
  total: number;
  offers: number;
  rejected: number;
}

export interface WeeklyStats {
  week: string;
  total: number;
  offers: number;
  rejected: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  monthlyStats: MonthlyStats[];
  weeklyStats: WeeklyStats[];
  statusDistribution: StatusDistribution[];
  totalApplications: number;
  offerRate: number;
  rejectionRate: number;
}

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
};
