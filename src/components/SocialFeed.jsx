import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const socialPosts = [
  {
    platform: "twitter",
    author: "@MIDNews",
    handle: "MID NEWS",
    content: "BREAKING: US Supreme Court delivers landmark ruling on executive trade powers. Read our full coverage.",
    time: "2m ago",
    likes: "1.2K",
    retweets: "456",
  },
  {
    platform: "instagram",
    author: "@midnews_official",
    content: "Behind the scenes: Our team covering the tech summit in Bangalore. 📸 Swipe for more photos.",
    time: "15m ago",
    likes: "3.4K",
    comments: "89",
  },
  {
    platform: "twitter",
    author: "@MIDNews",
    handle: "MID NEWS",
    content: "India wins cricket series! 🏏 Historic victory against Australia secures semifinal spot. #IndVsAus",
    time: "1h ago",
    likes: "5.6K",
    retweets: "2.1K",
  },
];

const trendingHashtags = [
  { tag: "#SupremeCourtRuling", tweets: "12.5K" },
  { tag: "#TechSummit2025", tweets: "8.2K" },
  { tag: "#IndVsAus", tweets: "45.3K" },
  { tag: "#ClimateAction", tweets: "6.7K" },
];

export default function SocialFeed() {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: "0.9rem",
          color: "#1a1a1a",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontFamily: "'Georgia', 'Garamond', serif",
          mb: 1.5,
          pb: 0.5,
          borderBottom: "2px solid #dc2626",
        }}
      >
        Social Feed 📱
      </Typography>

      {/* Social Posts */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2.5 }}>
        {socialPosts.map((post, index) => (
          <Box
            key={index}
            sx={{
              background: "#ffffff",
              border: "1px solid #e8e8e8",
              borderRadius: "4px",
              p: 1.5,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#dc2626",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.1)",
              },
            }}
          >
            {/* Author Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              {post.platform === "twitter" ? (
                <TwitterIcon sx={{ fontSize: "1rem", color: "#1DA1F2" }} />
              ) : (
                <InstagramIcon sx={{ fontSize: "1rem", color: "#E4405F" }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                  }}
                >
                  {post.handle || post.author}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    color: "#999999",
                  }}
                >
                  {post.author} • {post.time}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#1a1a1a",
                lineHeight: 1.4,
                fontFamily: "'Georgia', 'Garamond', serif",
                mb: 1,
              }}
            >
              {post.content}
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Typography sx={{ fontSize: "0.65rem", color: "#666" }}>
                ❤️ {post.likes}
              </Typography>
              {post.retweets && (
                <Typography sx={{ fontSize: "0.65rem", color: "#666" }}>
                  🔁 {post.retweets}
                </Typography>
              )}
              {post.comments && (
                <Typography sx={{ fontSize: "0.65rem", color: "#666" }}>
                  💬 {post.comments}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Trending Hashtags */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "4px",
          p: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <TrendingUpIcon sx={{ fontSize: "1rem", color: "#dc2626" }} />
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#1a1a1a",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Trending Now
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {trendingHashtags.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  "& .hashtag": { color: "#dc2626" },
                },
              }}
            >
              <Typography
                className="hashtag"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#1DA1F2",
                  transition: "color 0.2s ease",
                }}
              >
                {item.tag}
              </Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#999" }}>
                {item.tweets} tweets
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
