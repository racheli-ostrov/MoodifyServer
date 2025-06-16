import { useState } from "react";
import UploadImage from "../../components/UploadImage/UploadImage";
import PlaylistDetails from "../../components/playlists/PlaylistDetails";
import "../Home/Home.moudle.css";
import { useNavigate } from "react-router-dom";
import { FaMusic, FaImages, FaListUl, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { setUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();


  return (
        <div className="centered-content">
          {user && (
            <h1>
              ,!hello {user.name ? user.name : user.username}
            </h1>
          )}
          <h1 className="main-title">?How are you feeling today</h1>
          <p className="subtitle">.Upload a photo and we'll create a playlist that matches your mood</p>
          <div className="upload-card">
            <UploadImage onPlaylistCreated={setPlaylist} />
          </div>
          {playlist && <PlaylistDetails playlist={playlist} />}
        </div>
  );
}