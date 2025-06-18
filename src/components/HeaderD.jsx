import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Tooltip,
  Divider,
  ListItemIcon,
  ClickAwayListener,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  Notifications,
  Menu as MenuIcon,
  Search,
  CardGiftcard,
  AccountBalanceWallet,
  Settings,
  Logout,
  Payment,
  SupportAgent,
  Receipt,
  Person,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


const HeaderD = ({ handleDrawerToggle, userName = "Ajith" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        width: '100%',
        ml: { sm: `240px` },
        bgcolor: "white",
        color: "black",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {isMobile && showSearch && (
          <ClickAwayListener onClickAway={() => setShowSearch(false)}>
            <Box
              sx={{
                position: "absolute",
                top: 10,
                left: 0,
                right: 0,
                mx: "auto",
                px: 2,
                width: "100%",
                zIndex: 1500,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#f1f3f4",
                  px: 2,
                  py: 0.5,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                <Search />
                <InputBase
                  placeholder="Search..."
                  sx={{ ml: 1, flex: 1 }}
                  autoFocus
                />
                <IconButton onClick={() => setShowSearch(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </ClickAwayListener>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f1f3f4",
                px: 2,
                py: 0.5,
                borderRadius: 3,
                "&:hover": { boxShadow: "0 0 5px #ccc" },
              }}
            >
              <Search />
              <InputBase placeholder="Search..." sx={{ ml: 1 }} />
            </Box>
          ) : (
            <Tooltip title="Search">
              <IconButton onClick={toggleSearch}>
                <Search />
              </IconButton>
            </Tooltip>
          )}

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
              <Typography variant="body2" fontWeight={500}>
                3 Offers
              </Typography>
            )}
          </Box>

          <Tooltip title="Wallet">
            <IconButton onClick={() => navigate("/dashboard/wallet")}>
              <AccountBalanceWallet />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton onClick={() => navigate("/dashboard/notifications")}>
              <Notifications />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 34,
                  height: 34,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {userName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Dropdown */}
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
        <MenuItem onClick={() => handleNavigate("/dashboard/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/dashboard/payments")}>
          <ListItemIcon>
            <Payment fontSize="small" />
          </ListItemIcon>
          Payments
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
