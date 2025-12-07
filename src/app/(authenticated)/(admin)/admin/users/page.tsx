"use client";

import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { People, Analytics } from "@mui/icons-material";
import { Tabs, Tab, Box } from "@mui/material";
import UserManagementPageHeader from "./components/user-management-page-header";
import { AdminAnalytics } from "../components/AdminAnalytics";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  totalCount: number;
  nextToken?: string;
  hasMore: boolean;
}

async function fetchUsers(): Promise<UsersResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=50`,
    {
      credentials: "include"
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

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

const columns: GridColDef[] = [
  createColumn("email", "Email", 1.5, {
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {params.value?.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-900">{params.value}</span>
      </div>
    )
  }),
  createColumn("id", "ID", 1, {
    renderCell: (params) => (
      <span
        className="text-xs text-gray-500 font-mono truncate block w-full"
        title={params.value}
      >
        {params.value}
      </span>
    )
  }),
  createColumn("isAdmin", "Role", 0.8, {
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2">
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            params.value
              ? "bg-purple-100 text-purple-800 border border-purple-200"
              : "bg-gray-100 text-gray-800 border border-gray-200"
          }`}
        >
          {params.value ? "Admin" : "User"}
        </span>
      </div>
    )
  }),
  createColumn("createdAt", "Created At", 1, {
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2">
        <span className="font-medium text-gray-900">
          {params.value ? new Date(params.value).toLocaleDateString() : "-"}
        </span>
        {params.value && (
          <span className="text-xs text-gray-500">
            {new Date(params.value).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        )}
      </div>
    )
  }),
  createColumn("updatedAt", "Last Updated", 1, {
    renderCell: (params) => (
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-700">
          {params.value ? new Date(params.value).toLocaleDateString() : "-"}
        </span>
      </div>
    )
  })
];

export default function AdminUsersPage() {
  const [tabValue, setTabValue] = useState(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
    retry: false
  });

  const apiRef = useGridApiRef();
  const initialLoading = useRef(false);

  useEffect(() => {
    if (
      apiRef.current &&
      data?.users &&
      data.users.length > 0 &&
      !initialLoading.current
    ) {
      apiRef.current?.autosizeColumns({
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1,
        expand: true
      });
      initialLoading.current = true;
    }
  }, [apiRef, data?.users]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading users: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <UserManagementPageHeader data={data} />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            aria-label="admin page tabs"
          >
            <Tab icon={<People />} iconPosition="start" label="Users" />
            <Tab icon={<Analytics />} iconPosition="start" label="Analytics" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <People className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  User Directory
                </h2>
              </div>
            </div>

            <div className="h-[65vh] min-h-[500px] w-full">
              <DataGrid
                apiRef={apiRef}
                rows={data?.users || []}
                columns={columns}
                loading={isLoading}
                getRowId={(row) => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 15 }
                  }
                }}
                pageSizeOptions={[10, 15, 25, 50]}
                disableRowSelectionOnClick
                className="border-none"
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    borderBottom: "2px solid var(--color-border)"
                  },
                  "& .MuiDataGrid-row": {
                    "&:hover": {
                      transform: "translateY(-1px)",
                      backgroundColor: "var(--color-border)"
                    },
                    "&:nth-of-type(even)": {
                      "&:hover": {
                        backgroundColor: "var(--color-border)"
                      },
                      backgroundColor: "var(--color-muted-bg)"
                    }
                  },
                  "& .MuiDataGrid-cell": {
                    display: "flex",
                    alignItems: "center"
                  },
                  "& .MuiDataGrid-footerContainer": {
                    "& .MuiTablePagination-root": {
                      color: "var(--color-muted)"
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {tabValue === 1 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <AdminAnalytics />
          </div>
        )}
      </div>
    </div>
  );
}
