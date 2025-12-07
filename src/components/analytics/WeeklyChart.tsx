import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { WeeklyStats } from "../../app/(authenticated)/analytics/api";

interface WeeklyChartProps {
  data: WeeklyStats[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
      <Typography variant="h5" className="mb-4 font-semibold">
        Applications by Week (Last 12 Weeks)
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 0, right: 5, top: 5, bottom: 5 }}>
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
  );
}
