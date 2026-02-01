import express from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const APP_ID = "7601045140468844555";
const CLIENT_SECRET = "8l9qlCuUBOe800nOZahWAm2dSQfXRp87";
const REDIRECT_URI = "http://localhost:5173/oauth/callback";

app.get("/", (req, res) => {
  res.send("✅ TikTok Backend API is running");
});

app.post("/auth/token", async (req, res) => {
  const { auth_code } = req.body;
  console.log("➡️ /auth/token called with auth_code:", auth_code);

  try {
    const response = await axios.post(
      "https://business-api.tiktok.com/open_api/v1.2/oauth2/access_token/",
      {
        app_id: APP_ID,
        secret: CLIENT_SECRET,
        auth_code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }
    );

    console.log("✅ Token exchange success:", response.data);
    res.json(response.data.data);
  } catch (err) {
    console.error("❌ OAuth token exchange failed:", err.response?.data || err.message);
    res.status(400).json({ message: "OAuth token exchange failed" });
  }
});

app.post("/ads/create", (req, res) => {
  const { form, token } = req.body;
  console.log("➡️ /ads/create called with form:", form, "Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  if (form.musicOption === "existing" && form.musicId === "bad_id") {
    return res.status(400).json({ message: "Invalid Music ID" });
  }

  res.json({ message: "Ad submitted successfully", form });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
