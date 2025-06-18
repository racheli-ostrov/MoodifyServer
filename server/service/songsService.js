const pool = require('../../db/db');

exports.addSong = async ({ playlist_id, title, url }) => {
  await pool.query(
    'INSERT INTO songs (playlist_id, title, url) VALUES (?, ?, ?)',
    [playlist_id, title, url]
  );
};

exports.deleteSong = async (songId, playlistId) => {
  await pool.query(
    'DELETE FROM songs WHERE id = ? AND playlist_id = ?',
    [songId, playlistId]
  );
};

exports.editSong = async ({ id, playlist_id, title, url }) => {
  await pool.query(
    'UPDATE songs SET title = ?, url = ? WHERE id = ? AND playlist_id = ?',
    [title, url, id, playlist_id]
  );
};

exports.getByPlaylist = async (playlist_id) => {
  const [rows] = await pool.query('SELECT * FROM songs WHERE playlist_id = ?', [playlist_id]);
  return rows;
};