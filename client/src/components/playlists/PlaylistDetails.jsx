export default function PlaylistDetails({ playlist }) {
  return (
    <div style={{border:"1px solid #aaa", margin:"1em 0", padding:"1em"}}>
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <p>מצב רוח: {playlist.mood}</p>
      {playlist.songs && playlist.songs.length > 0 && (
        <ul>
          {playlist.songs.map(song => (
            <li key={song.id}>
              <b>{song.title}</b> – {song.artist} (<a href={song.url} target="_blank" rel="noopener noreferrer">לשיר</a>)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}