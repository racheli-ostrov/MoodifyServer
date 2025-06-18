import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import PlaylistDetails from "./PlaylistDetails";
import { useNavigate } from "react-router-dom";

export default function PlaylistList() {
  const { user } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await api.get(`/playlists/user/${user.id}`);
        setPlaylists(res.data);
      } catch (err) {
        console.error("Error getting playlists:", err);
      }
    }
    if (user) fetchPlaylists();
  }, [user]);

  const handleSelect = async (playlistId) => {
    try {
      const res = await api.get(`/playlists/${playlistId}`);
      setSelectedPlaylist(res.data);
    } catch (err) {
      console.error("Error getting playlist details:", err);
    }
  };

  if (!user || !user.username) {
    return (
      <div className="error-message">
        Unable to view playlists without logging in as a user.
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <h2 className="playlist-title">My Playlists</h2>
       <div className="playlist-group">
        {playlists.map((pl) => (
        <div
          key={pl.id}
          style={{ border: "1px solid #ccc", padding: "1em", marginBottom: "1em" }}
        >
          <h3>{pl.name}</h3>
          <p>Mood: {pl.mood}</p>
          <button onClick={() => handleSelect(pl.id)}>Show Songs</button>
        </div>
      ))}
      {selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} />}
    </div>
     </div>
  );
}