import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline, IconButton } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import HeaderD from "../components/HeaderD";
import { ChevronLeft, ChevronRight } from "lucide-react";


const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Use a flag to prevent duplicate toast
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: 'var(--primary-color)', position: "relative" }}>
      <CssBaseline />
      <HeaderD handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Toggle Button - positioned independently */}
      <IconButton
        onClick={handleSidebarToggle}
        sx={{
          position: "fixed",
          left: sidebarOpen ? "220px" : "60px", // Adjust based on sidebar width
          top: "2%",
          zIndex: 1200,
          backgroundColor: "var(--bg)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          // width: "30px",
          // height: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: "var(--bgPage)",
          },
          transition: "left 0.5s ease",
          display: { xs: "none", sm: "block" }, // Hide on mobile
        }}
      >
        <div className='flex justify-center items-center h-fit w-fit'>
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </div>
      </IconButton>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - 240px)` } }}
      >
        <Content />
      </Box>
    </Box>
  );
};

export default DashboardPage;
