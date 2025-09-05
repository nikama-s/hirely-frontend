import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Application } from "@/types";

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
  console.log(isLoading);
  return (
    <div className="shadow-lg border border-border rounded-2xl bg-white">
      <div className="h-[60vh] min-h-[500px] w-full">
        <DataGrid
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
          autosizeOnMount
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
