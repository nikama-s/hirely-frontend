export interface MonthlyAdminStats {
  month: string;
  users: number;
  applications: number;
}

export interface WeeklyAdminStats {
  week: string;
  users: number;
  applications: number;
}

export interface AdminAnalyticsData {
  monthlyStats: MonthlyAdminStats[];
  weeklyStats: WeeklyAdminStats[];
  averageApplicationsPerUser: number;
  totalUsers: number;
  totalApplications: number;
}

export const fetchAdminAnalytics = async (): Promise<AdminAnalyticsData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin analytics");
  }

  return response.json();
};
