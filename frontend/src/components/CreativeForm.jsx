import { useState } from "react";
import { submitAdToTikTok } from "../api/tiktokApi";

export default function CreativeForm() {
  const [form, setForm] = useState({
    campaignName: "",
    objective: "Traffic",
    musicOption: "none",
    musicId: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const simulateUploadMusic = () => {
    const mockId = "music_" + Math.random().toString(36).substring(2, 6);
    setForm({ ...form, musicId: mockId });
    setStatus(`🎵 Simulated upload: ${mockId}`);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tiktok_token");
      const response = await submitAdToTikTok(form, token);
      setStatus("✅ Ad submitted successfully");
    } catch (err) {
      setStatus("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-4">Create TikTok Ad</h2>

      <input
        type="text"
        name="campaignName"
        placeholder="Campaign Name"
        value={form.campaignName}
        onChange={handleChange}
        className="w-full border p-2 mb-2 rounded"
      />

      <select
        name="objective"
        value={form.objective}
        onChange={handleChange}
        className="w-full border p-2 mb-2 rounded"
      >
        <option value="Traffic">Traffic</option>
        <option value="Conversions">Conversions</option>
      </select>

      <select
        name="musicOption"
        value={form.musicOption}
        onChange={handleChange}
        className="w-full border p-2 mb-2 rounded"
      >
        <option value="none">No Music</option>
        <option value="existing">Existing Music ID</option>
        <option value="upload">Upload / Custom Music</option>
      </select>

      {form.musicOption === "existing" && (
        <input
          type="text"
          name="musicId"
          placeholder="Enter Music ID"
          value={form.musicId}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />
      )}

      {form.musicOption === "upload" && (
        <button
          onClick={simulateUploadMusic}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-2"
        >
          Simulate Upload Music
        </button>
      )}

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Submit Ad
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
