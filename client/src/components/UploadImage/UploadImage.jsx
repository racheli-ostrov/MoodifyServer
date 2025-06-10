import { useState } from "react";
import api from "../../services/api";

export default function UploadImage({ onPlaylistCreated }) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const uploadRes = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = uploadRes.data.url;
      setPreviewUrl(imageUrl);

      const moodRes = await api.post("/images", { url: imageUrl });
      const { id: imageId, mood } = moodRes.data;

      const playlistRes = await api.post("/playlists", { image_id: imageId, mood });
      onPlaylistCreated(playlistRes.data);
    } catch (err) {
      alert("שגיאה בהעלאה");
    }
    setLoading(false);
  };

  return (
    <div className="upload-file-container">
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
      {loading ? <p>מעלה...</p> : <p>בחרי תמונה מהמחשב שלך</p>}
      {previewUrl && <img src={previewUrl} alt="preview" className="preview-img" />}
    </div>
  );
}