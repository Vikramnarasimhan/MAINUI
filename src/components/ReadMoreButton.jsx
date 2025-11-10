import Button from "@mui/material/Button";

export default function ReadMoreButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: "#c41e3a",
        fontWeight: 600,
        fontSize: "14px",
        textTransform: "none",
        padding: 0,
        minWidth: "auto",
        "&:hover": {
          background: "none",
          textDecoration: "underline",
        },
      }}
    >
      Read More →
    </Button>
  );
}
