import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Typography from "@mui/material/Typography";
import Navbar from "./components/Navbar";
import SocialFeed from "./components/SocialFeed";
import BreakingNewsSection from "./components/BreakingNewsSection";
import LatestHeadlines from "./components/LatestHeadlines";
import SidebarAdBanner from "./components/SidebarAdBanner";
import StockWidget from "./components/StockWidget";
import LatestTimeline from "./components/LatestTimeline";
import LiveTicker from "./components/LiveTicker";
import TrendingNews from "./components/TrendingNews";
import ExploreMore from "./components/ExploreMore";
import EditorsPicks from "./components/EditorsPicks";
import TopStories from "./components/TopStories";
import LeftColumnAd from "./components/LeftColumnAd";
import StateUpdates from "./components/StateUpdates";
import AdBanner from "./components/AdBanner";
import PopularTags from "./components/PopularTags";
import FactOfTheDay from "./components/FactOfTheDay";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import SubscriptionForm from "./pages/SubscriptionForm";
import GoogleSignIn from "./components/GoogleSignIn";
import TrendingVideos from "./components/TrendingVideos";
import OpinionAnalysis from "./components/MustReadToday";
import QuickRead from "./components/QuickRead";
import PhotoStories from "./components/PhotoStories";
import StripeCheckout from "./components/StripeCheckout";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./stripe/stripePromise";

function MainPageContent() {
  return (
    <div
      style={{
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <LiveTicker />
      <div style={{ marginTop: 170 }}>
        <AdBanner />
        <main
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            marginTop: 32,
            paddingBottom: 50,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "18%",
                minWidth: "220px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                borderRight: "2px solid #e8e8e8",
                paddingRight: "24px",
              }}
            >
              <LatestHeadlines />
              <SidebarAdBanner />
              <TrendingNews />
              <TrendingVideos />
              <LeftColumnAd />
              <PopularTags />
            </div>

            <div
              style={{
                width: "64%",
                flex: "1",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <BreakingNewsSection />
              <FactOfTheDay />
            </div>
            <Box sx={{ height: "40px" }} />
            <div
              style={{
                width: "18%",
                minWidth: "220px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                borderLeft: "2px solid #e8e8e8",
                paddingLeft: "24px",
              }}
            >
              <StockWidget />
              <LatestTimeline />
              <TopStories />
              <QuickRead />
              <SocialFeed />
            </div>
          </div>
        </main>
        <Box
          sx={{
            mb: 4,
            background: "#ffffff",
            borderTop: "3px solid #dc2626",
            borderBottom: "1px solid #e8e8e8",
            width: "100%",
            mt: 4,
          }}
        >
          <ExploreMore />
        </Box>
        <Box sx={{ height: "40px" }} />
        <Box
          sx={{
            mb: 4,
            background: "#ffffff",
            borderTop: "3px solid #dc2626",
            borderBottom: "1px solid #e8e8e8",
            width: "100%",
          }}
        >
          <EditorsPicks />
        </Box>
        <Box
          sx={{
            mb: 4,
            background: "#ffffff",
            borderTop: "3px solid #dc2626",
            borderBottom: "1px solid #e8e8e8",
            width: "100%",
          }}
        >
          <StateUpdates />
        </Box>
        <Box
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "3px solid #dc2626",
            background: "#ffffff",
            width: "100%",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#999999",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            © 2025 MID News. All Rights Reserved.
          </Typography>
        </Box>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Home/news page */}
        <Route path="/" element={<MainPageContent />} />
        {/* Subscription pages */}
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/subscribe" element={<SubscriptionForm />} />
        {/* Auth route */}
        <Route path="/signin" element={<GoogleSignIn />} />
        {/* Checkout with Stripe */}
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <StripeCheckout />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}
