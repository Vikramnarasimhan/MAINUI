import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const popularTags = [
  { name: "Politics", count: 234, color: "#dc2626" },
  { name: "Technology", count: 189, color: "#2563eb" },
  { name: "Sports", count: 156, color: "#16a34a" },
  { name: "Economy", count: 142, color: "#ea580c" },
  { name: "Entertainment", count: 128, color: "#9333ea" },
  { name: "Health", count: 95, color: "#0891b2" },
  { name: "Education", count: 87, color: "#ca8a04" },
  { name: "Climate", count: 76, color: "#059669" },
  { name: "Elections", count: 64, color: "#dc2626" },
  { name: "Science", count: 52, color: "#7c3aed" },
];

export default function PopularTags() {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
        <LocalOfferIcon sx={{ fontSize: "1rem", color: "#dc2626" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            fontSize: "0.9rem",
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontFamily: "'Georgia', 'Garamond', serif",
          }}
        >
          Popular Tags
        </Typography>
      </Box>

      {/* Underline */}
      <Box sx={{ width: "40px", height: "3px", background: "#dc2626", mb: 2 }} />

      {/* Tags Container */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "4px",
          p: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {popularTags.map((tag, index) => (
            <Chip
              key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {tag.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      opacity: 0.7,
                    }}
                  >
                    ({tag.count})
                  </Typography>
                </Box>
              }
              sx={{
                background: `${tag.color}15`,
                color: tag.color,
                border: `1px solid ${tag.color}30`,
                fontSize: "0.7rem",
                height: "26px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: tag.color,
                  color: "#ffffff",
                  borderColor: tag.color,
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 8px ${tag.color}40`,
                },
              }}
            />
          ))}
        </Box>

        {/* View All Link */}
        <Box
          sx={{
            mt: 1.5,
            pt: 1.5,
            borderTop: "1px solid #e8e8e8",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#dc2626",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            View All Tags →
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
