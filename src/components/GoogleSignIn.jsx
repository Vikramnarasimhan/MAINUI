import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { apiCall } from "../services/NewsService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GoogleSignIn() {
  // Google Auth State
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  
  // Email Auth State
  const [authMode, setAuthMode] = useState("choice"); // choice, login, register, forgot, otp
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google && window.google.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: "149556294799-0nrvpvjuud49tre74fd8upqe64glv7bo.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        width: "100%",
      });
    }
  }, []);

  // Google Sign-In Handler
  async function handleCredentialResponse(credentialResponse) {
    try {
      setStatus("loading");
      setMessage("Signing you in...");
      const idToken = credentialResponse.credential;

      const response = await fetch("https://nzr7umplye.execute-api.eu-central-1.amazonaws.com/firstgoogletoken/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      if (!response.ok) throw new Error("Backend error: " + response.statusText);

      const result = await response.json();
      setUser(result.user);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      setStatus("success");
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setStatus("error");
      setMessage("Login failed. Please try again.");
    }
  }

  // Email Auth Handlers
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const data = await apiCall({ type: "login", username, email, password });
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      setStatus("success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      setStatus("idle");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !name || !password) {
        toast.error("Please fill all fields.");
        return;
      }
      setStatus("loading");
      await apiCall({ type: "send_otp", email, name });
      toast.success("OTP sent! Check your email.");
      setAuthMode("otp");
      setStatus("idle");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP.");
      setStatus("idle");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      await apiCall({
        type: "verify_otp",
        email,
        username,
        otp,
        name,
        password,
      });
      toast.success("Account created! Redirecting...");
      setStatus("success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Invalid OTP.");
      setStatus("idle");
    }
  };

  const benefits = [
    "Access to premium news content",
    "Personalized news feed",
    "Save articles for later",
    "Ad-free reading experience",
    "Multi-device synchronization",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8f8f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 3,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Box sx={{ maxWidth: "900px", width: "100%" }}>
        {/* Logo & Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 2 }}>
            <NewspaperIcon sx={{ fontSize: "3rem", color: "#dc2626" }} />
            <Typography
              sx={{
                fontSize: "3rem",
                fontWeight: 900,
                color: "#dc2626",
                fontFamily: "'Georgia', 'Garamond', serif",
                letterSpacing: "2px",
              }}
            >
              MID NEWS
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#666666",
              fontFamily: "'Georgia', 'Garamond', serif",
            }}
          >
            Your trusted source for news
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Left Side - Benefits */}
          <Card
            sx={{
              background: "#ffffff",
              borderRadius: "4px",
              border: "1px solid #e8e8e8",
              display: { xs: "none", md: "block" },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#dc2626",
                  fontFamily: "'Georgia', 'Garamond', serif",
                  mb: 3,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Why Sign In?
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: "#16a34a", fontSize: "1.5rem", flexShrink: 0 }} />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "#1a1a1a",
                        fontFamily: "'Georgia', 'Garamond', serif",
                        lineHeight: 1.6,
                      }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, pt: 3, borderTop: "2px solid #e8e8e8" }}>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    color: "#666666",
                    fontStyle: "italic",
                    fontFamily: "'Georgia', 'Garamond', serif",
                    lineHeight: 1.6,
                  }}
                >
                  "Stay informed with real-time updates and personalized news from around the world."
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Right Side - Auth Forms */}
          <Card
            sx={{
              background: "#ffffff",
              borderRadius: "4px",
              border: "3px solid #dc2626",
              boxShadow: "0 8px 20px rgba(220, 38, 38, 0.15)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {!user && authMode === "choice" && (
                <>
                  <Typography
                    sx={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#dc2626",
                      fontFamily: "'Georgia', 'Garamond', serif",
                      mb: 1,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#666666",
                      fontFamily: "'Georgia', 'Garamond', serif",
                      mb: 4,
                      textAlign: "center",
                    }}
                  >
                    Sign in with Google to continue
                  </Typography>

                  {/* Google Sign-In Button */}
                  <Box sx={{ mb: 3 }}>
                    <div id="signInDiv" style={{ display: "flex", justifyContent: "center" }}></div>
                  </Box>

                  {/* Status Messages */}
                  {status === "loading" && (
                    <Box sx={{ textAlign: "center", py: 2 }}>
                      <CircularProgress size={30} sx={{ color: "#dc2626", mb: 1 }} />
                      <Typography sx={{ fontSize: "0.9rem", color: "#666666" }}>
                        {message}
                      </Typography>
                    </Box>
                  )}

                  {status === "error" && (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 2,
                        background: "rgba(220, 38, 38, 0.05)",
                        borderRadius: "4px",
                        border: "1px solid rgba(220, 38, 38, 0.2)",
                      }}
                    >
                      <ErrorIcon sx={{ color: "#dc2626", fontSize: "2rem", mb: 1 }} />
                      <Typography sx={{ fontSize: "0.9rem", color: "#dc2626", fontWeight: 600 }}>
                        {message}
                      </Typography>
                    </Box>
                  )}

                  {/* Divider */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 3 }}>
                    <Box sx={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
                    <Typography sx={{ color: "#999999", fontSize: "0.85rem" }}>OR</Typography>
                    <Box sx={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
                  </Box>

                  {/* Continue with Email */}
                  <Button
                    fullWidth
                    onClick={() => setAuthMode("login")}
                    sx={{
                      background: "#dc2626",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textTransform: "none",
                      py: 1.5,
                      borderRadius: "4px",
                      fontFamily: "'Georgia', 'Garamond', serif",
                      "&:hover": { background: "#991b1b" },
                    }}
                  >
                    Continue with Email
                  </Button>

                  {/* Terms */}
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#999999",
                      textAlign: "center",
                      lineHeight: 1.5,
                      mt: 3,
                    }}
                  >
                    By signing in, you agree to our{" "}
                    <span style={{ color: "#dc2626", cursor: "pointer" }}>Terms</span> and{" "}
                    <span style={{ color: "#dc2626", cursor: "pointer" }}>Privacy Policy</span>
                  </Typography>
                </>
              )}

              {/* Login Form */}
              {authMode === "login" && (
                <Box component="form" onSubmit={handleEmailLogin}>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", mb: 3, textAlign: "center" }}>
                    Login
                  </Typography>
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    disabled={status === "loading"}
                    sx={{
                      background: "#dc2626",
                      color: "#ffffff",
                      fontWeight: 700,
                      py: 1.5,
                      mb: 2,
                      "&:hover": { background: "#991b1b" },
                    }}
                  >
                    {status === "loading" ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
                  </Button>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Typography
                      onClick={() => setAuthMode("forgot")}
                      sx={{ fontSize: "0.85rem", color: "#dc2626", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                  <Button fullWidth onClick={() => setAuthMode("register")} sx={{ color: "#666", textTransform: "none" }}>
                    Don't have an account? <strong style={{ color: "#dc2626", marginLeft: 4 }}>Register</strong>
                  </Button>
                  <Button fullWidth onClick={() => setAuthMode("choice")} sx={{ color: "#666", textTransform: "none", mt: 1 }}>
                    ← Back
                  </Button>
                </Box>
              )}

              {/* Register Form */}
              {authMode === "register" && (
                <Box component="form" onSubmit={handleSendOtp}>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", mb: 3, textAlign: "center" }}>
                    Register
                  </Typography>
                  <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} />
                  <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required sx={{ mb: 2 }} />
                  <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} />
                  <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 2 }} />
                  <Button fullWidth type="submit" disabled={status === "loading"} sx={{ background: "#dc2626", color: "#fff", fontWeight: 700, py: 1.5, mb: 2, "&:hover": { background: "#991b1b" } }}>
                    {status === "loading" ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Send OTP"}
                  </Button>
                  <Button fullWidth onClick={() => setAuthMode("login")} sx={{ color: "#666", textTransform: "none" }}>
                    Already have an account? <strong style={{ color: "#dc2626", marginLeft: 4 }}>Login</strong>
                  </Button>
                  <Button fullWidth onClick={() => setAuthMode("choice")} sx={{ color: "#666", textTransform: "none", mt: 1 }}>
                    ← Back
                  </Button>
                </Box>
              )}

              {/* OTP Verification */}
              {authMode === "otp" && (
                <Box component="form" onSubmit={handleVerifyOtp}>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", mb: 3, textAlign: "center" }}>
                    Verify OTP
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#666", mb: 3, textAlign: "center" }}>
                    Enter the OTP sent to {email}
                  </Typography>
                  <TextField fullWidth label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required sx={{ mb: 2 }} />
                  <Button fullWidth type="submit" disabled={status === "loading"} sx={{ background: "#dc2626", color: "#fff", fontWeight: 700, py: 1.5, mb: 2, "&:hover": { background: "#991b1b" } }}>
                    {status === "loading" ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Verify & Create Account"}
                  </Button>
                  <Button fullWidth onClick={() => setAuthMode("register")} sx={{ color: "#666", textTransform: "none" }}>
                    ← Back
                  </Button>
                </Box>
              )}

              {/* Forgot Password */}
              {authMode === "forgot" && (
                <Box>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", mb: 3, textAlign: "center" }}>
                    Forgot Password
                  </Typography>
                  <TextField fullWidth label="Email" type="email" sx={{ mb: 2 }} />
                  <Button fullWidth sx={{ background: "#dc2626", color: "#fff", fontWeight: 700, py: 1.5, mb: 2, "&:hover": { background: "#991b1b" } }}>
                    Send Reset Link
                  </Button>
                  <Button fullWidth onClick={() => setAuthMode("login")} sx={{ color: "#666", textTransform: "none" }}>
                    ← Back to Login
                  </Button>
                </Box>
              )}

              {/* Success View */}
              {user && (
                <Box sx={{ textAlign: "center" }}>
                  <CheckCircleIcon sx={{ fontSize: "4rem", color: "#16a34a", mb: 2 }} />
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", mb: 1 }}>
                    {message}
                  </Typography>
                  <Typography sx={{ fontSize: "1.2rem", color: "#1a1a1a", mb: 0.5 }}>
                    Welcome, <strong>{user.name}</strong>
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", color: "#666", mb: 3 }}>
                    {user.email}
                  </Typography>
                  <Button
                    fullWidth
                    onClick={() => {
                      setUser(null);
                      setStatus("idle");
                      setAuthMode("choice");
                      window.google.accounts.id.prompt();
                    }}
                    sx={{ background: "#dc2626", color: "#fff", fontWeight: 700, py: 1.5, "&:hover": { background: "#991b1b" } }}
                  >
                    Sign Out
                  </Button>
                </Box>
              )}
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
              "&:hover": { color: "#dc2626", background: "rgba(220, 38, 38, 0.05)" },
            }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
