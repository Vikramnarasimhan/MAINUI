import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CategoryBadge from "./CategoryBadge";
import TimeStamp from "./TimeStamp";
import ViewCount from "./ViewCount";
import ReadMoreButton from "./ReadMoreButton";
import NewsService from "../services/NewsService";

// Fallback images
import pickImg1 from "../assets/climatechange.png";
import pickImg2 from "../assets/AI.png";
import pickImg3 from "../assets/economy.png";
import pickImg4 from "../assets/indianworldcup.png";

export default function EditorsPicks() {
  const [page, setPage] = useState(0);
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditorsPicks();
  }, []);

  const fetchEditorsPicks = async () => {
    try {
      const news = await NewsService.getNewsByCategory('technology');
      
      if (news && news.length > 0) {
        // Take up to 8 articles for carousel (2 pages of 4)
        const editorPicks = news.slice(0, 8).map((article, index) => ({
          category: article.source?.name || "Technology",
          title: article.title,
          desc: article.description || "Read more about this fascinating story...",
          img: article.urlToImage,
          time: getTimeAgo(article.publishedAt),
          views: Math.floor(Math.random() * 100000 + 50000),
          url: article.url,
          fallbackImg: [pickImg1, pickImg2, pickImg3, pickImg4][index % 4]
        }));
        
        setPicks(editorPicks);
      }
    } catch (error) {
      console.error("Error fetching editor's picks:", error);
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

  const handleNext = () => setPage((prev) => Math.min(prev + 1, Math.ceil(picks.length / 4) - 1));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));

  const visiblePicks = picks.slice(page * 4, page * 4 + 4);
  const maxPages = Math.ceil(picks.length / 4);

  if (loading) {
    return (
      <Box sx={{ width: "100%", background: "#ffffff", py: 4, px: 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.9rem', color: '#666' }}>
          Loading Editor's Picks...
        </Typography>
      </Box>
    );
  }

  if (!picks.length) {
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
      {/* Section Header with Navigation - Same design */}
      <Box
        sx={{
          maxWidth: "1300px",
          mx: "auto",
          mb: 3,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            Editors Picks
          </Typography>

          {/* Navigation Arrows */}
          <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
            <IconButton
              onClick={handlePrev}
              disabled={page === 0}
              sx={{
                bgcolor: page === 0 ? "#e8e8e8" : "#dc2626",
                color: "#ffffff",
                width: 35,
                height: 35,
                "&:hover": { bgcolor: "#991b1b" },
                "&:disabled": { bgcolor: "#e8e8e8", color: "#999999" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={page >= maxPages - 1}
              sx={{
                bgcolor: page >= maxPages - 1 ? "#e8e8e8" : "#dc2626",
                color: "#ffffff",
                width: 35,
                height: 35,
                "&:hover": { bgcolor: "#991b1b" },
                "&:disabled": { bgcolor: "#e8e8e8", color: "#999999" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ width: "80px", height: "3px", background: "#dc2626", mt: 1 }} />
      </Box>

      {/* Cards Grid - Same design */}
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
        {visiblePicks.map((pick, idx) => (
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
            onClick={() => pick.url && window.open(pick.url, '_blank')}
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
                src={pick.img || pick.fallbackImg}
                alt={pick.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = pick.fallbackImg;
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
                <CategoryBadge category={pick.category} />
                <TimeStamp time={pick.time} />
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
                {pick.title}
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
                {pick.desc}
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
                <ViewCount count={pick.views} />
                <ReadMoreButton onClick={(e) => {
                  e.stopPropagation();
                  pick.url && window.open(pick.url, '_blank');
                }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
