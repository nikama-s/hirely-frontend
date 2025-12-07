import { GridColDef } from "@mui/x-data-grid";
import { ApplicationStatus, Application } from "@/types";
import { getStatusStyle, getStatusLabel } from "@/utils";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const createColumn = (
  field: string,
  headerName: string,
  flex: number,
  options: Partial<GridColDef> = {}
): GridColDef => ({
  field,
  headerName,
  flex,
  minWidth: 120,
  headerClassName: "font-semibold text-muted",
  ...options
});

export const getApplicationColumns = (
  onEdit?: (application: Application) => void,
  onDelete?: (application: Application) => void
): GridColDef[] => [
  createColumn("company", "Company", 1),
  createColumn("jobTitle", "Job Title", 1),
  createColumn("status", "Status", 0.8, {
    renderCell: (params) => {
      const status = params.value as ApplicationStatus;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      );
    }
  }),
  createColumn("dateApplied", "Date Applied", 0.8, {
    type: "date",
    valueGetter: (value) => (value ? new Date(value) : undefined),
    renderCell: (params) =>
      params.value ? (
        <span className="font-medium text-success">
          {new Date(params.value).toLocaleDateString()}
        </span>
      ) : (
        <span className="font-medium text-muted">Not Applied</span>
      )
  }),
  createColumn("location", "Location", 1),
  createColumn("salary", "Salary", 0.8, {
    renderCell: (params) => {
      const salaryFrom = params.row.salary_from;
      const salaryTo = params.row.salary_to;

      let displayText = "N/A";

      if (salaryFrom && salaryTo) {
        displayText = `$${salaryFrom.toLocaleString()} - $${salaryTo.toLocaleString()}`;
      } else if (salaryFrom || salaryTo) {
        displayText = salaryFrom
          ? `$${salaryFrom.toLocaleString()}`
          : `$${salaryTo.toLocaleString()}`;
      }

      return (
        <span className="font-medium text-success">
          {displayText === "N/A" ? (
            <span className="text-muted">N/A</span>
          ) : (
            displayText
          )}
        </span>
      );
    }
  }),
  createColumn("jobPostUrl", "Job Post", 0.6, {
    renderCell: (params) =>
      params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-primary hover:!text-primary/80"
        >
          View Job Post
        </a>
      ) : (
        <span className="text-muted-foreground text-sm">N/A</span>
      )
  }),
  createColumn("notes", "Notes", 1.5, {
    renderCell: (params) => (
      <span
        className="text-sm text-muted truncate max-w-[180px]"
        title={params.value}
      >
        {params.value || "No notes"}
      </span>
    )
  }),
  createColumn("actions", "Actions", 0.6, {
    renderCell: (params) => {
      const application = params.row as Application;
      return (
        <div className="flex items-center justify-center gap-1 h-full">
          <IconButton
            size="small"
            onClick={() => onEdit?.(application)}
            className="text-primary/70 hover:text-primary"
            aria-label="edit application"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete?.(application)}
            className="text-error/70 hover:text-error"
            aria-label="delete application"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      );
    },
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center"
  })
];
