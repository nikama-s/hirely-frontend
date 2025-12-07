import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { MonthlyStats } from "../../app/(authenticated)/analytics/api";

interface MonthlyChartProps {
  data: MonthlyStats[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
      <Typography variant="h5" className="mb-4 font-semibold">
        Applications by Month (Last 6 Months)
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
  );
}
