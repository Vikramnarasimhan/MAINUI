import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        color: "#ffffff",
        mt: 4,
        pt: 3,
        pb: 2,
        borderTop: "3px solid #c41e3a",
      }}
    >
      {/* Main Footer Content */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "2fr 1fr 1fr 1fr",
          },
          gap: 3,
          mb: 2,
        }}
      >
        {/* About Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              fontSize: "1.5rem",
              mb: 1.5,
              fontFamily: "'Georgia', serif",
              letterSpacing: "3px",
              display: "flex",
              gap: "4px",
            }}
          >
            <Box component="span" sx={{ color: "#c41e3a" }}>M</Box>
            <Box component="span" sx={{ color: "#c41e3a" }}>I</Box>
            <Box component="span" sx={{ color: "#c41e3a" }}>D</Box>
            <Box component="span" sx={{ ml: 1, color: "#ffffff" }}>NEWS</Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#cccccc",
              lineHeight: 1.5,
              mb: 1.5,
            }}
          >
            Your trusted source for breaking news, in-depth analysis, and stories that matter. Committed to truth and integrity since 2025.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {[
              { emoji: "📘", label: "Facebook" },
              { emoji: "🐦", label: "Twitter" },
              { emoji: "📸", label: "Instagram" },
              { emoji: "▶️", label: "YouTube" }
            ].map((social, idx) => (
              <Box
                key={idx}
                sx={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "#c41e3a",
                    transform: "translateY(-2px)",
                  },
                }}
                title={social.label}
              >
                {social.emoji}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sections */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              mb: 1.5,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'Segoe UI', sans-serif",
              color: "#ffffff",
            }}
          >
            Sections
          </Typography>
          {["Home", "World", "Politics", "Economy", "Sports"].map((item) => (
            <Typography
              key={item}
              component={Link}
              to={`/${item.toLowerCase()}`}
              sx={{
                display: "block",
                fontSize: "0.8rem",
                color: "#b0b0b0",
                mb: 1,
                textDecoration: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#c41e3a",
                  paddingLeft: "4px",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Company */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              mb: 1.5,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'Segoe UI', sans-serif",
              color: "#ffffff",
            }}
          >
            Company
          </Typography>
          {["About Us", "Contact", "Careers", "Advertise", "Privacy Policy"].map((item) => (
            <Typography
              key={item}
              sx={{
                display: "block",
                fontSize: "0.8rem",
                color: "#b0b0b0",
                mb: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#c41e3a",
                  paddingLeft: "4px",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Newsletter */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              mb: 1.5,
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'Segoe UI', sans-serif",
              color: "#ffffff",
            }}
          >
            Newsletter
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#b0b0b0",
              mb: 1.5,
              lineHeight: 1.4,
            }}
          >
            Get the latest news delivered to your inbox daily.
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: "8px 10px",
                border: "1px solid #444444",
                borderRadius: "3px",
                background: "#2a2a2a",
                color: "#ffffff",
                fontSize: "0.8rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#c41e3a"}
              onBlur={(e) => e.target.style.borderColor = "#444444"}
            />
            <button
              type="submit"
              style={{
                padding: "8px 14px",
                background: "#c41e3a",
                color: "#ffffff",
                border: "none",
                borderRadius: "3px",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.background = "#a31828"}
              onMouseLeave={(e) => e.target.style.background = "#c41e3a"}
            >
              →
            </button>
          </Box>
        </Box>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: "1px solid #333333",
          pt: 2,
          maxWidth: "1400px",
          mx: "auto",
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#888888",
            }}
          >
            © 2025 MID News. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: "0.75rem",
                  color: "#888888",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#c41e3a",
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
