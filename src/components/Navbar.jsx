import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RegionalDropdown from "./RegionalDropdown";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotificationsIcon from '@mui/icons-material/Notifications';
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState("Fetching location...");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [regionalAnchorEl, setRegionalAnchorEl] = useState(null);
  const regionalOpen = Boolean(regionalAnchorEl);
  
  // Dark Mode & Language States
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const languageOpen = Boolean(languageAnchorEl);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            setLocation(
              `${data.city || data.locality || "Unknown"}, ${data.countryName || ""}`
            );
          } catch {
            setError("Unable to fetch location");
          }
        },
        () => setError("Location denied")
      );
    } else {
      setError("Geolocation unavailable");
    }
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedLanguage = localStorage.getItem("language") || "English";
    setDarkMode(savedDarkMode);
    setLanguage(savedLanguage);
  }, []);

  const handleProfileClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/signin");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    handleClose();
    navigate("/signin");
  };

  const handleUpgrade = () => {
    handleClose();
    navigate("/plans");
  };

  const handleRegionalClick = (event) => {
    setRegionalAnchorEl(event.currentTarget);
  };

  const handleRegionalClose = () => {
    setRegionalAnchorEl(null);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    console.log("Dark mode toggled:", !darkMode);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    handleLanguageClose();
  };

  const menuItems = [
    "Home",
    "Region",
    "Politics",
    "Defense",
    "Finance",
    "Entertainment",
    "Sports",
    "Translate",
    "Video",
  ];

  return (
    <>
<AppBar
  position="fixed"
  elevation={0}
  sx={{
    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
    borderBottom: darkMode ? "1px solid #333333" : "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  }}
>

        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "60px !important",
            px: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: "#1a1a1a",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#fef2f2",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s",
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>

            <Box
  sx={{
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: 0.5,
    background: darkMode ? "rgba(196, 30, 58, 0.2)" : "#fef2f2",
    px: 1.5,
    py: 0.5,
    borderRadius: "3px",
    border: darkMode ? "1px solid rgba(196, 30, 58, 0.3)" : "1px solid #fee2e2",
    transition: "all 0.3s ease",
  }}
>
  <span style={{ fontSize: "0.85rem" }}>📍</span>
  <Typography
    sx={{
      fontSize: 12,
      fontWeight: 600,
      color: darkMode ? "#f5f5f5" : "#1a1a1a",
      fontFamily: "'Segoe UI', sans-serif",
      transition: "all 0.3s ease",
    }}
  >
    {error ? error : location}
  </Typography>
</Box>

          </Stack>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              textAlign: "center",
              flexGrow: 0,
              letterSpacing: 2,
              fontFamily: "'Georgia', serif",
              fontSize: "1.5rem",
              display: "flex",
              gap: "3px",
            }}
          >
            <Box component="span" sx={{ background: "#c41e3a", color: "#ffffff", padding: "2px 12px", fontWeight: 700 }}>M</Box>
            <Box component="span" sx={{ background: "#c41e3a", color: "#ffffff", padding: "2px 12px", fontWeight: 700 }}>I</Box>
            <Box component="span" sx={{ background: "#c41e3a", color: "#ffffff", padding: "2px 12px", fontWeight: 700 }}>D</Box>
          </Typography>

          {/* RIGHT: Language + Dark Mode + Subscribe + Sign In/Profile */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Language Selector */}
{/* Language Selector */}
<Tooltip title={`Language: ${language}`}>
  <IconButton
    onClick={handleLanguageClick}
    sx={{
      color: darkMode ? "#d1d1d1" : "#4a4a4a",
      padding: "8px",
      "&:hover": {
        backgroundColor: darkMode ? "rgba(196, 30, 58, 0.2)" : "#fef2f2",
        color: "#c41e3a",
      },
      transition: "all 0.2s",
    }}
  >
    <LanguageIcon sx={{ fontSize: 24 }} />
  </IconButton>
</Tooltip>

{/* Dark Mode Toggle */}
<Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
  <IconButton
    onClick={handleDarkModeToggle}
    sx={{
      color: darkMode ? "#d1d1d1" : "#4a4a4a",
      padding: "8px",
      "&:hover": {
        backgroundColor: darkMode ? "rgba(196, 30, 58, 0.2)" : "#fef2f2",
        color: "#c41e3a",
      },
      transition: "all 0.2s",
    }}
  >
    {darkMode ? (
      <Brightness7Icon sx={{ fontSize: 24 }} />
    ) : (
      <Brightness4Icon sx={{ fontSize: 24 }} />
    )}
  </IconButton>
</Tooltip>


            {/* Dark Mode Toggle */}

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#c41e3a",
                color: "#ffffff",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontSize: "0.75rem",
                borderRadius: "3px",
                px: 2,
                py: 0.75,
                minHeight: "36px",
                fontFamily: "'Segoe UI', sans-serif",
                "&:hover": {
                  backgroundColor: "#a31828",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 8px rgba(196,30,58,0.3)",
                },
                transition: "all 0.2s",
              }}
              onClick={() => navigate("/plans")}
            >
              Subscribe
            </Button>

            {!user ? (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#c41e3a",
                  border: "2px solid #c41e3a",
                  color: "#c41e3a",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontSize: "0.75rem",
                  borderRadius: "3px",
                  px: 2,
                  py: 0.75,
                  minHeight: "36px",
                  fontFamily: "'Segoe UI', sans-serif",
                  "&:hover": {
                    borderColor: "#a31828",
                    backgroundColor: "#fef2f2",
                    color: "#a31828",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s",
                }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            ) : (
              <IconButton onClick={handleProfileClick} sx={{ padding: 0 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, #c41e3a 0%, #a31828 100%)",
                    fontSize: "1rem",
                    fontWeight: 900,
                    cursor: "pointer",
                    border: user.subscriptionType ? "2px solid #16a34a" : "2px solid #e8e8e8",
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Avatar>
              </IconButton>
            )}
          </Stack>
        </Toolbar>

<Toolbar
  variant="dense"
  sx={{
    justifyContent: "center",
    gap: 0,
    overflowX: "auto",
    background: darkMode ? "#262626" : "#ffffff",
    borderTop: darkMode ? "1px solid #333333" : "1px solid #e0e0e0",
    display: { xs: "none", md: "flex" },
    minHeight: "44px !important",
    px: 0,
    "&::-webkit-scrollbar": { display: "none" },
    transition: "all 0.3s ease",
  }}
>

{menuItems.map((link, index) => {
  const isSubscribed = user && user.subscriptionType && 
                       user.subscriptionType.split(',')
                         .map(cat => cat.trim().toLowerCase())
                         .includes(link.toLowerCase());

  return (
    <Button
      key={link}
      onClick={link === "Region" ? handleRegionalClick : undefined}
      sx={{
        color: isSubscribed 
          ? "#c41e3a" 
          : (darkMode ? "#d1d1d1" : "#4a4a4a"),
        fontWeight: isSubscribed ? 700 : 600,
        fontSize: "0.875rem",
        textTransform: "none",
        fontFamily: "'Segoe UI', sans-serif",
        px: 2,
        py: 1,
        minWidth: "auto",
        borderRadius: "0px",
        borderRight: index < menuItems.length - 1 
          ? (darkMode ? "1px solid #333333" : "1px solid #f0f0f0") 
          : "none",
        position: "relative",
        background: isSubscribed 
          ? "rgba(22, 163, 74, 0.05)" 
          : (link === "Region" && regionalOpen 
              ? "rgba(196, 30, 58, 0.08)" 
              : "transparent"),
        "&:hover": {
          backgroundColor: "#c41e3a",
          color: "#ffffff",
          borderRight: index < menuItems.length - 1 ? "1px solid #c41e3a" : "none",
        },
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {isSubscribed && (
        <NotificationsIcon 
          sx={{ 
            fontSize: "0.9rem", 
            color: "#e6e209ff",
            animation: "pulse 2s infinite",
          }} 
        />
      )}
      {link}
    </Button>
  );
})}

        </Toolbar>

        <style>
          {`
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}
        </style>
      </AppBar>

      <RegionalDropdown 
        anchorEl={regionalAnchorEl}
        open={regionalOpen}
        onClose={handleRegionalClose}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 350,
            maxWidth: 400,
            borderRadius: "8px",
            border: "2px solid #c41e3a",
            boxShadow: "0 8px 20px rgba(196, 30, 58, 0.2)",
            background: "#fffbf5",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box 
          sx={{ 
            p: 2.5, 
            borderBottom: "2px solid #c41e3a",
            background: "linear-gradient(135deg, #fff8e7 0%, #fffbf5 100%)",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: "linear-gradient(135deg, #c41e3a 0%, #a31828 100%)",
                fontSize: "1.5rem",
                fontWeight: 900,
                border: "3px solid #ffffff",
                boxShadow: "0 2px 8px rgba(196, 30, 58, 0.3)",
              }}
            >
              {user && user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#1a1a1a", mb: 0.3 }}>
                {user && user.name ? user.name : "User"}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#666666", mb: 0.5 }}>
                {user && user.email ? user.email : ""}
              </Typography>
              {user && user.username && (
                <Typography sx={{ fontSize: "0.7rem", color: "#888888", fontStyle: "italic" }}>
                  @{user.username}
                </Typography>
              )}
            </Box>
          </Stack>

          {(() => {
            let subscriptionPlan = null;
            if (user && user.subscriptionExpiries && user.createdAt) {
              const createdDate = new Date(user.createdAt);
              const firstExpiry = Object.values(user.subscriptionExpiries)[0];
              if (firstExpiry) {
                const expiryDate = new Date(firstExpiry);
                const monthsDiff = (expiryDate - createdDate) / (1000 * 60 * 60 * 24 * 30);
                subscriptionPlan = monthsDiff >= 11 ? "YEARLY" : "MONTHLY";
              }
            }

            return user && user.subscriptionType ? (
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: "0.9rem" }} />}
                label={subscriptionPlan ? `${subscriptionPlan} MEMBER` : "PREMIUM MEMBER"}
                sx={{ 
                  background: "#16a34a", 
                  color: "#ffffff", 
                  fontWeight: 800, 
                  fontSize: "0.7rem", 
                  height: "24px",
                  letterSpacing: "0.5px",
                }}
              />
            ) : (
              <Chip 
                label="FREE USER" 
                sx={{ 
                  background: "#e8e8e8", 
                  color: "#666666", 
                  fontWeight: 700, 
                  fontSize: "0.7rem", 
                  height: "24px",
                  letterSpacing: "0.5px",
                }} 
              />
            );
          })()}
        </Box>

        {user && user.subscriptionType && (
          <Box sx={{ p: 2, background: "#ffffff", borderBottom: "1px solid #f0f0f0" }}>
            <Typography sx={{ 
              fontSize: "0.85rem", 
              fontWeight: 800, 
              color: "#c41e3a", 
              mb: 1, 
              textTransform: "uppercase", 
              letterSpacing: "0.5px" 
            }}>
              Your Subscriptions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {user.subscriptionType.split(',').map((category, index) => {
                const trimmedCategory = category.trim();
                const expiryDate = user.subscriptionExpiries && user.subscriptionExpiries[trimmedCategory];
                const isExpired = expiryDate && new Date(expiryDate) < new Date();
                
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                      borderRadius: "6px",
                      background: isExpired 
                        ? "rgba(220, 38, 38, 0.08)" 
                        : "rgba(220, 38, 38, 0.04)",
                      border: `1.5px solid ${isExpired ? "rgba(220, 38, 38, 0.4)" : "rgba(220, 38, 38, 0.2)"}`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: isExpired ? "#991b1b" : "#c41e3a",
                        }}
                      >
                        {trimmedCategory}
                      </Typography>
                    </Box>
                    
                    {expiryDate && (
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          color: isExpired ? "#991b1b" : "#666666",
                          fontWeight: 600,
                        }}
                      >
                        {isExpired 
                          ? "Expired" 
                          : new Date(expiryDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })
                        }
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {user && user.createdAt && (
          <Box sx={{ 
            px: 2, 
            py: 1.2, 
            background: "rgba(220, 38, 38, 0.04)", 
            borderBottom: "1px solid #f0f0f0" 
          }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#c41e3a",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              🎉 Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </Typography>
          </Box>
        )}

        {user && !user.subscriptionType && (
          <MenuItem 
            onClick={handleUpgrade}
            sx={{
              py: 1.5,
              background: "#ffffff",
              "&:hover": { background: "rgba(220, 38, 38, 0.05)" },
            }}
          >
            <ListItemIcon>
              <UpgradeIcon sx={{ color: "#c41e3a" }} />
            </ListItemIcon>
            <ListItemText 
              primary="Upgrade to Premium" 
              primaryTypographyProps={{ 
                fontSize: "0.9rem", 
                fontWeight: 700, 
                color: "#c41e3a" 
              }} 
            />
          </MenuItem>
        )}

        <Divider sx={{ borderColor: "#f0f0f0" }} />

        <MenuItem 
          onClick={handleLogout}
          sx={{
            py: 1.5,
            background: "#ffffff",
            "&:hover": { background: "rgba(220, 38, 38, 0.05)" },
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#666666" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Sign Out" 
            primaryTypographyProps={{ 
              fontSize: "0.9rem", 
              color: "#666666",
              fontWeight: 600,
            }} 
          />
        </MenuItem>
      </Menu>

      {/* Language Selection Menu */}
      <Menu
        anchorEl={languageAnchorEl}
        open={languageOpen}
        onClose={handleLanguageClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: "8px",
            border: "2px solid #c41e3a",
            boxShadow: "0 8px 20px rgba(196, 30, 58, 0.2)",
            background: "#fffbf5",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 1.5, borderBottom: "2px solid #c41e3a" }}>
          <Typography sx={{ 
            fontSize: "0.85rem", 
            fontWeight: 800, 
            color: "#c41e3a", 
            textTransform: "uppercase", 
            letterSpacing: "0.5px" 
          }}>
            Select Language
          </Typography>
        </Box>

        {[
          "English",
          "தமிழ் (Tamil)",
          "हिन्दी (Hindi)",
          "తెలుగు (Telugu)",
          "ಕನ್ನಡ (Kannada)",
          "മലയാളം (Malayalam)"
        ].map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => handleLanguageSelect(lang)}
            sx={{
              py: 1.5,
              px: 2,
              background: language === lang ? "rgba(196, 30, 58, 0.08)" : "#ffffff",
              fontWeight: language === lang ? 700 : 500,
              color: language === lang ? "#c41e3a" : "#1a1a1a",
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                background: "rgba(196, 30, 58, 0.05)",
                color: "#c41e3a",
              },
            }}
          >
            {language === lang && (
              <VerifiedIcon sx={{ fontSize: "1.1rem", color: "#c41e3a" }} />
            )}
            <Typography sx={{ fontSize: "0.9rem" }}>
              {lang}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
            width: 280,
            borderRight: "3px solid #c41e3a",
          },
        }}
      >
        <Box sx={{ p: 0 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #c41e3a 0%, #a31828 100%)",
              color: "#ffffff",
              p: 3,
              textAlign: "center",
              borderBottom: "2px solid #8b1522",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 4, fontFamily: "'Georgia', serif", mb: 0.5 }}>
              MID NEWS
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, opacity: 0.9, letterSpacing: 1 }}>
              Your Trusted News Source
            </Typography>
          </Box>

          {menuItems.map((text, idx) => (
            <Button
              key={idx}
              fullWidth
              onClick={text === "Region" ? (e) => { 
                setDrawerOpen(false); 
                handleRegionalClick(e); 
              } : undefined}
              sx={{
                justifyContent: "flex-start",
                color: "#1a1a1a",
                fontWeight: 600,
                fontSize: "0.95rem",
                py: 1.75,
                px: 3,
                borderRadius: "0px",
                borderBottom: "1px solid #f0f0f0",
                fontFamily: "'Segoe UI', sans-serif",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#c41e3a",
                  color: "#ffffff",
                  paddingLeft: "36px",
                  borderBottom: "1px solid #c41e3a",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {text}
            </Button>
          ))}

          <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0", mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#c41e3a",
                color: "#ffffff",
                fontWeight: 700,
                py: 1.5,
                mb: 1,
                "&:hover": { backgroundColor: "#a31828" },
              }}
              onClick={() => navigate("/plans")}
            >
              Subscribe Now
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#c41e3a",
                color: "#c41e3a",
                fontWeight: 700,
                py: 1.5,
                "&:hover": { backgroundColor: "#fef2f2", borderColor: "#a31828" },
              }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
