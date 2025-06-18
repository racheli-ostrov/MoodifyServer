import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import YouTubePlayer from "./YouTubePlayer";
import SongList from "./SongList";
import styles from "../playlists/PlaylistList.module.css";

const moodStyle = {
  happy: { color: "#ffe066" },
  sad: { color: "#a0c4ff" },
  energetic: { color: "#ffadad" },
  calm: { color: "#caffbf" },
  unknown: { color: "#f0f0f0" },
};

export default function PlaylistDetails({ playlist }) {
  const stopAnyOtherPlayingVideo = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  };
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(0);
  const [viewMode, setViewMode] = useState("player");
  const [likes, setLikes] = useState(playlist.likes || 0);
  const [dislikes, setDislikes] = useState(playlist.dislikes || 0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
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
  const currentSong = songs[currentIndex];
  const moodData = moodStyle[playlist.mood?.toLowerCase()] || moodStyle.unknown;

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      const res = await api.post(`/playlists/${playlist.id}/vote`, { vote: "like" });
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error("Error liking playlist:", err);
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
      console.error("Error disliking playlist:", err);
    }
    setDislikeLoading(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setAutoPlayTrigger(prev => prev + 1);
    setViewMode("player");
    stopAnyOtherPlayingVideo();
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setAutoPlayTrigger(prev => prev + 1);
    setViewMode("player");
    stopAnyOtherPlayingVideo();
  };

  const handleAddSong = async () => {
    try {
      const res = await api.post(`/playlists/${playlist.id}/songs`, newSong);
      setSongs(res.data.songs);
      setShowAdd(false);
      setNewSong({ title: "", url: "" });
    } catch (err) {
      alert("Error adding song: " + err.message);
    }
  };

  const handleDeleteSong = async (songId) => {
    if (!window.confirm("Delete this song?")) return;
    try {
      const res = await api.delete(`/playlists/${playlist.id}/songs/${songId}`);
      setSongs(res.data.songs);
    } catch (err) {
      alert("Error deleting song: " + err.message);
    }
  };

  const handleEditSong = (song) => {
    setEditSongId(song.id);
    setEditSong({ title: song.title, url: song.url });
  };

  const handleSaveEditSong = async () => {
    try {
      const res = await api.put(`/playlists/${playlist.id}/songs/${editSongId}`, editSong);
      setSongs(res.data.songs);
      setEditSongId(null);
      setEditSong({ title: "", url: "" });
    } catch (err) {
      alert("Error saving edited song: " + err.message);
    }
  };

  const handleEditPlaylist = async () => {
    try {
      await api.put(`/playlists/${playlist.id}`, editPlaylist);
      alert("Playlist updated successfully");
      setEditMode(false);
    } catch (err) {
      alert("Error updating playlist: " + err.message);
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: moodData.color }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}>
        <button className="show-songs-btn" type="button" onClick={() => setViewMode((prev) => (prev === "player" ? "list" : "player"))}>
          Switch to {viewMode === "player" ? "List" : "Player"} View
        </button>
      </div>

      {viewMode === "list" && (
        <SongList songs={songs} onEdit={handleEditSong} onDelete={handleDeleteSong} editable={isPlaylistsPage && (user?.role === "pro")} />
      )}

      {viewMode === "player" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "1em", marginBottom: "1em" }}>
            <button className="show-songs-btn" type="button" onClick={handleLike} disabled={likeLoading}>{likeLoading ? "⏳" : "👍"}</button>
            <span>{likes}</span>
            <button className="show-songs-btn" type="button" onClick={handleDislike} disabled={dislikeLoading}>{dislikeLoading ? "⏳" : "👎"}</button>
            <span>{dislikes}</span>
          </div>
          <h4 style={{ textAlign: "center" }}>{currentSong.title}</h4>
          <YouTubePlayer videoUrl={currentSong.url} onEnd={handleNext} key={autoPlayTrigger} />
          <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
            <button className="show-songs-btn" type="button" onClick={handlePrev}>⏮️ back</button>
            <button className="show-songs-btn" type="button" onClick={handleNext}>⏭️ next</button>
          </div>
        </>
      )}

      {isPlaylistsPage && (user?.role === "pro") && (
        <div style={{ marginTop: "1em" }}>
          <button className="playlist-btn" type="button" onClick={() => setShowAdd(!showAdd)}>➕ Add Song</button>
          <button className="playlist-btn" type="button" onClick={() => setEditMode(!editMode)}>📝 Edit Playlist</button>
        </div>
      )}

      {showAdd && (
        <div style={{ marginTop: "1em" }}>
          <input className={styles.formInput} placeholder="Title" value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} />
          <input className={styles.formInput} placeholder="YouTube URL" value={newSong.url} onChange={e => setNewSong({ ...newSong, url: e.target.value })} />
          <button className={styles.saveButton} onClick={handleAddSong}>Save</button>
          <button className={styles.cancelButton} onClick={() => setShowAdd(false)}>Cancel</button>
        </div>
      )}

      {editMode && (
        <div style={{ marginTop: "1em" }}>
          <input className={styles.formInput} placeholder="Name" value={editPlaylist.name} onChange={e => setEditPlaylist({ ...editPlaylist, name: e.target.value })} />
          <input className={styles.formInput} placeholder="Description" value={editPlaylist.description} onChange={e => setEditPlaylist({ ...editPlaylist, description: e.target.value })} />
          <input className={styles.formInput} placeholder="Mood" value={editPlaylist.mood} onChange={e => setEditPlaylist({ ...editPlaylist, mood: e.target.value })} />
          <button className={styles.saveButton} onClick={handleEditPlaylist}>Save</button>
          <button className={styles.cancelButton} onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}

      <div style={{ marginTop: "2em" }}>
        <h4>Songs</h4>
        <ul className={styles.songsList}>
          {songs.map(song => (
            <li key={song.id} className={styles.songRow}>
              {editSongId === song.id ? (
                <>
                  <input
                    className="minimal-input"
                    value={editSong.url}
                    onChange={e => setEditSong({ ...editSong, url: e.target.value })}
                  />
                  <input
                    className="minimal-input"
                    value={editSong.title}
                    onChange={e => setEditSong({ ...editSong, title: e.target.value })}
                  />
                  <button className="playlist-btn" type="button" onClick={handleSaveEditSong}>Save</button>
                  <button className="playlist-btn" type="button" onClick={() => setEditSongId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={styles.songActions}>
                    <button className="playlist-btn" type="button" onClick={() => handleDeleteSong(song.id)}>Delete</button>
                    <button className="playlist-btn" type="button" onClick={() => handleEditSong(song)}>Edit</button>
                  </span>
                  <span className={styles.songTitle}>{song.title}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}