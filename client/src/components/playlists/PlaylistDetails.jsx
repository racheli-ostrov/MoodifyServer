import { useState, useRef, useEffect } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

// מיפוי רגשות לצבעים, אייקונים ואנימציות
const moodStyle = {
  happy:     { icon: "😊", color: "#fff9c4", animation: "pulse" },
  sad:       { icon: "😢", color: "#e1f5fe", animation: "fade" },
  fear:      { icon: "😱", color: "#ede7f6", animation: "shake" },
  angry:     { icon: "😠", color: "#ffebee", animation: "shake" },
  surprise: { icon: "😲", color: "#f3e5f5", animation: "bounce" },
  calm:      { icon: "🌿", color: "#e8f5e9", animation: "float" },
  neutral:   { icon: "😐", color: "#f5f5f5", animation: "none" },
  unknown:   { icon: "🎵", color: "#ffffff", animation: "" }
};

export default function PlaylistDetails({ playlist }) {
  
  const playerRef = useRef(null);
 const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [viewMode, setViewMode] = useState("player"); 
  const [likes, setLikes] = useState(playlist.likes || 0);
  const [dislikes, setDislikes] = useState(playlist.dislikes || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [songs, setSongs] = useState(playlist.songs || []);
  const [showAdd, setShowAdd] = useState(false);
  const [newSong, setNewSong] = useState({ title: "", url: "" });
  const [editSongId, setEditSongId] = useState(null);
  const [editSong, setEditSong] = useState({ title: "", url: "" });
  const [editMode, setEditMode] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState({
    name: playlist.name,
    description: playlist.description,
    mood: playlist.mood,
  });
 const isPlaylistsPage = location.pathname.startsWith("/playlists");
  const currentSong = playlist.songs[currentIndex];
  const moodData = moodStyle[playlist.mood?.toLowerCase()] || moodStyle.unknown;

  const extractVideoId = (url) => {
    try {
      const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (viewMode !== "player") return;

    const videoId = extractVideoId(currentSong.url);

    const createPlayer = () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (e) {}
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        height: "360",
        width: "640",
        events: {
            onReady: (event) => {
            setPlayerReady(true);
            event.target.playVideo(); 
          },
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentIndex, viewMode]);

useEffect(() => {
  if (
    playerReady &&
    playerRef.current &&
    typeof playerRef.current.loadVideoById === "function" &&
    viewMode === "player"
  ) {
    const nextVideoId = extractVideoId(currentSong.url);
    playerRef.current.loadVideoById(nextVideoId);
  }
}, [currentIndex, playerReady, viewMode]);

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED && viewMode === "player") {
      setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.songs.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? playlist.songs.length - 1 : prev - 1
    );
  };
  const handlePause = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.pauseVideo === "function"
    ) {
      playerRef.current.pauseVideo();
    }
  };
  const handlePlay = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.playVideo === "function"
    ) {
      playerRef.current.playVideo();
    }
  };

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      const res = await api.post(`/playlists/${playlist.id}/vote`, { vote: "like" });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.log("שגיאה בלייק");
    }
    setLikeLoading(false);
  };

  const handleDislike = async () => {
    setDislikeLoading(true);
    try {
      const res = await api.post(`/playlists/${playlist.id}/vote`, { vote: "dislike" });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      alert("שגיאה בדיסלייק");
    }
    setDislikeLoading(false);
  };
    const handleAddSong = async () => {
    try {
      const res = await api.post(`/playlists/${playlist.id}/songs`, newSong);
      setSongs(res.data.songs);
      setShowAdd(false);
      setNewSong({ title: "", artist: "", url: "" });
    } catch (err) {
      alert("שגיאה בהוספת שיר");
    }
  };
    const handleDeleteSong = async (songId) => {
    if (!window.confirm("למחוק שיר זה?")) return;
    try {
      const res = await api.delete(`/playlists/${playlist.id}/songs/${songId}`);
      setSongs(res.data.songs);
    } catch (err) {
      alert("שגיאה במחיקת שיר");
    }
  };
    const handleEditSong = (song) => {
    setEditSongId(song.id);
    setEditSong({ title: song.title, artist: song.artist, url: song.url });
  };
  const handleSaveEditSong = async () => {
    try {
      const res = await api.put(`/playlists/${playlist.id}/songs/${editSongId}`, editSong);
      setSongs(res.data.songs);
      setEditSongId(null);
      setEditSong({ title: "", artist: "", url: "" });
    } catch (err) {
      alert("שגיאה בעריכת שיר");
    }
  };
    const handleEditPlaylist = async () => {
    try {
      const res = await api.put(`/playlists/${playlist.id}`, editPlaylist);
      alert("הפלייליסט עודכן!");
      setEditMode(false);
    } catch (err) {
      alert("שגיאה בעריכת פלייליסט");
    }
  };

  return (
    <div style={{
      backgroundColor: moodData.color,
      marginTop: "2em",
      padding: "1em",
      border: "1px solid #ccc",
      borderRadius: "12px"
    }}>
      {viewMode === "player" && (
        <button type="button" onClick={() => setViewMode("list")}>
          מעבר לרשימת פלייליסט
        </button>
      )}
      {viewMode === "list" && (
        <button type="button" onClick={() => setViewMode("player")}>
          מעבר לנגן ברצף
        </button>
      )}

      {viewMode === "list" && playlist.songs && playlist.songs.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1em",
          marginTop: "1em"
        }}>
          {playlist.songs.map(song => {
            const videoId = extractVideoId(song.url);
            return (
              <div key={song.id} style={{ width: "100%" }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5em" }}>{song.title}</div>
                {videoId ? (
                  <iframe
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={song.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>⚠️ לא ניתן להציג את הסרטון</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: viewMode === "player" ? "block" : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <button
            type="button"
            onClick={handleLike}
            disabled={likeLoading}
            style={{ fontSize: "1.4em" }}
          >
            {likeLoading ? "⏳" : "👍"}
          </button>
          <span>{likes}</span>
          <button
            type="button"
            onClick={handleDislike}
            disabled={dislikeLoading}
            style={{ fontSize: "1.4em" }}
          >
            {dislikeLoading ? "⏳" : "👎"}
          </button>
          <span>{dislikes}</span>
        </div>
        <h4>{currentSong.title}</h4>
        <div id="yt-player" style={{ width: "100%", height: "360px" }}></div>
        <div style={{ marginTop: "1em", display: "flex", gap: "1em", flexWrap: "wrap" }}>
          <button type="button" onClick={handlePrev}>⏮️ הקודם</button>
          <button type="button" onClick={handlePause}>⏸️ השהייה</button>
          <button type="button" onClick={handlePlay}>▶️ המשך</button>
          <button type="button" onClick={handleNext}>⏭️ הבא</button>
        </div>
      </div>
     {isPlaylistsPage && (user?.role === "pro" || user?.role === "admin") && (
  <div>
    <button onClick={() => setShowAdd(!showAdd)}>➕ הוסף שיר</button>
    <button onClick={() => setEditMode(!editMode)}>📝 ערוך פרטי פלייליסט</button>
  </div>
)}

{isPlaylistsPage && user && user.role !== "pro" && user.role !== "admin" && (
  <div style={{ color: "red", margin: "1em 0" }}>
    רוצה לערוך את הפלייליסט שלך? <a href="/upgrade">שדרג/י לפרו</a>
  </div>
)}
    {showAdd && (
  <div style={{ margin: "1em 0" }}>
    <input placeholder="שם שיר" value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} />
    <input placeholder="קישור יוטיוב" value={newSong.url} onChange={e => setNewSong({ ...newSong, url: e.target.value })} />
    <button onClick={handleAddSong}>שמור</button>
    <button onClick={() => setShowAdd(false)}>ביטול</button>
  </div>
)}
{editMode && (
        <div style={{ margin: "1em 0" }}>
          <input placeholder="שם פלייליסט" value={editPlaylist.name} onChange={e => setEditPlaylist({ ...editPlaylist, name: e.target.value })} />
          <input placeholder="תיאור" value={editPlaylist.description} onChange={e => setEditPlaylist({ ...editPlaylist, description: e.target.value })} />
          <input placeholder="מצב רוח" value={editPlaylist.mood} onChange={e => setEditPlaylist({ ...editPlaylist, mood: e.target.value })} />
          <button onClick={handleEditPlaylist}>שמור</button>
          <button onClick={() => setEditMode(false)}>ביטול</button>
        </div>
      )}
 <div style={{ marginTop: "1em" }}>
        <h4>שירים בפלייליסט:</h4>
<ul>
  {songs.map(song =>
    editSongId === song.id ? (
      <li key={song.id}>
        <input value={editSong.title || ""} onChange={e => setEditSong({ ...editSong, title: e.target.value })} />
        <input value={editSong.url || ""} onChange={e => setEditSong({ ...editSong, url: e.target.value })} />
        <button onClick={handleSaveEditSong}>שמור</button>
        <button onClick={() => setEditSongId(null)}>ביטול</button>
      </li>
    ) : (
      <li key={song.id}>
        {song.title}
        {isPlaylistsPage &&(user?.role === "pro" || user?.role === "admin") && (
          <>
            <button onClick={() => handleEditSong(song)}>ערוך</button>
            <button onClick={() => handleDeleteSong(song.id)}>מחק</button>
          </>
        )}
      </li>
    )
  )}
</ul>
      </div>
    </div>
  );
}
