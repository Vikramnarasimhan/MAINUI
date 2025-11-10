import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/climatechange.png";
import newsImg2 from "../assets/AI.png";
import newsImg3 from "../assets/economy.png";
import newsImg4 from "../assets/indianworldcup.png";

export default function LatestHeadlines() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const fetchHeadlines = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        const fallbackImages = [newsImg1, newsImg2, newsImg3, newsImg4];
        
        const headlineData = news.slice(0, 4).map((article, index) => ({
          title: article.title,
          category: article.source?.name || "News",
          time: getTimeAgo(article.publishedAt),
          img: article.urlToImage || fallbackImages[index],
          url: article.url,
        }));
        
        setHeadlines(headlineData);
      }
    } catch (error) {
      console.error("Error fetching headlines:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Just now";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } catch {
      return "Recently";
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 3, textAlign: 'center', py: 2 }}>
        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
          Loading headlines...
        </Typography>
      </Box>
    );
  }

  if (!headlines.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header - Professional */}
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
        Latest Headlines
      </Typography>

      {/* Headlines List - FIXED LAYOUT */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {headlines.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 1.5,
              background: "#ffffff",
              border: "1px solid #e8e8e8",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#dc2626",
                transform: "translateX(4px)",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
              },
            }}
            onClick={() => item.url && window.open(item.url, '_blank')}
          >
            {/* Image - Larger & Better */}
            <Box
              sx={{
                width: "100px",
                height: "100px",
                flexShrink: 0,
                overflow: "hidden",
                background: "#000",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onError={(e) => {
                  e.target.src = newsImg1;
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              />
            </Box>

            {/* Content - FIXED VERTICAL LAYOUT */}
            <Box 
              sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                py: 1.2,
                pr: 1.2,
                minWidth: 0, // Important for text truncation
              }}
            >
              {/* Category Badge - Top */}
              <Box>
                <CategoryBadge category={item.category} />
              </Box>

              {/* Title - Middle */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#1a1a1a",
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  my: 0.5,
                }}
              >
                {item.title}
              </Typography>

              {/* Timestamp - Bottom */}
              <Box>
                <TimeStamp time={item.time} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
