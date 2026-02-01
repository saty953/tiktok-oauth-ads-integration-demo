import { useEffect } from "react";
import axios from "axios";

export default function OAuthCallback() {
  useEffect(() => {
    const auth_code = new URLSearchParams(window.location.search).get("code");

    if (auth_code) {
      axios
        .post("http://localhost:5000/auth/token", { auth_code })
        .then((res) => {
          localStorage.setItem("tiktok_token", res.data.access_token);
          window.location.href = "/";
        })
        .catch((err) => {
          console.error("OAuth Error:", err.response?.data || err.message);
        });
    }
  }, []);

  return <div>Processing TikTok OAuth...</div>;
}
