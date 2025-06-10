const pool = require('../../db/db');
exports.addSong = async ({ playlist_id, title, artist, url }) => {
  await pool.query(
    'INSERT INTO songs (playlist_id, title, artist, url) VALUES (?, ?, ?, ?)',
    [playlist_id, title, artist, url]
  );
};
exports.getByPlaylist = async (playlist_id) => {
  const [rows] = await pool.query('SELECT * FROM songs WHERE playlist_id = ?', [playlist_id]);
  return rows;
};