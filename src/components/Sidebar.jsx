import React from 'react';
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
  Box,
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
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

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
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
        }}
      >
        <Typography variant="h6" noWrap>
          InfluexKonnect
        </Typography>
        <Box sx={{ display: { sm: 'none' } }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
      </Toolbar>

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
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? 'inset 4px 0px 0px #ffcc00' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: 36,
                  ml: isActive ? '-4px' : 0,
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'translateX(2px)' : 'none',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#fff' : '#ccc',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
