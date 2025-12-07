import { Skeleton } from "@mui/material";

export function AnalyticsLoading() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:px-16">
      <div className="mx-auto space-y-6">
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="rectangular" height={400} />
      </div>
    </div>
  );
}
