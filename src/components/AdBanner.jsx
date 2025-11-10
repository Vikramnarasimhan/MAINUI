import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AdBanner() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
        border: "2px dashed #cccccc",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        position: "relative",
        overflow: "hidden",
        my: 3,
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.02) 10px,
            rgba(0,0,0,0.02) 20px
          )`,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#999999",
            textTransform: "uppercase",
            letterSpacing: "2px",
            mb: 0.5,
          }}
        >
          Advertisement
        </Typography>
        
        <Typography
          sx={{
            fontSize: "0.65rem",
            color: "#aaaaaa",
            fontStyle: "italic",
          }}
        >
          Your ad could be here
        </Typography>

        {/* Dimensions */}
        <Typography
          sx={{
            fontSize: "0.6rem",
            color: "#bbbbbb",
            mt: 1,
            fontFamily: "monospace",
          }}
        >
          970 × 200
        </Typography>
      </Box>
    </Box>
  );
}
