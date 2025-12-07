import { Paper, Typography } from "@mui/material";
import { StatusDistribution } from "../../app/(authenticated)/analytics/api";
import { CHART_COLORS } from "../../app/(authenticated)/analytics/constants";

interface StatusBreakdownProps {
  data: StatusDistribution[];
}

export function StatusBreakdown({ data }: StatusBreakdownProps) {
  return (
    <Paper className="p-6 rounded-xl shadow-lg">
      <Typography variant="h5" className="mb-4 font-semibold">
        Status Breakdown
      </Typography>
      <div className="space-y-3 mt-4">
        {data.map((item, index) => (
          <div key={item.status} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
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
  );
}
