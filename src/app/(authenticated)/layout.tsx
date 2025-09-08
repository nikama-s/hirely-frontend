import { AuthChecker } from "@/components/AuthChecker";
import { UserNavbar } from "@/components/UserNavbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthChecker>
      <div className="flex flex-col min-h-screen">
        <UserNavbar />
        {children}
      </div>
    </AuthChecker>
  );
}
