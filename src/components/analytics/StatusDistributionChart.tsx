import { Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StatusDistribution } from "../../app/(authenticated)/analytics/api";
import { CHART_COLORS } from "../../app/(authenticated)/analytics/constants";

interface StatusDistributionChartProps {
  data: StatusDistribution[];
}

export function StatusDistributionChart({
  data
}: StatusDistributionChartProps) {
  const pieData = data.map((item) => ({
    name: item.status,
    value: item.count,
    percentage: item.percentage
  }));

  return (
    <Paper className="p-4 md:p-6 rounded-xl shadow-lg">
      <Typography variant="h5" className="mb-4 font-semibold">
        Status Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => {
              const dataPoint = pieData.find(
                (d) => d.name === (entry as { name?: string }).name
              );
              if (!dataPoint) return "";

              if (typeof window !== "undefined" && window.innerWidth < 768) {
                return dataPoint.name;
              }

              return `${dataPoint.name}: ${dataPoint.percentage.toFixed(1)}%`;
            }}
            outerRadius={
              typeof window !== "undefined" && window.innerWidth < 460
                ? "50%"
                : "70%"
            }
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}
