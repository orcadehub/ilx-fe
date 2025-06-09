import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Google Fonts import via style tag (insert in your HTML or main App)
const fontFamily = `'Playfair Display', serif`;

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
  { label: 'About', path: '/about' }
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerList = (
    <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box >
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem button key={label} component={Link} to={path}>
            <ListItemText
              primary={label}
              primaryTypographyProps={{ sx: { fontFamily, fontWeight: 600 } }}
            />
          </ListItem>
        ))}
        <ListItem>
          <Button
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: '#bfa046',
              color: '#bfa046',
              borderRadius: '20px',
              fontFamily,
              fontWeight: 600
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#002366',
              color: '#fff8dc',
              borderRadius: '20px',
              fontFamily,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#00194d' }
            }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
        px: 2
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'black',
            fontFamily
          }}
        >
          InfluexKonnect
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            {navLinks.map(({ label, path }) => (
              <Typography
                key={label}
                variant="button"
                component={Link}
                to={path}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'black',
                  fontFamily,
                  transition: 'color 0.3s',
                  '&:hover': { color: '#002366' }
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        )}

        {!isMobile && (
          <Box>
            <Button
              sx={{
                mr: 1,
                color: '#bfa046',
                borderColor: '#bfa046',
                borderRadius: '20px',
                fontFamily,
                fontWeight: 600
              }}
              variant="outlined"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#002366',
                color: '#fff8dc',
                borderRadius: '20px',
                fontFamily,
                fontWeight: 600,
                '&:hover': { backgroundColor: '#00194d' }
              }}
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </Box>
        )}

        {isMobile && (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
