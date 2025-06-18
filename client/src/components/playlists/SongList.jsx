import styles from "../playlists/PlaylistList.module.css";

export default function SongList({ songs, onEdit, onDelete, editable = false }) {
  const extractVideoId = (url) => {
    const match = url.match(/(?:\?v=|\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className={styles.songListGrid}>
      {songs.map((song) => {
        const videoId = extractVideoId(song.url);
        return (
          <div key={song.id} className={styles.songCard}>
            <div><strong>{song.title}</strong></div>
            {videoId ? (
              <iframe
                width="100%"
                height="180"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Video unavailable</p>
            )}
            {editable && (
              <div className={styles.buttons}>
                <button onClick={() => onEdit(song)}>Edit</button>
                <button onClick={() => onDelete(song.id)}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}