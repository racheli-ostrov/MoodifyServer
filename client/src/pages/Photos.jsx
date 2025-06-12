// 📁 client/pages/Photos.jsx
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Photos() {
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get("/images/my")
      .then(res => setImages(res.data))
      .catch(err => console.error("שגיאה בשליפת תמונות:", err));
  }, []);

  if (!user) return <p>יש להתחבר כדי לצפות בתמונות</p>;

  return (
    <div style={{ padding: "2em" }}>
      <h2>📸 התמונות שלך</h2>
      {images.length === 0 ? (
        <p>לא נמצאו תמונות.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1em"
        }}>
          {images.map(img => (
            <div key={img.id} style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "0.5em",
              background: "#fff"
            }}>
              <img
                src={img.url}
                alt={img.mood}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p style={{ textAlign: "center", marginTop: "0.5em" }}>
                מצב רוח: <b>{img.mood}</b>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
