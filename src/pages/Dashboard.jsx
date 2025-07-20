import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import HeaderD from "../components/HeaderD";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Use a flag to prevent duplicate toast
    if (!token) {
      const toastShown = sessionStorage.getItem("toastShown");
      if (!toastShown) {
        toast.warn("Please login to access the dashboard");
        sessionStorage.setItem("toastShown", "true");
      }
      navigate("/login");
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderD handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
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
