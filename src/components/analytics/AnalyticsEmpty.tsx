import { Typography } from "@mui/material";

export function AnalyticsEmpty() {
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

