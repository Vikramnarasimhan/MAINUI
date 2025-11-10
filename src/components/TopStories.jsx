import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NewsService from "../services/NewsService";

// Fallback images
import newsImg1 from "../assets/AI.png";
import newsImg2 from "../assets/climatechange.png";
import newsImg3 from "../assets/economy.png";
import newsImg4 from "../assets/indianworldcup.png";

export default function TopStories() {
  const [swiper, setSwiper] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopStories();
  }, []);

  const fetchTopStories = async () => {
    try {
      const news = await NewsService.getAllNews();
      
      if (news && news.length > 0) {
        // Take 4-6 articles for carousel
        const topStories = news.slice(0, 4).map((article, index) => ({
          title: article.title,
          desc: article.description || "Read the full story for more details...",
          img: article.urlToImage,
          category: article.source?.name || "News",
          url: article.url,
          fallbackImg: [newsImg1, newsImg2, newsImg3, newsImg4][index % 4]
        }));
        
        setStories(topStories);
      }
    } catch (error) {
      console.error("Error fetching top stories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mb: 3, textAlign: 'center', p: 2 }}>
        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
          Loading stories...
        </Typography>
      </Box>
    );
  }

  if (!stories.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header - Same design */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: "0.85rem",
          color: "#1a1a1a",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontFamily: "'Georgia', 'Garamond', serif",
          mb: 1,
          pb: 0.5,
          borderBottom: "2px solid #dc2626",
        }}
      >
        Top Stories
      </Typography>

      {/* Swiper Carousel - Same design */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Swiper
          onSwiper={setSwiper}
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          loop={true}
          style={{
            "--swiper-pagination-color": "#dc2626",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-navigation-color": "#dc2626",
            "--swiper-navigation-size": "20px",
          }}
        >
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    "& .story-image": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
                onClick={() => story.url && window.open(story.url, '_blank')}
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
                  <Box
                    className="story-image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${story.img || story.fallbackImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ p: 1.5 }}>
                  {/* Category Badge */}
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      background: "#dc2626",
                      color: "#ffffff",
                      px: 1,
                      py: 0.3,
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontFamily: "'Georgia', 'Garamond', serif",
                      mb: 1,
                    }}
                  >
                    {story.category}
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: "#1a1a1a",
                      lineHeight: 1.3,
                      mb: 0.8,
                      fontFamily: "'Georgia', 'Garamond', serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {story.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#666666",
                      lineHeight: 1.4,
                      fontFamily: "'Georgia', 'Garamond', serif",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {story.desc}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - Same design */}
        <Box
          className="swiper-button-prev"
          sx={{
            position: "absolute",
            left: "10px",
            top: "40%",
            zIndex: 10,
            cursor: "pointer",
            background: "rgba(255,255,255,0.9)",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#dc2626",
              color: "#ffffff",
            },
            "&.swiper-button-disabled": {
              opacity: 0.3,
              cursor: "default",
            },
          }}
        />
        <Box
          className="swiper-button-next"
          sx={{
            position: "absolute",
            right: "10px",
            top: "40%",
            zIndex: 10,
            cursor: "pointer",
            background: "rgba(255,255,255,0.9)",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#dc2626",
              color: "#ffffff",
            },
            "&.swiper-button-disabled": {
              opacity: 0.3,
              cursor: "default",
            },
          }}
        />

        {/* Pagination Dots - Same design */}
        <Box
          sx={{
            ".swiper-pagination": {
              bottom: "8px !important",
            },
            ".swiper-pagination-bullet": {
              width: "8px",
              height: "8px",
              background: "#999999",
              opacity: 0.5,
            },
            ".swiper-pagination-bullet-active": {
              background: "#dc2626",
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
}
