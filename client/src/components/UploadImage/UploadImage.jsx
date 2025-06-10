// import { useState } from "react";
// import api from "../../services/api";

// export default function UploadImage({ onPlaylistCreated }) {
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const uploadRes = await api.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const imageUrl = uploadRes.data.url;
//       setPreviewUrl(imageUrl);

//       const moodRes = await api.post("/images", { url: imageUrl });
//       const { id: imageId, mood } = moodRes.data;

//       const playlistRes = await api.post("/playlists", { image_id: imageId, mood });
//       onPlaylistCreated(playlistRes.data);
//     } catch (err) {
//       alert("שגיאה בהעלאה");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="upload-file-container">
//       <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
//       {loading ? <p>מעלה...</p> : <p>בחרי תמונה מהמחשב שלך</p>}
//       {previewUrl && <img src={previewUrl} alt="preview" className="preview-img" />}
//     </div>
//   );
// }

import { useState } from "react";
import api from "../../services/api";

export default function UploadImage({ onPlaylistCreated }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post("/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
    setImage(null);
    alert("הרגש שזוהה: " + res.data.mood);
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>העלה תמונה לניתוח רגש אמיתי</h2>
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "מנתח..." : "נתח רגש"}
      </button>
    </form>
  );
}