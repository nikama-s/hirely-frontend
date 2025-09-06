export interface AuthStatus {
  isAuthenticated: boolean;
  userInfo?: {
    sub: string;
    email: string;
    name?: string;
    [key: string]: string | number | boolean | undefined;
  };
  loginUrl: string;
  logoutUrl: string;
}

export const checkAuthStatus = async (): Promise<AuthStatus> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
    credentials: "include", // Important for session cookies
  });

  if (!response.ok) {
    throw new Error("Failed to check auth status");
  }

  return response.json();
};

export const handleGetStarted = async () => {
  try {
    const authStatus = await checkAuthStatus();

    if (authStatus.isAuthenticated) {
      // User is logged in, go to applications
      window.location.href = "/applications";
    } else {
      // User is not logged in, redirect to backend login
      // This will redirect to Cognito and then back to frontend
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    // Fallback: redirect to login
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/login`;
  }
};
