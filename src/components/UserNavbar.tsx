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
} from "@mui/material";
import { Logout, AdminPanelSettings } from "@mui/icons-material";
import Link from "next/link";
import { checkAuthStatus, AuthStatus } from "@/utils/auth";

export const UserNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userInfo, setUserInfo] = useState<AuthStatus["userInfo"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authStatus = await checkAuthStatus();
        setUserInfo(authStatus.userInfo || null);
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

  const handleLogout = () => {
    handleMenuClose();
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/logout`;
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
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

        {userInfo && !isLoading && (
          <>
            <Box className="flex items-center gap-3 ml-auto mr-4">
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
            </Box>

            <Box className="flex items-center gap-3">
              <Typography
                variant="body2"
                className="text-white/90 font-medium hidden sm:block"
              >
                {userInfo.email}
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
                  {getInitials(userInfo.email)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                disableScrollLock={true}
              >
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
