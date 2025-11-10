import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";

import newsImg1 from "../assets/climatechange.png";
import newsImg2 from "../assets/AI.png";
import newsImg3 from "../assets/economy.png";

const latestNews = [
  {
    title: "Tech Giants Face New AI Regulation",
    desc: "Global leaders agree on guidelines for responsible artificial intelligence use.",
    category: "Technology",
    time: "2 hours ago",
    views: 89000,
    img: newsImg1,
  },
  {
    title: "Stock Markets Hit Record Highs",
    desc: "Investors celebrate as tech and energy stocks fuel global market optimism.",
    category: "Economy",
    time: "3 hours ago",
    views: 67000,
    img: newsImg2,
  },
  {
    title: "Climate Summit Reaches Breakthrough",
    desc: "Nations commit to faster carbon reduction at the latest UN summit.",
    category: "World",
    time: "5 hours ago",
    views: 52000,
    img: newsImg3,
  },
];

export default function LatestNews() {
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
        Latest News
      </Typography>

      {/* News Items */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {latestNews.map((news, index) => (
          <Box
            key={index}
            sx={{
              background: "#ffffff",
              border: "1px solid #e8e8e8",
              borderRadius: "0px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#dc2626",
                transform: "translateX(4px)",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
              },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                width: "100%",
                height: "140px",
                overflow: "hidden",
                borderBottom: "2px solid #e8e8e8",
              }}
            >
              <img
                src={news.img}
                alt={news.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: 1.5 }}>
              {/* Category + Time */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  flexWrap: "wrap",
                }}
              >
                <CategoryBadge category={news.category} />
                <TimeStamp time={news.time} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: "#1a1a1a",
                  mb: 0.8,
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {news.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#666666",
                  lineHeight: 1.4,
                  mb: 1,
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {news.desc}
              </Typography>

              {/* Views */}
              <ViewCount count={news.views} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
