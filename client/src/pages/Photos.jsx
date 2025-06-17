// import { useEffect, useState, useContext } from "react";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// export default function Photos() {
//   const [images, setImages] = useState([]);
//   const { user } = useContext(AuthContext);

// useEffect(() => {
//   api.get("/images/my")
//     .then(res => setImages(res.data))
//     .catch(err => console.error("שגיאה בשליפת תמונות:", err));
// }, []);


//  const handleDelete = async (id) => {
//     if (!window.confirm("האם למחוק תמונה זו?")) return;
//     try {
//       await api.delete(`/images/${id}`);
//       setImages(images.filter(img => img.id !== id));
//     } catch (err) {
//       alert("שגיאה במחיקת תמונה");
//     }
//   };

//   if (!user) return <p>יש להתחבר כדי לצפות בתמונות</p>;

//   return (
//     <div style={{ padding: "2em" }}>
//       <h2>📸 התמונות שלך</h2>
//       {images.length === 0 ? (
//         <p>לא נמצאו תמונות.</p>
//       ) : (
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
//           gap: "1em"
//         }}>
//           {images.map(img => (
//             <div key={img.id} style={{
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               padding: "0.5em",
//               background: "#fff"
//             }}>
//               <img
//                 src={img.url}
//                 alt={img.mood}
//                 style={{ width: "100%", borderRadius: "8px" }}
//               />
//               <p style={{ textAlign: "center", marginTop: "0.5em" }}>
//                 מצב רוח: <b>{img.mood}</b>
//               </p>
//                <button
//                 style={{
//                   display: "block",
//                   margin: "0.5em auto 0 auto",
//                   background: "#e74c3c",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "5px",
//                   padding: "0.5em 1em",
//                   cursor: "pointer"
//                 }}
//                 onClick={() => handleDelete(img.id)}
//               >
//                 🗑️ מחק
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Photos() {
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return; // רק אם המשתמש מחובר
    api.get("/images/my")
      .then(res => setImages(res.data))
      .catch(err => console.error("שגיאה בשליפת תמונות:", err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("האם למחוק תמונה זו?")) return;
    try {
      await api.delete(`/images/${id}`);
      setImages(images.filter(img => img.id !== id));
    } catch (err) {
      alert("שגיאה במחיקת תמונה");
    }
  };

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
              <button
                style={{
                  display: "block",
                  margin: "0.5em auto 0 auto",
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5em 1em",
                  cursor: "pointer"
                }}
                onClick={() => handleDelete(img.id)}
              >
                🗑️ מחק
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}