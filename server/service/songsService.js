// // const pool = require('../../db/db');
// import pool from "../../db/db.js";

// exports.addSong = async ({ playlist_id, title, url }) => {
//   await pool.query(
//     'INSERT INTO songs (playlist_id, title, url) VALUES (?, ?, ?)',
//     [playlist_id, title, url]
//   );
// };

// exports.deleteSong = async (songId, playlistId) => {
//   await pool.query(
//     'DELETE FROM songs WHERE id = ? AND playlist_id = ?',
//     [songId, playlistId]
//   );
// };

// exports.editSong = async ({ id, playlist_id, title, url }) => {
//   await pool.query(
//     'UPDATE songs SET title = ?, url = ? WHERE id = ? AND playlist_id = ?',
//     [title, url, id, playlist_id]
//   );
// };

// exports.getByPlaylist = async (playlist_id) => {
//   const [rows] = await pool.query('SELECT * FROM songs WHERE playlist_id = ?', [playlist_id]);
//   return rows;
// };
import pool from "../../db/db.js";

export const addSong = async ({ playlist_id, title, url }) => {
  const [result] = await pool.query(
    "INSERT INTO songs (playlist_id, title, url) VALUES (?, ?, ?)",
    [playlist_id, title, url]
  );
  return result.insertId;
};

export const getSongsByPlaylist = async (playlist_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM songs WHERE playlist_id = ?",
    [playlist_id]
  );
  return rows;
};

export const deleteSong = async (id) => {
  await pool.query("DELETE FROM songs WHERE id = ?", [id]);
};

export const updateSong = async (id, { title, url }) => {
  await pool.query(
    "UPDATE songs SET title = ?, url = ? WHERE id = ?",
    [title, url, id]
  );
};

export const countSongsInPlaylist = async (playlist_id) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS count FROM songs WHERE playlist_id = ?",
    [playlist_id]
  );
  return rows[0].count;
};
