import { useEffect, useState } from "react";
import OAuthButton from "../components/OAuthButton";
import ErrorBanner from "../components/ErrorBanner";
import CreativeForm from "../components/CreativeForm";
import { submitAdToTikTok } from "../api/tiktokApi";

export default function Home() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("tiktok_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold">TikTok Ads Creative Flow</h1>

      <ErrorBanner message={error} />

      {token ? (
        <>
          <p className="text-green-600 font-semibold">
            ✅ TikTok Account Connected
          </p>
          <CreativeForm />
        </>
      ) : (
        <OAuthButton setToken={setToken} setError={setError} />
      )}
    </div>
  );
}
