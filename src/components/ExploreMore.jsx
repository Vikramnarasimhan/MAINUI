import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";
import ReadMoreButton from "./ReadMoreButton";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/climatechange.png";
import newsImg2 from "../assets/economy.png";
import newsImg3 from "../assets/AI.png";
import newsImg4 from "../assets/indianworldcup.png";

export default function ExploreMore() {
  const [exploreBlocks, setExploreBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExploreNews();
  }, []);

  const fetchExploreNews = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        // Take 4 articles for explore section
        const exploreNews = news.slice(4, 8).map((article, index) => ({
          category: article.source?.name || "News",
          title: article.title,
          desc: article.description || "Click to read more about this story...",
          img: article.urlToImage,
          time: getTimeAgo(article.publishedAt),
          views: Math.floor(Math.random() * 100000 + 30000),
          url: article.url,
          fallbackImg: [newsImg1, newsImg2, newsImg3, newsImg4][index % 4]
        }));
        
        setExploreBlocks(exploreNews);
      }
    } catch (error) {
      console.error("Error fetching explore news:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Box sx={{ width: "100%", background: "#ffffff", py: 4, px: 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
          Loading more news...
        </Typography>
      </Box>
    );
  }

  if (!exploreBlocks.length) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        py: 4,
        px: 3,
        borderTop: "3px solid #dc2626",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      {/* Section Header - Same design */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: "#dc2626",
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: { xs: "1.3rem", md: "1.5rem" },
            fontFamily: "'Georgia', 'Garamond', serif",
          }}
        >
          Explore More
        </Typography>
        <Box
          sx={{
            width: "80px",
            height: "3px",
            background: "#dc2626",
          }}
        />
      </Box>

      {/* Grid Cards - Same design */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 2.5,
        }}
      >
        {exploreBlocks.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              background: "#ffffff",
              border: "1px solid #e8e8e8",
              borderRadius: "0px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                borderColor: "#dc2626",
                borderWidth: "2px",
                transform: "translateY(-4px)",
                boxShadow: "0 4px 8px rgba(220, 38, 38, 0.15)",
              },
            }}
            onClick={() => item.url && window.open(item.url, '_blank')}
          >
            {/* Image */}
            <Box
              sx={{
                width: "100%",
                height: "180px",
                overflow: "hidden",
                borderBottom: "2px solid #e8e8e8",
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

            {/* Content */}
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Category + Time */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <CategoryBadge category={item.category} />
                <TimeStamp time={item.time} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: "#1a1a1a",
                  mb: 1,
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#666666",
                  lineHeight: 1.5,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  mb: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.desc}
              </Typography>

              {/* Bottom Row: Views + Read More */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 1,
                  borderTop: "1px solid #e8e8e8",
                }}
              >
                <ViewCount count={item.views} />
                <ReadMoreButton onClick={(e) => {
                  e.stopPropagation();
                  item.url && window.open(item.url, '_blank');
                }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
