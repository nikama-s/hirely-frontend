import { AuthChecker } from "@/components/AuthChecker";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthChecker>{children}</AuthChecker>;
}
