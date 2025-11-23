export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user: User | null;
}

export const checkAuthStatus = async (): Promise<AuthStatus> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        return { isAuthenticated: false, user: null };
    }

    const data = await response.json();
    return { isAuthenticated: true, user: data.user };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

export const handleGetStarted = async () => {
  try {
    const authStatus = await checkAuthStatus();

    if (authStatus.isAuthenticated) {
      // User is logged in, go to applications
      window.location.href = "/applications";
    } else {
      // User is not logged in, redirect to frontend login
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    // Fallback: redirect to login
    window.location.href = "/login";
  }
};
