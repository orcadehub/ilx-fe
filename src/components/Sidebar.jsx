import React from "react";
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
  InsertChartOutlined,
  ShoppingBag,
  Menu as MenuIcon,
  ChevronLeft,
} from "@mui/icons-material";
import { useCustomTheme } from './ThemeContextProvider'
import { Link, useLocation } from "react-router-dom";
import { ChartNoAxesColumnIncreasing, FileSpreadsheet, LayoutDashboard, MessageSquare, Moon, Settings, ShoppingCart, Sun, Users } from "lucide-react";
import logoImg from '../assets/logoIC.jpg';
const fullDrawerWidth = 240;
const collapsedDrawerWidth = 80;

const Sidebar = ({ mobileOpen, handleDrawerToggle, open }) => {
  const { myTheme, toggleTheme, setLightTheme, setDarkTheme } = useCustomTheme();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Log to verify component rendering
  // console.log("Sidebar rendered with background: hsl(214.3, 31.8%, 98%)");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "business";

  let menuItems = [];

  if (role === "business") {
    menuItems = [

      { text: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
      { text: "Influencers", icon: <Users size={18} />, path: "/dashboard/influencers" },
      { text: "Chats", icon: <MessageSquare size={18} />, path: "/dashboard/chats" },
      { text: "Reach", icon: <ChartNoAxesColumnIncreasing size={18} />, path: "/dashboard/reach" },
      { text: "Services", icon: <Settings size={18} />, path: "/dashboard/services" },
      {
        text: "Reports",
        icon: <FileSpreadsheet size={18} />,
        path: "/dashboard/reports",
      },
      { text: "Orders", icon: <ShoppingCart size={18} />, path: "/dashboard/orders" },
    ];
  } else if (role === "influencer") {
    menuItems = [
      { text: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
      { text: "Chats", icon: <MessageSquare size={18} />, path: "/dashboard/chats" },
      { text: "Orders", icon: <ShoppingCart size={18} />, path: "/dashboard/orders" },
      { text: "Services", icon: <Settings size={18} />, path: "/dashboard/services" },
    ];
  } else if (role === "admin") {
    menuItems = [
      { text: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
      {
        text: "Business Users",
        icon: <People />,
        path: "/dashboard/business-users",
      },
      { text: "Influencers", icon: <Users size={18} />, path: "/dashboard/influencers" },
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
        icon: <ShoppingCart size={18} />,
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




  const drawerContent = (
    <Box
      sx={{
        background: "var(--bgPage2)",
        height: "100%",
        color: "var(--text)",
        position: "relative",
        // borderRight: "1px solid #fff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: open ? 2 : 1,
          // background: "var(--primary-color)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          {open ? (
            <Typography
              variant="h6"
              // sx={{
              //   fontWeight: 700,
              //   fontSize: "1.5rem",
              //   color: (theme) => theme.palette.primary.main,
              // }}
              className="!font-bold !text-[1.5rem]  !text-[var(--primary)]"
            >
              Influex
              <span className='bg-[var(--bg)] !text-[var(--text)]' >Connect</span>
            </Typography>
          ) : <div className="w-8"><img src={logoImg} alt="Logo" /> </div>}
        </Box>
      </Toolbar>


      {/* <Divider
        sx={{ borderColor: "#e0e0e0" }}
      /> */}

      <List className='relative h-[calc(100vh-70px)] text-[var(--mutedText)] px-2'>
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
                color: isActive ? "#ffffff" : "text-[var(--text)] ",
                borderRadius: 2,
                my: 1,
                // py:1,
                justifyContent: open ? "flex-start" : "center",
                backgroundColor: isActive ? "#1070e0" : "transparent",
                "&:hover": {
                  backgroundColor: isActive ? "#1070e0" : "var(--hover)",
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
      <div className='border-t border-[var(--border)] pt-3 absolute flex justify-center items-center w-full bottom-3 gap-2 text-[var(--text)]'>
        {!open && (
          <div className="p-2 border !border-[var(--border)] rounded-xl hover:bg-[var(--hover)] hover:text-[var(--textSec)]">
            {myTheme === "dark" ? (
              <Sun id="sun" size={16} onClick={setLightTheme} />
            ) : (
              <Moon id="moon" size={16} onClick={setDarkTheme} />
            )}
          </div>
        )}



        {open && <div className="flex  justify-center items-center  gap-2">
          <button
            onClick={setLightTheme}
            className={`${open ? "px-4 py-2" : "px-2 py-2"}  flex !justify-center items-center !rounded-xl dark:border-gray-600 hover:bg-[var(--hover)] hover:text-[var(--textSec)] border !border-[var(--border)]`}
          >

            <span className='flex justify-center items-center text-12 gap-2'>
              <Sun size={12} /> {open && "Light"}</span>
          </button>
          <button
            onClick={setDarkTheme}
            className={`${open ? "px-4 py-2" : "px-2 py-2"}  flex !justify-center items-center !rounded-xl  dark:border-gray-600 hover:bg-[var(--hover)] hover:text-[var(--textSec)] border !border-[var(--border)]`}
          >

            <span className='flex justify-center items-center text-12 gap-2'>
              <Moon size={12} />{open && "Dark"}</span>
          </button>
        </div>}
      </div>
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