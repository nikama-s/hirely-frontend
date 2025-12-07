"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Divider
} from "@mui/material";
import {
  Logout,
  AdminPanelSettings,
  Analytics,
  WorkOutline
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkAuthStatus, AuthStatus } from "@/utils/auth";

export const UserNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<AuthStatus["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authStatus = await checkAuthStatus();
        setUser(authStatus.user || null);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };

  const handleMenuItemClick = () => {
    handleMenuClose();
  };

  const getInitials = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  return (
    <AppBar position="static" className="bg-violet-500 shadow-md">
      <Toolbar className="px-4 sm:px-6">
        <Link href="/applications">
          <Typography
            variant="h6"
            component="div"
            className="font-bold text-white cursor-pointer hover:text-white/90 transition-colors duration-200"
          >
            Hirely
          </Typography>
        </Link>

        {user && !isLoading && (
          <>
            <Box className="hidden md:flex items-center gap-3 ml-auto mr-4">
              <Link href="/applications">
                <Button
                  variant="outlined"
                  startIcon={<WorkOutline />}
                  className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                  size="small"
                >
                  Applications
                </Button>
              </Link>
              <Link href="/analytics">
                <Button
                  variant="outlined"
                  startIcon={<Analytics />}
                  className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                  size="small"
                >
                  Analytics
                </Button>
              </Link>
              {user.isAdmin && (
                <Link href="/admin/users">
                  <Button
                    variant="outlined"
                    startIcon={<AdminPanelSettings />}
                    className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                    size="small"
                  >
                    Admin Panel
                  </Button>
                </Link>
              )}
            </Box>

            {/* Spacer for mobile to push user icon to the right */}
            <Box className="flex-grow md:hidden" />

            <Box className="flex items-center gap-3">
              <Typography
                variant="body2"
                className="text-white/90 font-medium hidden sm:block"
              >
                {user.email}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                className="hover:bg-white/10"
              >
                <Avatar className="w-9 h-9 bg-gradient-to-r from-white/30 to-white/10 text-white font-bold border-2 border-white/20">
                  {getInitials(user.email)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                disableScrollLock={true}
              >
                <Link href="/applications" className="md:hidden">
                  <MenuItem
                    onClick={handleMenuItemClick}
                    className={`gap-1.5 ${
                      pathname === "/applications"
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <WorkOutline fontSize="small" />
                    Applications
                  </MenuItem>
                </Link>
                <Link href="/analytics" className="md:hidden">
                  <MenuItem
                    onClick={handleMenuItemClick}
                    className={`gap-1.5 ${
                      pathname === "/analytics"
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <Analytics fontSize="small" />
                    Analytics
                  </MenuItem>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin/users" className="md:hidden">
                    <MenuItem
                      onClick={handleMenuItemClick}
                      className={`gap-1.5 ${
                        pathname?.startsWith("/admin")
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                    >
                      <AdminPanelSettings fontSize="small" />
                      Admin Panel
                    </MenuItem>
                  </Link>
                )}
                <Divider className="md:hidden" />
                <MenuItem
                  onClick={handleLogout}
                  className="gap-1.5 text-red-500"
                >
                  <Logout fontSize="small" />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
