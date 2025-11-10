import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewsService from "../services/NewsService";

// Smart emoji mapping based on keywords
const getEmoji = (title) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('scam') || lowerTitle.includes('fraud') || lowerTitle.includes('breaking')) return '🚨';
  if (lowerTitle.includes('tax') || lowerTitle.includes('money') || lowerTitle.includes('₹')) return '💰';
  if (lowerTitle.includes('metro') || lowerTitle.includes('train') || lowerTitle.includes('transport')) return '🚇';
  if (lowerTitle.includes('rain') || lowerTitle.includes('weather') || lowerTitle.includes('monsoon')) return '🌧️';
  if (lowerTitle.includes('gold') || lowerTitle.includes('stock') || lowerTitle.includes('market')) return '📈';
  if (lowerTitle.includes('cricket') || lowerTitle.includes('sport') || lowerTitle.includes('match')) return '🏏';
  if (lowerTitle.includes('election') || lowerTitle.includes('vote') || lowerTitle.includes('poll')) return '🗳️';
  if (lowerTitle.includes('tech') || lowerTitle.includes('ai') || lowerTitle.includes('technology')) return '💻';
  if (lowerTitle.includes('health') || lowerTitle.includes('covid') || lowerTitle.includes('vaccine')) return '🏥';
  if (lowerTitle.includes('fire') || lowerTitle.includes('accident') || lowerTitle.includes('tragedy')) return '🔥';
  
  return '📰'; // Default news emoji
};

export default function QuickRead() {
  const [quickReads, setQuickReads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickReads();
  }, []);

  const fetchQuickReads = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        // Take first 5 articles for quick reads
        const quickData = news.slice(0, 5).map((article) => ({
          title: article.title,
          time: getTimeAgo(article.publishedAt),
          emoji: getEmoji(article.title),
          url: article.url,
        }));
        
        setQuickReads(quickData);
      }
    } catch (error) {
      console.error("Error fetching quick reads:", error);
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
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes} min ago`;
      
      const diffHours = Math.floor(diffMinutes / 60);
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
          Loading quick reads...
        </Typography>
      </Box>
    );
  }

  if (!quickReads.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header - EXACT SAME */}
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
        Quick Read ⚡
      </Typography>

      {/* Quick Read Items - EXACT SAME DESIGN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {quickReads.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
              p: 1.2,
              background: "#ffffff",
              border: "1px solid #e8e8e8",
              borderRadius: "0px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#dc2626",
                transform: "translateX(4px)",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.1)",
              },
            }}
            onClick={() => item.url && window.open(item.url, '_blank')}
          >
            {/* Smart Emoji */}
            <Typography sx={{ fontSize: "1.5rem", flexShrink: 0 }}>
              {item.emoji}
            </Typography>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
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
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#999999",
                }}
              >
                {item.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
