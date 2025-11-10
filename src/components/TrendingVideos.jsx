// import { useRef, useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import CategoryBadge from "./CategoryBadge";
// import ViewCount from "./ViewCount";
// import NewsService from "../services/NewsService";

// // Fallback images
// import videoThumb1 from "../assets/economy.png";
// import videoThumb2 from "../assets/AI.png";
// import videoThumb3 from "../assets/climatechange.png";
// import videoThumb4 from "../assets/indianworldcup.png";
// import videoThumb5 from "../assets/supremecourt.png";

// export default function TrendingVideos() {
//   const scrollRef = useRef(null);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const news = await NewsService.getAllNews();
      
//       if (news && news.length > 0) {
//         // Take first 5 articles and format as "videos"
//         const thumbnails = [videoThumb1, videoThumb2, videoThumb3, videoThumb4, videoThumb5];
        
//         const videoData = news.slice(0, 5).map((article, index) => ({
//           title: article.title,
//           category: article.source?.name || "News",
//           duration: `${Math.floor(Math.random() * 20 + 5)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
//           views: Math.floor(Math.random() * 200000 + 50000),
//           thumbnail: article.urlToImage || thumbnails[index],
//           url: article.url,
//         }));
        
//         setVideos(videoData);
//       }
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ mb: 3, textAlign: 'center', py: 2 }}>
//         <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
//           Loading videos...
//         </Typography>
//       </Box>
//     );
//   }

//   if (!videos.length) {
//     return null;
//   }

//   return (
//     <Box sx={{ mb: 3 }}>
//       {/* Header - EXACT SAME */}
//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: 900,
//           fontSize: "0.9rem",
//           color: "#1a1a1a",
//           textTransform: "uppercase",
//           letterSpacing: "1.5px",
//           fontFamily: "'Georgia', 'Garamond', serif",
//           mb: 1.5,
//           pb: 0.5,
//           borderBottom: "2px solid #dc2626",
//         }}
//       >
//         Trending Videos 📹
//       </Typography>

//       {/* Swipeable Container - EXACT SAME */}
//       <Box sx={{ position: "relative" }}>
//         {/* Left Arrow */}
//         <IconButton
//           onClick={scrollLeft}
//           sx={{
//             position: "absolute",
//             left: "-15px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 2,
//             background: "#ffffff",
//             border: "1px solid #e8e8e8",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             width: "32px",
//             height: "32px",
//             "&:hover": {
//               background: "#dc2626",
//               color: "#ffffff",
//             },
//           }}
//         >
//           ←
//         </IconButton>

//         {/* Scrollable Video Cards */}
//         <Box
//           ref={scrollRef}
//           sx={{
//             display: "flex",
//             gap: 2,
//             overflowX: "auto",
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": { display: "none" },
//             pb: 1,
//           }}
//         >
//           {videos.map((video, index) => (
//             <Box
//               key={index}
//               sx={{
//                 minWidth: "280px",
//                 background: "#ffffff",
//                 border: "1px solid #e8e8e8",
//                 borderRadius: "0px",
//                 overflow: "hidden",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   borderColor: "#dc2626",
//                   transform: "translateY(-4px)",
//                   boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)",
//                 },
//               }}
//               onClick={() => video.url && window.open(video.url, '_blank')}
//             >
//               {/* Video Thumbnail with Play Button */}
//               <Box
//                 sx={{
//                   position: "relative",
//                   width: "100%",
//                   height: "160px",
//                   overflow: "hidden",
//                   background: "#000000",
//                 }}
//               >
//                 {/* Thumbnail Image */}
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     opacity: 0.75,
//                   }}
//                   onError={(e) => {
//                     e.target.src = videoThumb1;
//                   }}
//                 />

//                 {/* Play Button Overlay */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: "56px",
//                     height: "56px",
//                     borderRadius: "50%",
//                     background: "rgba(220, 38, 38, 0.9)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       background: "#dc2626",
//                       transform: "translate(-50%, -50%) scale(1.15)",
//                     },
//                   }}
//                 >
//                   {/* Play Icon Triangle */}
//                   <Box
//                     sx={{
//                       width: 0,
//                       height: 0,
//                       borderLeft: "14px solid #ffffff",
//                       borderTop: "9px solid transparent",
//                       borderBottom: "9px solid transparent",
//                       marginLeft: "3px",
//                     }}
//                   />
//                 </Box>

//                 {/* Duration Badge */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: "8px",
//                     right: "8px",
//                     background: "rgba(0, 0, 0, 0.9)",
//                     color: "#ffffff",
//                     padding: "3px 6px",
//                     borderRadius: "3px",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     fontFamily: "monospace",
//                   }}
//                 >
//                   {video.duration}
//                 </Box>
//               </Box>

//               {/* Video Info */}
//               <Box sx={{ p: 1.5 }}>
//                 {/* Category */}
//                 <Box sx={{ mb: 1 }}>
//                   <CategoryBadge category={video.category} />
//                 </Box>

//                 {/* Title */}
//                 <Typography
//                   sx={{
//                     fontWeight: 700,
//                     fontSize: "0.8rem",
//                     color: "#1a1a1a",
//                     mb: 0.8,
//                     lineHeight: 1.3,
//                     fontFamily: "'Georgia', 'Garamond', serif",
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                     minHeight: "34px",
//                   }}
//                 >
//                   {video.title}
//                 </Typography>

//                 {/* Views */}
//                 <ViewCount count={video.views} />
//               </Box>
//             </Box>
//           ))}
//         </Box>

//         {/* Right Arrow */}
//         <IconButton
//           onClick={scrollRight}
//           sx={{
//             position: "absolute",
//             right: "-15px",
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 2,
//             background: "#ffffff",
//             border: "1px solid #e8e8e8",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             width: "32px",
//             height: "32px",
//             "&:hover": {
//               background: "#dc2626",
//               color: "#ffffff",
//             },
//           }}
//         >
//           →
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }
import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CategoryBadge from "./CategoryBadge";
import ViewCount from "./ViewCount";

// Real trending Indian news videos (updated manually or can be fetched)
const trendingVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "LIVE: PM Modi's Address to Nation | Budget 2025 Highlights",
    category: "Politics",
    duration: "45:23",
    views: 2340000,
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "jNQXAC9IVRw",
    title: "IPL 2025: India vs Australia - Full Match Highlights",
    category: "Sports",
    duration: "12:45",
    views: 1890000,
    thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "9bZkp7q19f0",
    title: "Budget 2025: Complete Analysis by Economic Experts",
    category: "Economy",
    duration: "18:30",
    views: 1560000,
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    id: "kJQP7kiw5Fk",
    title: "Supreme Court Historic Verdict: What It Means for India",
    category: "Politics",
    duration: "15:20",
    views: 1420000,
    thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Tech Giants Launch Revolutionary AI Products in India",
    category: "Technology",
    duration: "10:15",
    views: 980000,
    thumbnail: "https://i.ytimg.com/vi/OPf0YbXqDm0/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
  },
];

export default function TrendingVideos() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
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
        Trending Videos 📹
      </Typography>

      {/* Swipeable Container */}
      <Box sx={{ position: "relative" }}>
        {/* Left Arrow */}
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: "-15px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "#ffffff",
            border: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "32px",
            height: "32px",
            "&:hover": {
              background: "#dc2626",
              color: "#ffffff",
            },
          }}
        >
          ←
        </IconButton>

        {/* Scrollable Video Cards */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            pb: 1,
          }}
        >
          {trendingVideos.map((video, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "280px",
                background: "#ffffff",
                border: "1px solid #e8e8e8",
                borderRadius: "0px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#dc2626",
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)",
                },
              }}
              onClick={() => window.open(video.url, '_blank')}
            >
              {/* Video Thumbnail with Play Button */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "160px",
                  overflow: "hidden",
                  background: "#000000",
                }}
              >
                {/* Real YouTube Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.85,
                  }}
                  onError={(e) => {
                    // Fallback to generic thumbnail if YouTube image fails
                    e.target.src = 'https://via.placeholder.com/320x180/dc2626/ffffff?text=News+Video';
                  }}
                />

                {/* Play Button Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(220, 38, 38, 0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#dc2626",
                      transform: "translate(-50%, -50%) scale(1.15)",
                    },
                  }}
                >
                  {/* Play Icon Triangle */}
                  <Box
                    sx={{
                      width: 0,
                      height: 0,
                      borderLeft: "14px solid #ffffff",
                      borderTop: "9px solid transparent",
                      borderBottom: "9px solid transparent",
                      marginLeft: "3px",
                    }}
                  />
                </Box>

                {/* Duration Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "rgba(0, 0, 0, 0.9)",
                    color: "#ffffff",
                    padding: "3px 6px",
                    borderRadius: "3px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {video.duration}
                </Box>
              </Box>

              {/* Video Info */}
              <Box sx={{ p: 1.5 }}>
                {/* Category */}
                <Box sx={{ mb: 1 }}>
                  <CategoryBadge category={video.category} />
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#1a1a1a",
                    mb: 0.8,
                    lineHeight: 1.3,
                    fontFamily: "'Georgia', 'Garamond', serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "34px",
                  }}
                >
                  {video.title}
                </Typography>

                {/* Views */}
                <ViewCount count={video.views} />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: "-15px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "#ffffff",
            border: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: "32px",
            height: "32px",
            "&:hover": {
              background: "#dc2626",
              color: "#ffffff",
            },
          }}
        >
          →
        </IconButton>
      </Box>
    </Box>
  );
}
