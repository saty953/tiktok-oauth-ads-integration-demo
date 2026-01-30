import express from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";   // 👈 add request logger

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));        // 👈 logs every request automatically

const CLIENT_ID = "aw5uj7i5cab1f3dl"; // your TikTok App ID
const CLIENT_SECRET = "8l9qlCuUBOe800nOZahWAm2dSQfXRp87";
const REDIRECT_URI = "http://localhost:5173/oauth/callback";

// Root route just to confirm server is alive
app.get("/", (req, res) => {
  res.send("✅ TikTok Backend API is running");
});

// Exchange code for access token
app.post("/auth/token", async (req, res) => {
  const { code } = req.body;
  console.log("➡️ /auth/token called with code:", code); // 👈 log request
  try {
    const response = await axios.post(
      "https://business-api.tiktokglobalshop.com/open_api/oauth2/access_token/",
      {
        app_id: CLIENT_ID,
        secret: CLIENT_SECRET,
        auth_code: code,
        grant_type: "authorization_code",
      }
    );
    console.log("✅ Token exchange success:", response.data); // 👈 log response
    res.json(response.data.data);
  } catch (err) {
    console.error("❌ OAuth token exchange failed:", err.response?.data || err.message);
    res.status(400).json({ message: "OAuth token exchange failed" });
  }
});

// Mock ad submission
app.post("/ads/create", (req, res) => {
  const { form, token } = req.body;
  console.log("➡️ /ads/create called with form:", form, "Token:", token); // 👈 log request

  if (!token) {
    console.warn("⚠️ Missing token in request");
    return res.status(401).json({ message: "Invalid or missing token" });
  }
  if (form.musicOption === "existing" && form.musicId === "bad_id") {
    console.warn("⚠️ Invalid music ID submitted:", form.musicId);
    return res.status(400).json({ message: "Invalid Music ID" });
  }

  console.log("✅ Ad submitted successfully:", form);
  res.json({ message: "Ad submitted successfully", form });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
