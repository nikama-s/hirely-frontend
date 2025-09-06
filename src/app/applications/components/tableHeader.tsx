import { Typography, Paper, Skeleton } from "@mui/material";
import { Application } from "@/types";

interface TableHeaderProps {
  applications: Application[];
  isLoading: boolean;
}

export const TableHeader = ({ applications, isLoading }: TableHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
        <div>
          <Typography
            variant="h3"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Job Applications
          </Typography>
          <Typography
            variant="body1"
            className="text-muted mt-2 text-sm md:text-base"
          >
            Track and manage your job applications in one place
          </Typography>
        </div>
        <div className="mt-6 sm:mt-0">
          <Paper
            elevation={2}
            className="rounded-xl mx-auto shadow-md border border-border-light px-5 py-4 min-w-[180px] sm:min-w-[220px] max-w-[400px]"
          >
            <div className="text-center flex flex-col">
              <Typography
                variant="body2"
                className="text-muted-foreground text-sm sm:text-base font-medium mb-2"
              >
                Total Jobs
              </Typography>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={40}
                  height={36}
                  className="self-center"
                  animation="wave"
                />
              ) : (
                <Typography
                  variant="h4"
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {applications?.length || 0}
                </Typography>
              )}
              <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};
