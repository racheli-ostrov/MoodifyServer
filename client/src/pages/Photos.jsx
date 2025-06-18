import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Photos() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    api.get("/images/my")
      .then(res => setImages(res.data))
      .catch(err => console.error("Failed to fetch images:", err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.delete(`/images/${id}`);
      setImages(images.filter(img => img.id !== id));
    } catch {
      alert("Error deleting image");
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
    } catch {
      alert("Error saving name");
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
      return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

  if (!user) return <p>You must be logged in to view photos.</p>;

  return (
    <div className="photos-container">
      <h2>📸 Your Photos</h2>

      <div className="photos-controls">
        <input
          type="text"
          placeholder="Search by name or mood..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by name {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      {filteredPhotos.length === 0 ? (
        <p>No photos found.</p>
      ) : (
        <div className="photos-grid">
          {filteredPhotos.map(img => (
            <div key={img.id} className="photos-card">
              <img src={img.url} alt={img.mood || "image"} className="photos-image" />
              <p className="photos-mood">Mood: <b>{img.mood}</b></p>

              <div className="photos-name">
                {editId === img.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                    />
                    <button onClick={() => handleSave(img.id)}>💾 Save</button>
                  </>
                ) : (
                  <>
                    Name: {img.name || "Unnamed"}
                    <button onClick={() => handleEdit(img.id, img.name || "")}>✏️</button>
                  </>
                )}
              </div>

              <button className="photos-delete" onClick={() => handleDelete(img.id)}>
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}