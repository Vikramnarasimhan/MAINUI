import Box from "@mui/material/Box";

export default function TimeStamp({ time }) {
  return (
    <Box
      component="span"
      sx={{
        fontSize: "12px",
        color: "#6a6a6a",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span>🕐</span>
      <span>{time}</span>
    </Box>
  );
}
