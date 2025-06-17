// import { useEffect, useState, useContext } from "react";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// export default function Photos() {
//   const [images, setImages] = useState([]);
//   const { user } = useContext(AuthContext);
//   const [search, setSearch] = useState("");
//   const [sortAsc, setSortAsc] = useState(true);

//   useEffect(() => {
//     if (!user) return; // רק אם המשתמש מחובר
//     api.get("/images/my")
//       .then(res => setImages(res.data))
//       .catch(err => console.error("שגיאה בשליפת תמונות:", err));
//   }, [user]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("האם למחוק תמונה זו?")) return;
//     try {
//       await api.delete(`/images/${id}`);
//       setImages(images.filter(img => img.id !== id));
//     } catch (err) {
//       alert("שגיאה במחיקת תמונה");
//     }
//   };

//   const filteredPhotos = images
//     .filter(images =>
//       images.name
//     )
//     .sort((a, b) =>
//       sortAsc
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );

//   return (
//     <div style={{ padding: "2em" }}>
//       <h2>📸 התמונות שלך</h2>

//       <div style={{ margin: "1em 0" }}>
//         <input
//           type="text"
//           placeholder="חפש לפי שם..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           style={{ marginLeft: "1em" }}
//         />
//         <button onClick={() => setSortAsc(!sortAsc)}>
//           מיין לפי שם {sortAsc ? "⬆️" : "⬇️"}
//         </button>
//       </div>
//       <div className="photos-list">
//         {filteredPhotos.map(photo => (
//           <div key={photo.id} className="photo-card">
//             <img src={photo.url} alt={photo.name} />
//             <div>{photo.name}</div>
//           </div>
//         ))}
//       </div>
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
//               <button
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
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (!user) return;
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

  const handleEdit = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/images/${id}`, { name: editName });
      setImages(images.map(img => img.id === id ? { ...img, name: editName } : img));
      setEditId(null);
      setEditName("");
    } catch (err) {
      alert("שגיאה בעדכון שם התמונה");
    }
  };

  const filteredPhotos = images
    .filter(img =>
      img.name?.toLowerCase().includes(search.toLowerCase()) ||
      img.mood?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return sortAsc
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  if (!user) return <p>יש להתחבר כדי לצפות בתמונות</p>;

  return (
    <div style={{ padding: "2em" }}>
      <h2>📸 התמונות שלך</h2>

      <div style={{ margin: "1em 0" }}>
        <input
          type="text"
          placeholder="חפש לפי שם או מצב רוח..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft: "1em" }}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          מיין לפי שם {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      {filteredPhotos.length === 0 ? (
        <p>לא נמצאו תמונות.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1em"
        }}>
          {filteredPhotos.map(img => (
            <div key={img.id} style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "0.5em",
              background: "#fff"
            }}>
              <img
                src={img.url}
                alt={img.mood || "image"}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p style={{ textAlign: "center", marginTop: "0.5em" }}>
                מצב רוח: <b>{img.mood}</b>
              </p>
              <div style={{ textAlign: "center", fontSize: "0.9em", color: "#555" }}>
                {editId === img.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      style={{ marginBottom: "0.5em" }}
                    />
                    <button onClick={() => handleSave(img.id)}>💾 שמור</button>
                  </>
                ) : (
                  <>
                    שם: {img.name || "ללא שם"}
                    <button
                      onClick={() => handleEdit(img.id, img.name || "")}
                      style={{ marginRight: "0.5em", marginLeft: "0.5em" }}
                    >✏️</button>
                  </>
                )}
              </div>
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
