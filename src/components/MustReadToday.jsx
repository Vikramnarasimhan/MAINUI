import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/climatechange.png";
import newsImg2 from "../assets/AI.png";
import newsImg3 from "../assets/economy.png";

export default function MustReadToday() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMustRead();
  }, []);

  const fetchMustRead = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        const fallbackImages = [newsImg1, newsImg2, newsImg3];
        
        // Take 3 top articles for "Must Read"
        const mustReadData = news.slice(0, 3).map((article, index) => ({
          title: article.title,
          description: article.description || "A must-read story you shouldn't miss...",
          category: article.source?.name || "News",
          time: getTimeAgo(article.publishedAt),
          views: Math.floor(Math.random() * 100000 + 50000),
          img: article.urlToImage || fallbackImages[index],
          url: article.url,
        }));
        
        setArticles(mustReadData);
      }
    } catch (error) {
      console.error("Error fetching must read:", error);
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
          Loading must read...
        </Typography>
      </Box>
    );
  }

  if (!articles.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header with Badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            fontSize: "0.9rem",
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontFamily: "'Georgia', 'Garamond', serif",
            pb: 0.5,
          }}
        >
          Must Read Today
        </Typography>
        <Box
          sx={{
            background: "#dc2626",
            color: "#ffffff",
            px: 1,
            py: 0.3,
            borderRadius: "3px",
            fontSize: "0.65rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Essential
        </Box>
      </Box>

      {/* Red underline */}
      <Box sx={{ width: "60px", height: "3px", background: "#dc2626", mb: 2 }} />

      {/* Articles */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {articles.map((article, index) => (
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
                boxShadow: "0 6px 16px rgba(220, 38, 38, 0.2)",
                transform: "translateY(-3px)",
              },
            }}
            onClick={() => article.url && window.open(article.url, '_blank')}
          >
            {/* Image */}
            <Box
              sx={{
                width: "120px",
                height: "100px",
                flexShrink: 0,
                overflow: "hidden",
                background: "#000",
                position: "relative",
              }}
            >
              <img
                src={article.img}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onError={(e) => {
                  e.target.src = newsImg1;
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              />
              {/* Essential Badge on Image */}
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  background: "rgba(220, 38, 38, 0.95)",
                  color: "#ffffff",
                  px: 0.8,
                  py: 0.3,
                  borderRadius: "2px",
                  fontSize: "0.65rem",
                  fontWeight: 900,
                }}
              >
                MUST READ
              </Box>
            </Box>

            {/* Content */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                py: 1.2,
                pr: 1.2,
              }}
            >
              {/* Top: Category + Time */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CategoryBadge category={article.category} />
                <TimeStamp time={article.time} />
              </Box>

              {/* Middle: Title */}
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  color: "#1a1a1a",
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  my: 0.8,
                }}
              >
                {article.title}
              </Typography>

              {/* Bottom: Description + Views */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#666666",
                    lineHeight: 1.4,
                    fontFamily: "'Georgia', 'Garamond', serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 0.8,
                  }}
                >
                  {article.description}
                </Typography>
                <ViewCount count={article.views} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
