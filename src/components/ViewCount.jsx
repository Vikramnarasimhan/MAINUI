import Box from "@mui/material/Box";

export default function ViewCount({ count }) {
  const formatViews = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

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
      <span>👁️</span>
      <span>{formatViews(count)}</span>
    </Box>
  );
}
