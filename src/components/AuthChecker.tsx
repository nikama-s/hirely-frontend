"use client";

import { useEffect, useState } from "react";
import { checkAuthStatus } from "@/utils/auth";

interface AuthCheckerProps {
  children: React.ReactNode;
}

export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status");
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus.isAuthenticated);
        if (!authStatus.isAuthenticated) {
          console.log("Not authenticated, redirecting to login");
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login`;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login`;
        setIsAuthenticated(false);
        return;
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
