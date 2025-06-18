import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import UploadImage from "../components/UploadImage/UploadImage";
import PlaylistDetails from "../components/playlists/PlaylistDetails";
import api from "../services/api";

export default function Home() {
  const { user, logout, loading } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error", err);
    }

    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="error-message">Loading...</div>;
  }

  if (!user || !user.username) {
    return <div className="error-message">You must be logged in to access the homepage.</div>;
  }

  return (
    <div className="page-container">
      <nav className="side-navbar large-buttons">
        <h1 className="logo">📸 MOODIFY</h1>

        <div
          className={`user-status-badge ${user.role === "pro" ? "pro" : "free"}`}
          onClick={() => {
            if (user.role !== "pro") navigate("/upgrade");
          }}
          title={user.role === "pro" ? "You are a Pro user" : "Click to upgrade"}
          style={{ cursor: user.role !== "pro" ? "pointer" : "default" }}
        >
          {user.role === "pro" ? "Pro 🌟" : "Free User"}
        </div>

        <button onClick={() => navigate("/playlists")}>
          <FaListUl />
          <div>
            <span className="stat-number">1,245</span><br />
            Playlists
          </div>
        </button>

        <button onClick={() => navigate("/photos")}>
          <FaImages />
          <div>
            <span className="stat-number">7,532</span><br />
            Photos
          </div>
        </button>

        <button onClick={() => navigate("/songs")}>
          <FaMusic />
          <div>
            <span className="stat-number">14,097</span><br />
            Songs
          </div>
        </button>

        <button onClick={() => navigate("/upgrade")}>
          <FaUser />
          <div>
            <span className="stat-number">293</span><br />
            Pro Users
          </div>
        </button>

        <button onClick={handleLogout}>Log Out</button>
      </nav>

      <main className="main-content colorful-bg">
        <div className="centered-content">
          <h1>Hello, {user.name || user.username}!</h1>
          <h1 className="main-title">How are you feeling today?</h1>
          <p className="subtitle">
            Upload a photo and we'll create a playlist that matches your mood.
          </p>
          <div className="upload-card">
            <UploadImage onPlaylistCreated={setPlaylist} />
          </div>
          {playlist && <PlaylistDetails playlist={playlist} />}
        </div>
      </main>
    </div>
  );
}