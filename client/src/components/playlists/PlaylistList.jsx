// import { useEffect, useState } from "react";
// // import { getByUserId } from "../services/playlistsService";
// // import { useAuth } from "../contexts/AuthContext";
// import "../playlists/PlaylistList.moudle.css"; // Assuming you have a CSS file for styling

// export default function PlaylistList() {
//   const [playlists, setPlaylists] = useState([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     async function fetchPlaylists() {
//       const data = await getByUserId(user?.id);
//       setPlaylists(data);
//     }
//     fetchPlaylists();
//   },
//    [user]
//   );

//   const groupedByMood = playlists.reduce((acc, pl) => {
//     acc[pl.mood] = acc[pl.mood] || [];
//     acc[pl.mood].push(pl);
//     return acc;
//   }, {});

//   const moodIcons = {
//     joyful: "😊",
//     sad: "😢",
//     calm: "🌿",
//     energetic: "⚡",
//     focus: "🧠"
//   };

//   return (
//     <div className="playlist-page">
//       <h1 className="playlist-title">🎵 My Playlist</h1>
//       {Object.entries(groupedByMood).map(([mood, pls]) => (
//         <div key={mood} className="mood-group">
//           <h2>{moodIcons[mood]} {mood.toUpperCase()}</h2>
//           <div className="playlist-group">
//             {pls.map(playlist => (
//               <div className="playlist-card" key={playlist.id}>
//                 <h3>{playlist.name}</h3>
//                 <p>{playlist.songs?.length || 0} songs</p>
//                 <button>▶ play</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // ← עולה פעמיים: playlists → components → context
import api from "../../services/api"; // ← עולה פעמיים: playlists → components → services
import PlaylistDetails from "./PlaylistDetails";

export default function PlaylistList() {
  const { user } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await api.get(`/playlists/user/${user.id}`);
        setPlaylists(res.data);
      } catch (err) {
        console.error("שגיאה בקבלת פלייליסטים:", err);
      }
    }
    if (user) fetchPlaylists();
  }, [user]);

  const handleSelect = async (playlistId) => {
    try {
      const res = await api.get(`/playlists/${playlistId}`);
      setSelectedPlaylist(res.data);
    } catch (err) {
      console.error("שגיאה בקבלת פרטי פלייליסט:", err);
    }
  };

  return (
    <div>
      <h2>הפלייליסטים שלי</h2>
      {playlists.map((pl) => (
        <div key={pl.id} style={{ border: "1px solid #ccc", padding: "1em", marginBottom: "1em" }}>
          <h3>{pl.name}</h3>
          <p>מצב רוח: {pl.mood}</p>
          <button onClick={() => handleSelect(pl.id)}>הצג שירים</button>
        </div>
      ))}
      {selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} />}
    </div>
  );
}
