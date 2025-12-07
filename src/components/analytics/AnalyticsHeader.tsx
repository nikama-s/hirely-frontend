import { Typography } from "@mui/material";

export function AnalyticsHeader() {
  return (
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
  );
}
