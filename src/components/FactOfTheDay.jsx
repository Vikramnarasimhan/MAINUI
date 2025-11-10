import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const facts = [
  {
    icon: "🌍",
    number: "8 Billion",
    label: "World Population",
    description: "India contributes 1.4 billion to global population in 2024",
    color: "#16a34a",
  },
  {
    icon: "📱",
    number: "750 Million",
    label: "Internet Users in India",
    description: "Second largest online market after China",
    color: "#2563eb",
  },
  {
    icon: "💰",
    number: "$3.7 Trillion",
    label: "India's GDP (2024)",
    description: "5th largest economy, growing at 7.2% annually",
    color: "#dc2626",
  },
  {
    icon: "🚀",
    number: "100+",
    label: "Indian Unicorn Startups",
    description: "Third-largest startup ecosystem globally",
    color: "#9333ea",
  },
];

export default function FactOfTheDay() {
  return (
    <Box sx={{ mt:5, mb: 4 }}>
      {/* ========================================
          PROFESSIONAL HEADER WITH GRADIENT
      ======================================== */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          borderRadius: "8px",
          p: 2.5,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(220, 38, 38, 0.2)",
          mb: 3,
        }}
      >
        {/* Decorative Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            fontSize: "8rem",
            opacity: 0.1,
            transform: "rotate(-15deg)",
            pointerEvents: "none",
          }}
        >
          💡
        </Box>

        {/* Header Content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
          }}
        >
          {/* Animated Icon Container */}
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              flexShrink: 0,
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.4)",
                },
                "50%": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)",
                },
              },
            }}
          >
            <LightbulbIcon sx={{ fontSize: "1.8rem", color: "#ffffff" }} />
          </Box>

          {/* Title Section */}
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "1.8rem",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "'Georgia', 'Garamond', serif",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                lineHeight: 1.2,
              }}
            >
              Did You Know?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: 500,
                letterSpacing: "1px",
                mt: 0.5,
              }}
            >
              📚 Learn something fascinating today
            </Typography>
          </Box>

          {/* Sparkle Effect */}
          <Box
            sx={{
              fontSize: "1.5rem",
              flexShrink: 0,
              animation: "sparkle 1.5s ease-in-out infinite",
              "@keyframes sparkle": {
                "0%, 100%": {
                  opacity: 0.5,
                  transform: "scale(1) rotate(0deg)",
                },
                "50%": {
                  opacity: 1,
                  transform: "scale(1.2) rotate(180deg)",
                },
              },
            }}
          >
            ✨
          </Box>
        </Box>
      </Box>

      {/* ========================================
          FACT CARDS - 2x2 GRID
      ======================================== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {facts.map((fact, index) => (
          <Box
            key={index}
            sx={{
              background: "#ffffff",
              border: "2px solid #e8e8e8",
              borderRadius: "8px",
              p: 2.5,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: fact.color,
                transform: "translateY(-4px)",
                boxShadow: `0 8px 20px ${fact.color}30`,
                "& .icon": {
                  transform: "scale(1.2) rotate(10deg)",
                },
                "& .bg-pattern": {
                  opacity: 0.15,
                },
              },
            }}
          >
            {/* Background Pattern */}
            <Box
              className="bg-pattern"
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                fontSize: "6rem",
                opacity: 0.08,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            >
              {fact.icon}
            </Box>

            {/* Icon */}
            <Box
              className="icon"
              sx={{
                fontSize: "2.5rem",
                mb: 1.5,
                transition: "transform 0.3s ease",
              }}
            >
              {fact.icon}
            </Box>

            {/* Number */}
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 900,
                color: fact.color,
                mb: 0.5,
                lineHeight: 1.2,
                fontFamily: "'Georgia', 'Garamond', serif",
              }}
            >
              {fact.number}
            </Typography>

            {/* Label */}
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#1a1a1a",
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {fact.label}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "#666666",
                lineHeight: 1.5,
                fontFamily: "'Georgia', 'Garamond', serif",
              }}
            >
              {fact.description}
            </Typography>

            {/* Accent Line */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(to right, ${fact.color}, ${fact.color}80)`,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* ========================================
          FOOTER - UPDATE INFO
      ======================================== */}
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          p: 1.5,
          background: "#f8f8f8",
          borderRadius: "4px",
          border: "1px solid #e8e8e8",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "1px",
            mb: 0.5,
          }}
        >
          💡 Learning something new every day
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#999",
          }}
        >
          Updated daily at 6:00 AM IST
        </Typography>
      </Box>
    </Box>
  );
}
