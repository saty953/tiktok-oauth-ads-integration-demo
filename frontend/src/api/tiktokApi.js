import axios from "axios";

export async function submitAdToTikTok(form, token) {
  try {
    const res = await axios.post("http://localhost:5000/ads/create", {
      form,
      token,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to submit ad to TikTok"
    );
  }
}
