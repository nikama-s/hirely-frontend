import { Paper, Typography, Skeleton } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
  value: number;
  label: string;
  color: "primary" | "warning" | "success" | "error";
  icon: SvgIconComponent;
  isLoading?: boolean;
}

const colorClasses = {
  primary: "text-primary",
  warning: "text-warning",
  success: "text-success",
  error: "text-error",
};

export const StatCard = ({
  value,
  label,
  color,
  icon: IconComponent,
  isLoading = false,
}: StatCardProps) => {
  return (
    <Paper
      elevation={2}
      className="rounded-2xl shadow-lg border border-border p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isLoading ? (
            <Skeleton
              variant="text"
              width={50}
              height={36}
              className="mb-1"
              animation="wave"
            />
          ) : (
            <Typography
              variant="h4"
              className={`font-bold ${colorClasses[color]} mb-1 text-3xl`}
            >
              {value}
            </Typography>
          )}
          <Typography className="text-muted font-medium">{label}</Typography>
        </div>
        <div
          className={`${colorClasses[color]} opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
        >
          <IconComponent className="text-4xl" />
        </div>
      </div>
    </Paper>
  );
};
