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
        <Typography
          variant="h6"
          component="div"
          className="flex-grow font-bold text-white"
        >
          Hirely
        </Typography>

        {userInfo && !isLoading && (
          <Box className="flex items-center gap-3">
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
              sx={{
                "& .MuiPaper-root": {
                  mt: 1,
                  minWidth: 160,
                  borderRadius: 2,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                },
                "& .MuiMenuItem-root": {
                  py: 1.5,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "rgba(37, 99, 235, 0.04)",
                  },
                },
              }}
              disableScrollLock={true}
            >
              <MenuItem onClick={handleLogout} className="gap-1.5 text-red-500">
                <Logout fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
