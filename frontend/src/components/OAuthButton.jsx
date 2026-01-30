const CLIENT_ID = "aw5uj7i5cab1f3dl"; // your TikTok App ID
const REDIRECT_URI = "http://localhost:5173/oauth/callback";

export default function OAuthButton() {
  const handleConnect = () => {
    const authUrl = `https://ads.tiktok.com/open_api/oauth2/authorize?app_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&state=xyz&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      Connect TikTok Ads Account
    </button>
  );
}
