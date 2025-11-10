import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/economy.png";
import newsImg2 from "../assets/AI.png";
import newsImg3 from "../assets/climatechange.png";
import newsImg4 from "../assets/indianworldcup.png";
import newsImg5 from "../assets/supremecourt.png";

export default function TrendingSection() {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingNews();
  }, []);

  const fetchTrendingNews = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        // Take first 5 articles for trending
        const trending = news.slice(0, 5).map((article, index) => ({
          title: article.title,
          count: Math.floor(Math.random() * 1000 + 500), // Random view count
          img: article.urlToImage,
          url: article.url,
          fallbackImg: [newsImg1, newsImg2, newsImg3, newsImg4, newsImg5][index]
        }));
        
        setTrendingData(trending);
      }
    } catch (error) {
      console.error("Error fetching trending news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 3, textAlign: 'center', p: 2 }}>
        <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
          Loading trending...
        </Typography>
      </Box>
    );
  }

  if (!trendingData.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header with Fire - Same design */}
      <Box sx={{ position: "relative", mb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            fontSize: "0.9rem",
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontFamily: "'Georgia', 'Garamond', serif",
          }}
        >
          Trending
        </Typography>

        {/* Fire icon */}
        <Box
          className="fire-animation"
          sx={{
            position: "absolute",
            top: "-10px",
            right: "0px",
            fontSize: "1.5rem",
          }}
        >
          🔥
        </Box>
      </Box>

      {/* Trending Items with Images - Same design */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
        }}
      >
        {trendingData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.2,
              borderBottom:
                index < trendingData.length - 1 ? "1px solid #f5f5f5" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "#fafafa",
              },
            }}
            onClick={() => item.url && window.open(item.url, '_blank')}
          >
            {/* Thumbnail Image */}
            <Box
              sx={{
                width: "50px",
                height: "50px",
                flexShrink: 0,
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid #e8e8e8",
              }}
            >
              <img
                src={item.img || item.fallbackImg}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = item.fallbackImg;
                }}
              />
            </Box>

            {/* Text Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.title}
              </Typography>
            </Box>

            {/* View Count */}
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 900,
                color: "#dc2626",
                fontFamily: "'Georgia', 'Garamond', serif",
                flexShrink: 0,
              }}
            >
              {item.count}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
