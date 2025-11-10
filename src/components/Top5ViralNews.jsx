import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const viralVideos = [
  { title: "Viral Clip 1", url: "/videos/clip1.mp4" },
  { title: "Viral Clip 2", url: "/videos/clip2.mp4" },
  { title: "Viral Clip 3", url: "/videos/clip3.mp4" },
  { title: "Viral Clip 4", url: "/videos/clip4.mp4" },
  { title: "Viral Clip 5", url: "/videos/clip5.mp4" },
];

export default function Top5ViralNews() {
  const [current, setCurrent] = useState(0);
  const timeout = useRef();

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % viralVideos.length);
    }, 10000);
    return () => clearTimeout(timeout.current);
  }, [current]);

  return (
    <Box sx={{ mb: 3 }}>
      {/* Section Header - Compact Newspaper Style */}
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
          Top Viral
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

      {/* Video Card - Compact with Border */}
      <Box
        sx={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            borderColor: "#dc2626",
            borderWidth: "2px",
          },
        }}
      >
        {/* Video Container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%", // 16:9 aspect ratio
            background: "#000000",
          }}
        >
          <video
            key={viralVideos[current].url}
            src={viralVideos[current].url}
            controls
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Video Title - Compact */}
        <Box
          sx={{
            p: 1.5,
            borderTop: "1px solid #e8e8e8",
            background: "#fef2f2",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#1a1a1a",
              display: "block",
              textAlign: "center",
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            {viralVideos[current].title}
          </Typography>

          {/* Video Counter */}
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.7rem",
              color: "#dc2626",
              fontWeight: 700,
              display: "block",
              textAlign: "center",
              mt: 0.5,
            }}
          >
            {current + 1} / {viralVideos.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
