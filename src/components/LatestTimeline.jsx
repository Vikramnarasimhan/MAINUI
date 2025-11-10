import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NewsService from "../services/NewsService";

export default function LatestTimeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimelineNews();
  }, []);

  const fetchTimelineNews = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        // Take first 3 articles and format them for timeline
        const timeline = news.slice(0, 3).map((article) => ({
          time: formatTime(article.publishedAt),
          title: article.title,
          desc: article.description || "Click to read the full story...",
          url: article.url,
        }));
        
        setTimelineData(timeline);
      }
    } catch (error) {
      console.error("Error fetching timeline:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    
    try {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } catch {
      return "Recently";
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 3, textAlign: 'center', py: 2 }}>
        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
          Loading timeline...
        </Typography>
      </Box>
    );
  }

  if (!timelineData.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Section Header - EXACT SAME */}
      <Box sx={{ mb: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            fontSize: "0.95rem",
            color: "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontFamily: "'Georgia', 'Garamond', serif",
            mb: 0.8,
          }}
        >
          Latest Timeline
        </Typography>
        <Box
          sx={{
            width: "50px",
            height: "3px",
            background: "#dc2626",
            borderRadius: "2px",
          }}
        />
      </Box>

      {/* Timeline Container - EXACT SAME */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
          p: 2,
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {timelineData.map((item, index) => (
          <Box
            key={index}
            sx={{
              mb: index < timelineData.length - 1 ? 2.5 : 0,
              pl: 2,
              borderLeft: "3px solid #dc2626",
              position: "relative",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                borderLeftColor: "#991b1b",
                pl: 2.3,
              },
            }}
            onClick={() => item.url && window.open(item.url, '_blank')}
          >
            {/* Time Badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 0.8,
                gap: 0.5,
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: "0.9rem",
                  color: "#dc2626",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#dc2626",
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                {item.time}
              </Typography>
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.85rem",
                color: "#1a1a1a",
                mb: 0.5,
                lineHeight: 1.3,
                fontFamily: "'Georgia', 'Garamond', serif",
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
                fontSize: "0.75rem",
                color: "#666666",
                lineHeight: 1.5,
                fontFamily: "'Georgia', 'Garamond', serif",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.desc}
            </Typography>

            {/* Separator Line */}
            {index < timelineData.length - 1 && (
              <Box
                sx={{
                  height: "1px",
                  background: "#e8e8e8",
                  mt: 2,
                  ml: -2,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
