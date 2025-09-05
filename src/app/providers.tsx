"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
