import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Dashboard,
  People,
  Chat,
  TrendingUp,
  Build,
  Assessment,
  ShoppingCart,
  Close,
  Menu as MenuIcon,
  ChevronLeft,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const fullDrawerWidth = 240;
const collapsedDrawerWidth = 70;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Influencers', icon: <People />, path: '/dashboard/influencers' },
  { text: 'Chats', icon: <Chat />, path: '/dashboard/chats' },
  { text: 'Reach', icon: <TrendingUp />, path: '/dashboard/reach' },
  { text: 'Services', icon: <Build />, path: '/dashboard/services' },
  { text: 'Reports', icon: <Assessment />, path: '/dashboard/reports' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/dashboard/orders' },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(true); // Desktop sidebar toggle

  const handleSidebarToggle = () => setOpen(!open);

  const drawerContent = (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
        height: '100%',
        color: '#fff',
        px: 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: open ? 'space-between' : 'center',
          alignItems: 'center',
          px: 1,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap>
            InfluexKonnect
          </Typography>
        )}
        <IconButton onClick={handleSidebarToggle} sx={{ color: 'white' }}>
          {open ? <ChevronLeft /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 1 }} />

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
                color: 'white',
                borderRadius: 1,
                mt: 1,
                px: open ? 2 : 1,
                justifyContent: open ? 'flex-start' : 'center',
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                boxShadow: isActive ? 'inset 4px 0px 0px #ffcc00' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? '#fff' : '#ccc',
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: fullDrawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer - Hide on mobile */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: open ? fullDrawerWidth : collapsedDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? fullDrawerWidth : collapsedDrawerWidth,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
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
