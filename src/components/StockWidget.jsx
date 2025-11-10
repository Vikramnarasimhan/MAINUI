import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function StockWidget() {
  const marketData = [
    { name: "NIFTY 50", value: "25,597.65", change: "-0.64", isPositive: false },
    { name: "SENSEX", value: "83,459.15", change: "-0.62", isPositive: false },
    { name: "GOLD", value: "₹76,450", change: "+0.42", isPositive: true },
  ];

  return (
    <Box sx={{ mb: 2 }}>
      {/* Minimal Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: "0.85rem",
          color: "#1a1a1a",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontFamily: "'Georgia', 'Garamond', serif",
          mb: 1,
          pb: 0.5,
          borderBottom: "2px solid #dc2626",
        }}
      >
        India Markets
      </Typography>

      {/* Ultra-Compact Market Box */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
        }}
      >
        {marketData.map((market, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              borderBottom: index < marketData.length - 1 ? "1px solid #f5f5f5" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.2s ease",
              "&:hover": { background: "#fafafa" },
            }}
          >
            {/* Left: Name + Value */}
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#666666",
                  lineHeight: 1,
                  mb: 0.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {market.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  color: "#1a1a1a",
                  lineHeight: 1,
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {market.value}
              </Typography>
            </Box>

            {/* Right: Change */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              {market.isPositive ? (
                <TrendingUpIcon sx={{ fontSize: "0.85rem", color: "#16a34a" }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: "0.85rem", color: "#dc2626" }} />
              )}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: market.isPositive ? "#16a34a" : "#dc2626",
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {market.change}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
