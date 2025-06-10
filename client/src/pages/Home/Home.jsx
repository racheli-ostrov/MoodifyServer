import { useState } from "react";
import UploadImage from "../../components/UploadImage/UploadImage";
import PlaylistDetails from "../../components/playlists/PlaylistDetails";
import "../Home/Home.moudle.css";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="page-container no-scroll">
      <nav className="side-navbar large-buttons">
        <h1 className="logo">📸 MOODIFY</h1>
        <button onClick={() => navigate("/playlists")}>
          <FaListUl />
          <div>
            <span className="stat-number">1,245</span><br />
            Playlists
          </div>
        </button>
        <button onClick={() => navigate("/images")}>
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
        <button onClick={() => navigate("/profile")}>
          <FaUser />
          <div>
            <span className="stat-number">293</span><br />
            Pro users
          </div>
        </button>
      </nav>

      <main className="main-content colorful-bg">
        <div className="centered-content">
          {user && (
            <h1>
              ,!hello {user.name ? user.name : user.username}
            </h1>
          )}
          <h1 className="main-title">?How are you feeling today</h1>
          <p className="subtitle">Upload a photo and we'll create a playlist that matches your mood.</p>
          <div className="upload-card">
            {/* <img src="./src/img/camera.png" alt="camera icon" className="camera-icon" /> */}
            📷
            <p>Upload a photo of yourself</p>
            <UploadImage onPlaylistCreated={setPlaylist} />
          </div>
          {playlist && <PlaylistDetails playlist={playlist} />}
        </div>
      </main>
    </div>
  );
}