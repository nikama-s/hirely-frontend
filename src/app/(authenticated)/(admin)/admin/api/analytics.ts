import { AnalyticsData } from "@/app/(authenticated)/analytics/api";

export const fetchUserAnalytics = async (
  userId: string
): Promise<AnalyticsData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/analytics`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user analytics");
  }

  return response.json();
};
