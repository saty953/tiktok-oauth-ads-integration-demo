export default function MusicSelector({ form, setForm }) {
  const handleOptionChange = (e) => {
    setForm({ ...form, musicOption: e.target.value, musicId: "" });
  };

  const handleMusicIdChange = (e) => {
    setForm({ ...form, musicId: e.target.value });
  };

  const handleUploadMock = () => {
    const mockId = "music_" + Math.random().toString(36).substring(2, 6);
    setForm({ ...form, musicOption: "upload", musicId: mockId });
  };

  return (
    <div className="border p-2 rounded">
      <p className="font-medium mb-1">Music Option</p>

      <select
        value={form.musicOption}
        onChange={handleOptionChange}
        className="border p-2 w-full rounded"
      >
        <option value="existing">Existing Music ID</option>
        <option value="upload">Upload / Custom Music</option>
        <option value="none">No Music</option>
      </select>

      {form.musicOption === "existing" && (
        <input
          type="text"
          placeholder="Enter Music ID"
          value={form.musicId}
          onChange={handleMusicIdChange}
          className="border p-2 w-full mt-2 rounded"
        />
      )}

      {form.musicOption === "upload" && (
        <button
          type="button"
          onClick={handleUploadMock}
          className="mt-2 px-3 py-1 bg-gray-200 rounded"
        >
          Simulate Upload Music
        </button>
      )}

      {form.musicId && (
        <p className="text-xs text-gray-600 mt-1">Music ID: {form.musicId}</p>
      )}
    </div>
  );
}
