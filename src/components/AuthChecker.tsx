"use client";

import { useEffect, useState } from "react";
import { checkAuthStatus } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface AuthCheckerProps {
  children: React.ReactNode;
}

export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status");
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus.isAuthenticated);
        if (!authStatus.isAuthenticated) {
          console.log("Not authenticated, redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isChecking || !isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
};
