import Box from "@mui/material/Box";

export default function SectionDivider() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        my: 4,
        maxWidth: "1300px",
        mx: "auto",
      }}
    >
      {/* Left line */}
      <Box
        sx={{
          flex: 1,
          height: "2px",
          background: "linear-gradient(to right, transparent, #dc2626, #dc2626)",
        }}
      />
      
      {/* Center diamond */}
      <Box
        sx={{
          width: "10px",
          height: "10px",
          transform: "rotate(45deg)",
          background: "#dc2626",
        }}
      />
      
      {/* Right line */}
      <Box
        sx={{
          flex: 1,
          height: "2px",
          background: "linear-gradient(to left, transparent, #dc2626, #dc2626)",
        }}
      />
    </Box>
  );
}
