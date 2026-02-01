const APP_ID = "7601045140468844555";
const REDIRECT_URI = "http://localhost:5173/oauth/callback";

export default function OAuthButton() {
  const handleConnect = () => {
    const authUrl = `https://ads.tiktok.com/marketing_api/auth?app_id=${APP_ID}&state=xyz&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition" onClick={handleConnect}>Connect TikTok Ads Account</button>;
}
