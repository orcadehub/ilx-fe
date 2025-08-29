import React from "react";
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
  useMediaQuery,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

// Font families
const headingFont = `'Playfair Display', serif`;
const bodyFont = `'Inter', sans-serif`;

// Updated color palette
const primaryColor = "#0A1A4C"; // Deep navy
const accentColor = "#000000ff";  // Gold
const textColor = "#1C1C1C";    // Neutral dark

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerList = (
    <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box>
        <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
      </Box>
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem button key={label} component={Link} to={path}>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                sx: { fontFamily: bodyFont, fontWeight: 400, color: textColor,fontSize:12, },
              }}
            />
          </ListItem>
        ))}
        <ListItem>
          <Button
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: accentColor,
              color: accentColor,
              borderRadius: "20px",
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize:12,
            }}
            component={Link}
            to="/login"
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: primaryColor,
              color: "#fff",
              borderRadius: "20px",
              fontFamily: bodyFont,
              fontWeight: 600,
               fontSize:12,
              "&:hover": { backgroundColor: "#08133a" },
            }}
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--primary-color)",
        color: textColor,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: primaryColor,
            letterSpacing: 1,
            fontSize:20,
          }}
        >
          InfluexKonnect
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navLinks.map(({ label, path }) => (
              <Typography
                key={label}
                variant="button"
                component={Link}
                to={path}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: textColor,
                  fontFamily: bodyFont,
                  fontSize:12,
                  fontWeight: 400,
                  transition: "all 0.3s",
                  "&:hover": { color: primaryColor },
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
                color: accentColor,
                borderColor: accentColor,
                borderRadius: "20px",
                fontFamily: bodyFont,
                fontWeight: 600,
              }}
              variant="outlined"
              component={Link}
              to="/login"
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                color: "#fff",
                borderRadius: "20px",
                fontFamily: bodyFont,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#08133a" },
              }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>
        )}

        {isMobile && (
          <>
            <IconButton onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
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