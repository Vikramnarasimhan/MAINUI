import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LeftColumnAd() {
  return (
    <Box
      sx={{
        mb: 3,
        background: "#ffffff",
        minHeight: 200,
        border: "1px solid #e8e8e8",
        borderRadius: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        paddingBottom:7,
        cursor: "pointer",
        "&:hover": {
          borderColor: "#dc2626",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#999999",
          fontSize: { xs: 13, md: 15 },
          letterSpacing: 3,
          fontWeight: 700,
          textTransform: "uppercase",
          fontFamily: "'Georgia', 'Garamond', serif",
        }}
      >
        Advertisement
      </Typography>
    </Box>
  );
}
