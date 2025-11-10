import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";
import ReadMoreButton from "./ReadMoreButton";
import NewsService from "../services/NewsService";

// Fallback images
import supremeCourtImg from "../assets/supremecourt.png";
import aiImg from "../assets/AI.png";
import cricketImg from "../assets/indianworldcup.png";
import climateImg from "../assets/climatechange.png";
import economyImg from "../assets/economy.png";

export default function BreakingNewsSection() {
  const [mainNews, setMainNews] = useState(null);
  const [subNews, setSubNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const allNews = await NewsService.getAllNews();
      
      if (allNews && allNews.length > 0) {
        setMainNews(allNews[0]); // First article
        setSubNews(allNews.slice(1, 5)); // Next 4 articles
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format time from ISO date
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Get random views
  const getViews = () => Math.floor(Math.random() * 200000) + 50000;

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading breaking news...</Typography>
      </Box>
    );
  }

  if (!mainNews) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* HERO BREAKING NEWS - Exact same design, just API data */}
        <Box
          sx={{
            width: "100%",
            background: "#ffffff",
            border: "2px solid #c41e3a",
            borderRadius: "3px",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            "&:hover": {
              borderColor: "#a31828",
              boxShadow: "0 6px 16px rgba(196, 30, 58, 0.15)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => mainNews.url && window.open(mainNews.url, '_blank')}
        >
          {/* Breaking Badge - Compact */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #c41e3a 0%, #a31828 100%)",
              color: "#ffffff",
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontFamily: "'Segoe UI', sans-serif",
              borderBottom: "1px solid #8b1522",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#ffffff",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.4 },
                },
              }}
            />
            Breaking News
          </Box>

          {/* Hero Image */}
          <Box
            sx={{
              width: "100%",
              height: "450px",
              overflow: "hidden",
              position: "relative",
              background: "#000",
            }}
          >
            <img
              src={mainNews.urlToImage || supremeCourtImg}
              alt="Breaking News"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onError={(e) => {
                e.target.src = supremeCourtImg;
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)",
                pointerEvents: "none",
              }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
                flexWrap: "wrap",
              }}
            >
              <CategoryBadge category={mainNews.source?.name || "Breaking"} />
              <TimeStamp time={getTimeAgo(mainNews.publishedAt)} />
              <ViewCount count={getViews()} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                color: "#1a1a1a",
                lineHeight: 1.2,
                mb: 1.5,
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.5px",
              }}
            >
              {mainNews.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                color: "#4a4a4a",
                fontFamily: "'Segoe UI', sans-serif",
                mb: 2,
              }}
            >
              {mainNews.description || "Read the full story for more details."}
            </Typography>

            <ReadMoreButton onClick={() => mainNews.url && window.open(mainNews.url, '_blank')} />
          </Box>
        </Box>

        {/* SUB-NEWS GRID - Exact same design */}
        {subNews.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 2,
              width: "100%",
            }}
          >
            {subNews.map((news, index) => {
              // Fallback images for sub-news
              const fallbackImages = [aiImg, cricketImg, climateImg, economyImg];
              
              return (
                <Box
                  key={index}
                  sx={{
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "3px",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#c41e3a",
                      borderWidth: "2px",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                  onClick={() => news.url && window.open(news.url, '_blank')}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                      borderBottom: "1px solid #e0e0e0",
                      background: "#000",
                      position: "relative",
                    }}
                  >
                    <img
                      src={news.urlToImage || fallbackImages[index % 4]}
                      alt={news.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                      onError={(e) => {
                        e.target.src = fallbackImages[index % 4];
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <CategoryBadge category={news.source?.name || "News"} />
                      <TimeStamp time={getTimeAgo(news.publishedAt)} />
                      <ViewCount count={getViews()} />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#1a1a1a",
                        mb: 1,
                        lineHeight: 1.3,
                        fontFamily: "'Georgia', serif",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {news.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        color: "#6a6a6a",
                        lineHeight: 1.5,
                        fontFamily: "'Segoe UI', sans-serif",
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {news.description || "Click to read more..."}
                    </Typography>

                    <ReadMoreButton onClick={() => news.url && window.open(news.url, '_blank')} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
