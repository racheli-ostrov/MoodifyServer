import { useEffect, useState } from "react";
// import { getByUserId } from "../services/playlistsService";
// import { useAuth } from "../contexts/AuthContext";
import "../playlists/PlaylistList.moudle.css"; // Assuming you have a CSS file for styling

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPlaylists() {
      const data = await getByUserId(user?.id);
      setPlaylists(data);
    }
    fetchPlaylists();
  },
   [user]
  );

  const groupedByMood = playlists.reduce((acc, pl) => {
    acc[pl.mood] = acc[pl.mood] || [];
    acc[pl.mood].push(pl);
    return acc;
  }, {});

  const moodIcons = {
    joyful: "😊",
    sad: "😢",
    calm: "🌿",
    energetic: "⚡",
    focus: "🧠"
  };

  return (
    <div className="playlist-page">
      <h1 className="playlist-title">🎵 My Playlist</h1>
      {Object.entries(groupedByMood).map(([mood, pls]) => (
        <div key={mood} className="mood-group">
          <h2>{moodIcons[mood]} {mood.toUpperCase()}</h2>
          <div className="playlist-group">
            {pls.map(playlist => (
              <div className="playlist-card" key={playlist.id}>
                <h3>{playlist.name}</h3>
                <p>{playlist.songs?.length || 0} songs</p>
                <button>▶ play</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}