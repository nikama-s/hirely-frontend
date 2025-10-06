import Card from "@/components/ui/Card";
import {
  AdminPanelSettings,
  CheckCircle,
  People,
  TrendingUp,
} from "@mui/icons-material";
import { UsersResponse } from "../page";

interface UserManagementPageHeaderProps {
  data: UsersResponse | undefined;
}

export default function UserManagementPageHeader({
  data,
}: UserManagementPageHeaderProps) {
  const { totalCount, users } = data || { totalCount: 0, users: [] };
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
          <AdminPanelSettings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 mt-1">Manage and monitor user accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          title="Total Users"
          count={totalCount || 0}
          icon={
            <div className="p-3 bg-blue-100 rounded-lg">
              <People className="w-6 h-6 text-blue-600" />
            </div>
          }
        />

        <Card
          title="Active Users"
          count={users?.filter((user) => user.enabled).length || 0}
          icon={
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          }
        />

        <Card
          title="Confirmed Users"
          count={
            users?.filter((user) => user.userStatus === "CONFIRMED").length || 0
          }
          icon={
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          }
        />
      </div>
    </div>
  );
}
