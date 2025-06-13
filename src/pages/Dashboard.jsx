
// pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import HeaderD from '../components/HeaderD';

const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderD handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - 240px)` } }}>
        <Content />
      </Box>
    </Box>
  );
};

export default DashboardPage;


