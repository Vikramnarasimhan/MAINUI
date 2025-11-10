import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Regional data structure
const regionalData = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Tamil Nadu",
          cities: ["Chennai", "Coimbatore", "Madurai", "Salem"]
        },
        {
          name: "Maharashtra",
          cities: ["Mumbai", "Pune", "Nagpur", "Nashik"]
        },
        {
          name: "Karnataka",
          cities: ["Bangalore", "Mysore", "Mangalore", "Hubli"]
        },
        {
          name: "Delhi",
          cities: ["New Delhi", "South Delhi", "North Delhi", "East Delhi"]
        },
        {
          name: "Kerala",
          cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"]
        },
        {
          name: "Gujarat",
          cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"]
        }
      ]
    },
    {
      name: "United States",
      cities: ["New York", "Los Angeles", "Chicago", "Houston"]
    },
    {
      name: "United Kingdom",
      cities: ["London", "Manchester", "Birmingham", "Edinburgh"]
    },
    {
      name: "Australia",
      cities: ["Sydney", "Melbourne", "Brisbane", "Perth"]
    },
    {
      name: "Canada",
      cities: ["Toronto", "Vancouver", "Montreal", "Calgary"]
    }
  ]
};

export default function RegionalDropdown({ anchorEl, open, onClose }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCountryHover = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
  };

  const handleStateHover = (state) => {
    setSelectedState(state);
  };

  const handleClose = () => {
    setSelectedCountry(null);
    setSelectedState(null);
    onClose();
  };

  if (!open) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ]}
    >
      <Paper
        sx={{
          borderRadius: "0px",
          border: "none",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          background: "#ffffff",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ display: "flex" }}>
            {/* Column 1: Countries */}
            <Box
              sx={{
                width: "250px",
                borderRight: "1px solid #e0e0e0",
              }}
            >
              {regionalData.countries.map((country, index) => (
                <Box
                  key={index}
                  onMouseEnter={() => handleCountryHover(country)}
                  sx={{
                    p: 1.5,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background:
                      selectedCountry?.name === country.name
                        ? "#c41e3a"
                        : "#ffffff",
                    borderBottom: "1px solid #e0e0e0",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "#c41e3a",
                      "& .country-name": {
                        color: "#ffffff",
                      },
                      "& .arrow-icon": {
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <Typography
                    className="country-name"
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color:
                        selectedCountry?.name === country.name
                          ? "#ffffff"
                          : "#1a1a1a",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {country.name}
                  </Typography>
                  {country.states && (
                    <KeyboardArrowRightIcon
                      className="arrow-icon"
                      sx={{
                        color:
                          selectedCountry?.name === country.name
                            ? "#ffffff"
                            : "#666666",
                        fontSize: "1.2rem",
                        transition: "color 0.2s ease",
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>

            {/* Column 2: States (for India) or Cities (for other countries) */}
            {selectedCountry && (
              <Box
                sx={{
                  width: selectedCountry.states ? "250px" : "250px",
                  borderRight: selectedCountry.states ? "1px solid #e0e0e0" : "none",
                }}
              >
                {selectedCountry.states ? (
                  // Show states for India
                  selectedCountry.states.map((state, index) => (
                    <Box
                      key={index}
                      onMouseEnter={() => handleStateHover(state)}
                      sx={{
                        p: 1.5,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background:
                          selectedState?.name === state.name
                            ? "#c41e3a"
                            : "#ffffff",
                        borderBottom: "1px solid #e0e0e0",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: "#c41e3a",
                          "& .state-name": {
                            color: "#ffffff",
                          },
                          "& .arrow-icon": {
                            color: "#ffffff",
                          },
                        },
                      }}
                    >
                      <Typography
                        className="state-name"
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color:
                            selectedState?.name === state.name
                              ? "#ffffff"
                              : "#1a1a1a",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {state.name}
                      </Typography>
                      <KeyboardArrowRightIcon
                        className="arrow-icon"
                        sx={{
                          color:
                            selectedState?.name === state.name
                              ? "#ffffff"
                              : "#666666",
                          fontSize: "1.1rem",
                          transition: "color 0.2s ease",
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  // Show cities directly for other countries
                  selectedCountry.cities?.map((city, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1.5,
                        cursor: "pointer",
                        background: "#ffffff",
                        borderBottom: "1px solid #e0e0e0",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: "#c41e3a",
                          "& .city-name": {
                            color: "#ffffff",
                          },
                        },
                      }}
                    >
                      <Typography
                        className="city-name"
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#1a1a1a",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {city}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}

            {/* Column 3: Cities (for India states) */}
            {selectedState && selectedCountry?.states && (
              <Box
                sx={{
                  width: "250px",
                }}
              >
                {selectedState.cities.map((city, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      cursor: "pointer",
                      background: "#ffffff",
                      borderBottom: "1px solid #e0e0e0",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "#c41e3a",
                        "& .city-name": {
                          color: "#ffffff",
                        },
                      },
                    }}
                  >
                    <Typography
                      className="city-name"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "#1a1a1a",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {city}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
}
