import Chip from "@mui/material/Chip";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function CategoryBadge({ category }) {
  // Check if user is subscribed to this category
  const isSubscribed = () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.subscription && user.subscription.categories) {
          // Convert category to lowercase and check if it's in the subscribed list
          return user.subscription.categories.includes(category.toLowerCase());
        }
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
    return false;
  };

  const subscribed = isSubscribed();

  return (
    <Chip
      icon={subscribed ? <VerifiedIcon sx={{ fontSize: "0.9rem" }} /> : null}
      label={category}
      size="small"
      sx={{
        background: subscribed ? "#16a34a" : "#e8e8e8",
        color: subscribed ? "#ffffff" : "#666666",
        fontWeight: 700,
        fontSize: "0.65rem",
        height: "22px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        border: subscribed ? "1px solid #16a34a" : "1px solid #e8e8e8",
      }}
    />
  );
}
