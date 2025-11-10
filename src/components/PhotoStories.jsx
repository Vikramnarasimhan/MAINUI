import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryBadge from "./CategoryBadge";
import NewsService from "../services/NewsService";

// Fallback images
import photoImg1 from "../assets/climatechange.png";
import photoImg2 from "../assets/AI.png";
import photoImg3 from "../assets/economy.png";
import photoImg4 from "../assets/indianworldcup.png";

export default function PhotoStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotoStories();
  }, []);

  const fetchPhotoStories = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        const fallbackImages = [photoImg1, photoImg2, photoImg3, photoImg4];
        
        // Take 4 articles with images for photo stories
        const photoData = news.slice(10, 14).map((article, index) => ({
          title: article.title,
          category: article.source?.name || "News",
          img: article.urlToImage || fallbackImages[index],
          url: article.url,
        }));
        
        setStories(photoData);
      }
    } catch (error) {
      console.error("Error fetching photo stories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 4, textAlign: 'center', py: 2 }}>
        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
          Loading photo stories...
        </Typography>
      </Box>
    );
  }

  if (!stories.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          fontSize: "1.8rem",
          color: "#dc2626",
          mb: 2,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontFamily: "'Georgia', 'Garamond', serif",
        }}
      >
        In Photos 📸
      </Typography>

      {/* 2x2 Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {stories.map((story, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: "280px",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(220, 38, 38, 0.2)",
                "& .overlay": {
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                },
                "& img": {
                  transform: "scale(1.08)",
                },
              },
            }}
            onClick={() => story.url && window.open(story.url, '_blank')}
          >
            {/* Image */}
            <Box
              component="img"
              src={story.img}
              alt={story.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              onError={(e) => {
                e.target.src = photoImg1;
              }}
            />

            {/* Gradient Overlay */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
                transition: "background 0.3s ease",
              }}
            />

            {/* Content */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                color: "#ffffff",
                zIndex: 1,
              }}
            >
              {/* Category Badge */}
              <Box sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: "inline-block",
                    background: "rgba(220, 38, 38, 0.95)",
                    color: "#ffffff",
                    px: 1,
                    py: 0.4,
                    borderRadius: "3px",
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {story.category}
                </Box>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  lineHeight: 1.3,
                  fontFamily: "'Georgia', 'Garamond', serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {story.title}
              </Typography>
            </Box>

            {/* Photo Icon Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(255, 255, 255, 0.95)",
                color: "#dc2626",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              📸
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
