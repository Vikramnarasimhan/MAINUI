import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const plans = {
    monthly: {
      name: "Monthly Plan",
      price: "₹99",
      period: "category / month",
      features: [
        { text: "Full access to all selected categories", included: true },
        { text: "Offline downloads", included: true },
        { text: "Ad-free reading experience", included: true },
        { text: "No early access to new reports", included: false },
        { text: "No exclusive yearly analytics", included: false },
      ],
    },
    yearly: {
      name: "Yearly Plan",
      price: "₹399",
      period: "category / year",
      features: [
        { text: "Unlimited category access", included: true },
        { text: "Offline downloads + Analytics", included: true },
        { text: "Ad-free + Priority updates", included: true },
        { text: "Early access to reports", included: true },
        { text: "24×7 Priority Support", included: true },
      ],
      badge: "Best Value",
    },
  };

  const handleSubscribe = (planType) => {
    navigate("/subscribe", { state: { plan: planType } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8f8f8", // Same as main page
        py: 6,
        px: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "#dc2626", // Main red from news site
            fontFamily: "'Georgia', 'Garamond', serif",
            mb: 1,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Choose Your Subscription Plan
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#666666",
            fontFamily: "'Georgia', 'Garamond', serif",
          }}
        >
          Select the perfect plan for your news reading needs
        </Typography>
      </Box>

      {/* Plans Grid */}
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 4,
        }}
      >
        {/* Monthly Plan */}
        <Card
          sx={{
            background: "#ffffff",
            borderRadius: "4px",
            border: "1px solid #e8e8e8",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 8px 20px rgba(220, 38, 38, 0.15)",
              borderColor: "#dc2626",
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Plan Name */}
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#dc2626",
                textAlign: "center",
                fontFamily: "'Georgia', 'Garamond', serif",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Monthly Plan
            </Typography>

            {/* Price */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#dc2626",
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                ₹99 <Typography component="span" sx={{ fontSize: "1rem", color: "#666666", fontWeight: 600 }}>/ category / month</Typography>
              </Typography>
            </Box>

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              {plans.monthly.features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  {feature.included ? (
                    <CheckIcon sx={{ color: "#16a34a", fontSize: "1.2rem" }} />
                  ) : (
                    <CloseIcon sx={{ color: "#dc2626", fontSize: "1.2rem" }} />
                  )}
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: feature.included ? "#1a1a1a" : "#999999",
                      fontFamily: "'Georgia', 'Garamond', serif",
                    }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Subscribe Button */}
            <Button
              fullWidth
              onClick={() => handleSubscribe("monthly")}
              sx={{
                background: "#ffffff",
                color: "#dc2626",
                border: "2px solid #dc2626",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "none",
                py: 1.5,
                borderRadius: "4px",
                fontFamily: "'Georgia', 'Garamond', serif",
                "&:hover": {
                  background: "#dc2626",
                  color: "#ffffff",
                },
              }}
            >
              Subscribe Monthly
            </Button>
          </CardContent>
        </Card>

        {/* Yearly Plan (Best Value) */}
        <Card
          sx={{
            background: "#ffffff",
            borderRadius: "4px",
            border: "3px solid #dc2626",
            position: "relative",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 24px rgba(220, 38, 38, 0.25)",
            },
          }}
        >
          {/* Best Value Badge */}
          <Box
            sx={{
              position: "absolute",
              top: 5,
              right: 15,
              background: "#dc2626",
              color: "#ffffff",
              px: 2.5,
              py: 0.8,
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              boxShadow: "0 4px 8px rgba(220, 38, 38, 0.3)",
            }}
          >
            <LocalOfferIcon sx={{ fontSize: "1rem" }} />
            Best Value
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Plan Name */}
            <Typography
              sx={{
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#dc2626",
                textAlign: "center",
                fontFamily: "'Georgia', 'Garamond', serif",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Yearly Plan
            </Typography>

            {/* Price */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#dc2626",
                  fontFamily: "'Georgia', 'Garamond', serif",
                }}
              >
                ₹399 <Typography component="span" sx={{ fontSize: "1rem", color: "#666666", fontWeight: 600 }}>/ category / year</Typography>
              </Typography>
            </Box>

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              {plans.yearly.features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  <CheckIcon sx={{ color: "#16a34a", fontSize: "1.2rem" }} />
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#1a1a1a",
                      fontFamily: "'Georgia', 'Garamond', serif",
                    }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Subscribe Button */}
            <Button
              fullWidth
              onClick={() => handleSubscribe("yearly")}
              sx={{
                background: "#dc2626",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1rem",
                textTransform: "none",
                py: 1.5,
                borderRadius: "4px",
                fontFamily: "'Georgia', 'Garamond', serif",
                "&:hover": {
                  background: "#991b1b",
                },
              }}
            >
              Subscribe Yearly
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Back to Home */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            color: "#666666",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "0.95rem",
            "&:hover": {
              color: "#dc2626",
              background: "rgba(220, 38, 38, 0.05)",
            },
          }}
        >
          ← Back to Home
        </Button>
      </Box>
    </Box>
  );
}
