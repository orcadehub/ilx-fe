import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  People,
  Chat,
  BarChart,
  Settings,
  InsertChartOutlined,
  ShoppingBag,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const fullDrawerWidth = 240;
const collapsedDrawerWidth = 80;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(true);

  // Log to verify component rendering
  console.log("Sidebar rendered with background: hsl(214.3, 31.8%, 98%)");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "business";

  let menuItems = [];

  if (role === "business") {
    menuItems = [
      
      { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
      { text: "Influencers", icon: <People />, path: "/dashboard/influencers" },
      { text: "Chats", icon: <Chat />, path: "/dashboard/chats" },
      // { text: "Reach", icon: <BarChart />, path: "/dashboard/reach" },
      { text: "Services", icon: <Settings />, path: "/dashboard/services" },
      // {
      //   text: "Reports",
      //   icon: <InsertChartOutlined />,
      //   path: "/dashboard/reports",
      // },
      { text: "Orders", icon: <ShoppingBag />, path: "/dashboard/orders" },
    ];
  } else if (role === "influencer") {
    menuItems = [
      { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
      { text: "Influencers", icon: <People />, path: "/dashboard/influencers" },
      { text: "Chats", icon: <Chat />, path: "/dashboard/chats" },
      // { text: "Reach", icon: <BarChart />, path: "/dashboard/reach" },
      { text: "Services", icon: <Settings />, path: "/dashboard/services" },
      // {
      //   text: "Reports",
      //   icon: <InsertChartOutlined />,
      //   path: "/dashboard/reports",
      // },
      { text: "Orders", icon: <ShoppingBag />, path: "/dashboard/orders" },
      // {
      //   text: "Campaigns",
      //   icon: <InsertChartOutlined />,
      //   path: "/dashboard/campaigns",
      // },
      // { text: "Earnings", icon: <ShoppingBag />, path: "/dashboard/earnings" },
    ];
  } else if (role === "admin") {
    menuItems = [
      { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
      {
        text: "Business Users",
        icon: <People />,
        path: "/dashboard/business-users",
      },
      { text: "Influencers", icon: <People />, path: "/dashboard/influencers" },
      { text: "Analytics", icon: <BarChart />, path: "/dashboard/analytics" },
      { text: "Team Management", icon: <Settings />, path: "/dashboard/team" },
      {
        text: "Reports",
        icon: <InsertChartOutlined />,
        path: "/dashboard/reports",
      },
      { text: "Support", icon: <Chat />, path: "/dashboard/support" },
      { text: "Marketing", icon: <BarChart />, path: "/dashboard/marketing" },
      {
        text: "Service Orders",
        icon: <ShoppingBag />,
        path: "/dashboard/service-orders",
      },
      {
        text: "Wallet Settings",
        icon: <Settings />,
        path: "/dashboard/wallet-settings",
      },
      {
        text: "Site Settings",
        icon: <Settings />,
        path: "/dashboard/site-settings",
      },
    ];
  }

  const handleSidebarToggle = () => setOpen(!open);

  const drawerContent = (
    <Box
      sx={{
        background: "var(--primary-color)",
        height: "100%",
        color: "#1a1a1a",
        borderRight: "1px solid #fff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: open ? 2 : 1,
          background: "#f1f5f9 !important",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {open && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: (theme) => theme.palette.primary.main,
              }}
            >
              Influex<span style={{ color: "#000" }}>Konnect</span>
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={handleSidebarToggle}
          sx={{ color: "#444" }}
        >
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "#e0e0e0" }} />

      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: isActive ? "#ffffff" : "#333",
                borderRadius: 2,
                m: 1,
                px: open ? 2 : 1,
                justifyContent: open ? "flex-start" : "center",
                backgroundColor: isActive ? "#1070e0" : "transparent",
                "&:hover": {
                  backgroundColor: "#bccfe5",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: fullDrawerWidth,
              boxSizing: "border-box",
              background: "var(--primary-color)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: "none", sm: "block" },
            width: open ? fullDrawerWidth : collapsedDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? fullDrawerWidth : collapsedDrawerWidth,
              boxSizing: "border-box",
              background: "var(--primary-color)",
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;