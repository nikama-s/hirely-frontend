import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { Application } from "@/types";
import { useEffect, useRef } from "react";

interface ApplicationTableProps {
  applications: Application[];
  columns: GridColDef[];
  isLoading: boolean;
}

export const ApplicationTable = ({
  applications,
  columns,
  isLoading,
}: ApplicationTableProps) => {
  const apiRef = useGridApiRef();
  const initialLoading = useRef(false);

  useEffect(() => {
    if (
      apiRef.current &&
      applications &&
      applications.length > 0 &&
      !initialLoading.current
    ) {
      apiRef.current?.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1,
        expand: true,
      });
      initialLoading.current = true;
    }
  }, [apiRef, applications]);

  return (
    <div className="shadow-lg border border-border rounded-2xl bg-white">
      <div className="h-[60vh] min-h-[500px] w-full overflow-x-auto">
        <DataGrid
          apiRef={apiRef}
          rows={applications || []}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          className="rounded-2xl border-none"
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid var(--color-border)",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                transform: "translateY(-1px)",
                backgroundColor: "var(--color-border)",
              },
              "&:nth-of-type(even)": {
                "&:hover": {
                  backgroundColor: "var(--color-border)",
                },
                backgroundColor: "var(--color-muted-bg)",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              "& .MuiTablePagination-root": {
                color: "var(--color-muted)",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
