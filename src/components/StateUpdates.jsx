import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";
import ReadMoreButton from "./ReadMoreButton";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/climatechange.png";
import newsImg2 from "../assets/AI.png";
import newsImg3 from "../assets/economy.png";
import newsImg4 from "../assets/indianworldcup.png";

const states = ["Tamil Nadu", "Telangana", "Karnataka", "Kerala", "Andhra Pradesh"];

export default function StateUpdates() {
  const [activeTab, setActiveTab] = useState(0);
  const [stateNews, setStateNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStateNews();
  }, [activeTab]);

  const fetchStateNews = async () => {
    setLoading(true);
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        const fallbackImages = [newsImg1, newsImg2, newsImg3, newsImg4];
        
        // Take 2 articles per state
        const startIndex = activeTab * 2;
        const stateData = news.slice(startIndex, startIndex + 2).map((article, index) => ({
          category: article.source?.name || "Regional News",
          title: article.title,
          desc: article.description || `Latest update from ${states[activeTab]}...`,
          img: article.urlToImage,
          time: getTimeAgo(article.publishedAt),
          views: Math.floor(Math.random() * 100000 + 50000),
          url: article.url,
          fallbackImg: fallbackImages[index]
        }));
        
        setStateNews(stateData);
      }
    } catch (error) {
      console.error("Error fetching state news:", error);
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", background: "#ffffff", py: 4, px: 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
          Loading State Updates...
        </Typography>
      </Box>
    );
  }

  if (!stateNews.length) {
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
      {/* Section Header with Tabs - Same design as EditorsPicks */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: "#dc2626",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: { xs: "1.3rem", md: "1.5rem" },
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            States Updates
          </Typography>
        </Box>

        <Box sx={{ width: "80px", height: "3px", background: "#dc2626", mb: 2 }} />

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: "2px solid #e8e8e8",
            "& .MuiTab-root": {
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#666666",
              textTransform: "none",
              fontFamily: "'Georgia', 'Garamond', serif",
              minWidth: "auto",
              px: 2,
              py: 1.5,
              "&.Mui-selected": {
                color: "#dc2626",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#dc2626",
              height: "3px",
            },
          }}
        >
          {states.map((state, index) => (
            <Tab key={index} label={state} />
          ))}
        </Tabs>
      </Box>

      {/* Cards Grid - EXACT SAME as EditorsPicks (2 columns) */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
          },
          gap: 2.5,
        }}
      >
        {stateNews.map((news, idx) => (
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
            onClick={() => news.url && window.open(news.url, '_blank')}
          >
            {/* Image - EXACT SAME */}
            <Box
              sx={{
                width: "100%",
                height: "180px",
                overflow: "hidden",
                borderBottom: "2px solid #e8e8e8",
              }}
            >
              <img
                src={news.img || news.fallbackImg}
                alt={news.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = news.fallbackImg;
                }}
              />
            </Box>

            {/* Content - EXACT SAME */}
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
                <CategoryBadge category={news.category} />
                <TimeStamp time={news.time} />
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
                {news.title}
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
                {news.desc}
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
                <ViewCount count={news.views} />
                <ReadMoreButton onClick={(e) => {
                  e.stopPropagation();
                  news.url && window.open(news.url, '_blank');
                }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
