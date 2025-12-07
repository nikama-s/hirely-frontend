import { Paper, Typography } from "@mui/material";
import { AnalyticsData } from "../../app/(authenticated)/analytics/api";

interface MetricsCardsProps {
  analytics: AnalyticsData;
}

export function MetricsCards({ analytics }: MetricsCardsProps) {
  return (
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
  );
}
