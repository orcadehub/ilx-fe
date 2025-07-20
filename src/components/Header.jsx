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
const accentColor = "#bfa046";  // Gold
const textColor = "#1C1C1C";    // Neutral dark

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Dashboard", path: "/dashboard" },
];

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
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
                sx: { fontFamily: bodyFont, fontWeight: 600, color: textColor },
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
            }}
            component={Link}
            to="/login"
          >
            Login
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
        backgroundColor: isDashboard ? "transparent" : "white",
        color: textColor,
        boxShadow: isDashboard ? "none" : "0px 4px 10px rgba(0,0,0,0.05)",
        px: 2,
        visibility: isDashboard ? "hidden" : "visible",
        pointerEvents: isDashboard ? "none" : "auto",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: primaryColor,
            fontFamily: headingFont,
            letterSpacing: 1,
          }}
        >
          InfluexKonnect
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 4 }}>
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
                  fontWeight: 500,
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
              Login
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
              Signup
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
