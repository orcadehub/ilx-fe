import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Tooltip,
  Divider,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import {
  Notifications,
  CardGiftcard,
  AccountBalanceWallet,
  Settings,
  Favorite,
  Logout,
  Payment,
  SupportAgent,
  Receipt,
  Person,
  KeyboardArrowDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role || "business"; // default to business
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const HeaderD = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState({
    name: "Name",
    email: "user@gmail.com",
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleMenuClose();
    navigate("/login");
  };

  useEffect(() => {
    const fetchAndUpdateUser = async () => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (!data?.email) return;

      setUser(data); // Set initial user from localStorage

      try {
        const response = await fetch(
          `${baseURL}/api/user-details/${data.email}`
        );
        if (!response.ok) throw new Error("Failed to fetch user data");

        const updatedUser = await response.json();

        // Update localStorage and state
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchAndUpdateUser();
  }, []);

  return (
    <AppBar
      sx={{
        position: "fixed",
        width: "100%",
        ml: { sm: `240px` },
        bgcolor: "var(--primary-color)",
        color: "black",
        backdropFilter: "blur(20px)", // apply blur to the background behind it
        WebkitBackdropFilter: "blur(10px)", // for Safari support
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        // borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 1 }}>
        {/* Mobile Drawer Toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Offers */}
          {role !== "admin" && (
            <Box
              sx={{
                px: 2,
                py: 0.8,
                bgcolor: "#fff8e1",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                border: "1px solid #ffe0b2",
                "&:hover": { boxShadow: "0 0 5px #ffd54f" },
              }}
              onClick={() => navigate("/dashboard/offers")}
            >
              <CardGiftcard sx={{ color: "#ff9800" }} />
              {!isMobile && (
                <Typography variant="body2" fontWeight={500} color="black">
                  3 Offers
                </Typography>
              )}
            </Box>
          )}

          {/* Wallet */}
          {role !== "admin" && (
            <Tooltip title="Wallet">
              <IconButton
                onClick={() => navigate("/dashboard/wallet")}
                sx={{ color: "black" }}
              >
                <AccountBalanceWallet />
              </IconButton>
            </Tooltip>
          )}

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => navigate("/dashboard/notifications")}
              sx={{ color: "black" }}
            >
              <Notifications />
            </IconButton>
          </Tooltip>

          {/* Wishlist */}
          {role !== "admin" && (
            <Tooltip title="My Wishlist">
              <IconButton
                onClick={() => navigate("/dashboard/mywishlist")}
                sx={{ color: "black" }}
              >
                <Favorite />
              </IconButton>
            </Tooltip>
          )}

          {/* Profile with name and email */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 1,
              py: 0.5,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#e5e9ed" },
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              src={user.profile_pic || ""}
              sx={{
                bgcolor: user.profile_pic ? "transparent" : "#1976d2",
                width: 34,
                height: 34,
                fontSize: 14,
                fontWeight: 500,
                color: user.profile_pic ? "inherit" : "white",
              }}
            >
              {!user.profile_pic && (user.fullname?.[0] || "U")}
            </Avatar>

            {!isMobile && (
              <>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body2" fontWeight="bold" color="black">
                    {user.fullname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <KeyboardArrowDown sx={{ color: "black" }} />
              </>
            )}
          </Box>
        </Box>
      </Toolbar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate("/dashboard/profile")}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/dashboard/billing")}>
          <ListItemIcon>
            <Receipt fontSize="small" />
          </ListItemIcon>
          Billing
        </MenuItem>

        <MenuItem onClick={() => handleNavigate("/dashboard/payments")}>
          <ListItemIcon>
            <Payment fontSize="small" />
          </ListItemIcon>
          Payments
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/dashboard/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/dashboard/support")}>
          <ListItemIcon>
            <SupportAgent fontSize="small" />
          </ListItemIcon>
          Support
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default HeaderD;
