// import { useState } from "react";
// import api from "../../services/api";

// export default function UploadImage({ onPlaylistCreated }) {
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

// const handleUpload = async (e) => {
//   e.preventDefault();
//   if (!image) return;
//   console.log("🔍 image selected:", image);
//   setLoading(true);
//   const formData = new FormData();
//   formData.append("image", image);
//   console.log("📤 sending formData:", formData.get("image"));
//   try {
//     const res = await api.post("/images/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     alert("הרגש שזוהה: " + res.data.mood);
//   } catch (err) {
//     alert("שגיאת העלאה: " + (err?.response?.data?.error || err.message));
//   }
//   setLoading(false);
//   setImage(null);
// };


//   return (
//     <form onSubmit={handleUpload}>
//       <h2>העלה תמונה לניתוח רגש אמיתי</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={e => setImage(e.target.files[0])}
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? "מנתח..." : "נתח רגש"}
//       </button>
//     </form>
//   );
// }
// import { useState } from "react";
// import api from "../../services/api";
// import PlaylistDetails from "../playlists/PlaylistDetails";

// export default function UploadImage({ onPlaylistCreated }) {
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mood, setMood] = useState(null);
//   const [playlist, setPlaylist] = useState(null);
  

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setMood(null);
//     setPlaylist(null);
//     if (!image) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", image);
//     try {
//       const res = await api.post("/images/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMood(res.data.mood);
//     } catch (err) {
//       setMood("שגיאת העלאה: " + (err?.response?.data?.error || err.message));
//     }
//     setLoading(false);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//       setMood(null);
//       setPlaylist(null);
//     } else {
//       setPreviewUrl(null);
//     }
//   };

// const fetchPlaylistByMood = async () => {
//   try {
//     const moodKey = mood?.trim().toLowerCase(); // קחי את ה-mood מה-state
//     const res = await api.get(`/playlists/bymood/${moodKey}`);
//     if (res.data && res.data.length > 0) {
//       setPlaylist(res.data[0]);
//       onPlaylistCreated?.(res.data[0]);
//     } else {
//       alert("לא נמצא פלייליסט עבור מצב הרוח הזה.");
//     }
//   } catch (err) {
//     alert("שגיאה בקבלת הפלייליסט: " + (err?.response?.data?.error || err.message));
//   }
// };

//   return (
//     <form onSubmit={handleUpload}>
//       <h2>העלה תמונה לניתוח רגש אמיתי</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         required
//       />
//       {previewUrl && (
//         <div style={{ margin: "1em 0" }}>
//           <img
//             src={previewUrl}
//             alt="preview"
//             style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
//           />
//         </div>
//       )}
//       <button type="submit" disabled={loading}>
//         {loading ? "מנתח..." : "נתח רגש"}
//       </button>

//       {mood && (
//         <div style={{ marginTop: "1em" }}>
//           <h3>הרגש שזוהה: <b>{mood}</b></h3>
//           {!playlist && (
//             <button type="button" onClick={fetchPlaylistByMood}>
//               הצג פלייליסט
//             </button>
//           )}
//         </div>
//       )}

//       {playlist && (
//         <div style={{ marginTop: "1em" }}>
//           <PlaylistDetails playlist={playlist} />
//         </div>
//       )}
//     </form>
//   );
// }
import { useState } from "react";
import api from "../../services/api";
import PlaylistDetails from "../playlists/PlaylistDetails";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMood(null);
    setPlaylists([]);
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await api.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMood(res.data.mood.trim().toLowerCase());
    } catch (err) {
      setMood("שגיאה: " + (err?.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setMood(null);
      setPlaylists([]);
    } else {
      setPreviewUrl(null);
    }
  };
const fetchPlaylistsByMood = async () => {
  try {
    const res = await api.get(`/playlists/bymood/${mood}`);
    if (res.data) {
      setPlaylists([res.data]); // ← עטוף אותו במערך
    } else {
      alert("לא נמצא פלייליסט עבור הרגש הזה.");
    }
  } catch (err) {
    alert("שגיאה בקבלת הפלייליסט: " + (err?.response?.data?.error || err.message));
  }
};

  return (
    <form onSubmit={handleUpload}>
      {/* <h2>העלה תמונה לניתוח רגש אמיתי</h2> */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      {previewUrl && (
        <div style={{ margin: "1em 0" }}>
          <img
            src={previewUrl}
            alt="preview"
            style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
          />
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? "מעלה ומנתח..." : "נתח רגש"}
      </button>

      {mood && (
        <div style={{ marginTop: "1em" }}>
          <h3>הרגש שזוהה: <b>{mood}</b></h3>
          <button type="button" onClick={fetchPlaylistsByMood}>
            הצג פלייליסטים
          </button>
        </div>
      )}
      

      {playlists.length > 0 && (
        <div style={{ marginTop: "2em" }}>
          <h3>פלייליסטים תואמים:</h3>
          {playlists.map((pl) => (
            <PlaylistDetails key={pl.id} playlist={pl} />
          ))}
        </div>
      )}
    </form>
  );
}
