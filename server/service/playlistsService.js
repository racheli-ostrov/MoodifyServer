// // const pool = require('../../db/db');
// import pool from "../../db/db.js";

// exports.getByUserId = async (user_id) => {
//   const [rows] = await pool.query(
//     `SELECT p.* FROM playlists p
//      JOIN user_playlists up ON p.id = up.playlist_id
//      WHERE up.user_id = ?`,
//     [user_id]
//   );
//   return rows;
// };

// exports.getById = async (id) => {
//   const [rows] = await pool.query('SELECT * FROM playlists WHERE id = ?', [id]);
//   return rows[0];
// };

// exports.getByMood = async (mood) => {
//   const [rows] = await pool.query(
//     'SELECT * FROM playlists WHERE LOWER(mood) = LOWER(?)',
//     [mood]
//   );
//   return rows;
// };

// exports.getUserVote = async (userId, playlistId) => {
//   const [rows] = await pool.query(
//     "SELECT vote FROM playlist_votes WHERE user_id = ? AND playlist_id = ?",
//     [userId, playlistId]
//   );
//   return rows[0]?.vote;
// };

// exports.insertVote = async (userId, playlistId, vote) => {
//   await pool.query(
//     "INSERT INTO playlist_votes (user_id, playlist_id, vote) VALUES (?, ?, ?)",
//     [userId, playlistId, vote]
//   );
//   await pool.query(
//     `UPDATE playlists SET ${vote}s = ${vote}s + 1 WHERE id = ?`,
//     [playlistId]
//   );
// };

// exports.updateVote = async (userId, playlistId, vote, prevVote) => {
//   await pool.query(
//     "UPDATE playlist_votes SET vote = ? WHERE user_id = ? AND playlist_id = ?",
//     [vote, userId, playlistId]
//   );
//   await pool.query(
//     `UPDATE playlists SET ${vote}s = ${vote}s + 1, ${prevVote}s = ${prevVote}s - 1 WHERE id = ?`,
//     [playlistId]
//   );
// };

// exports.getPlaylistVotes = async (playlistId) => {
//   const [rows] = await pool.query(
//     "SELECT likes, dislikes FROM playlists WHERE id = ?",
//     [playlistId]
//   );
//   return rows[0];
// };

// exports.userHasPlaylist = async (userId, playlistId) => {
//   const [rows] = await pool.query(
//     "SELECT 1 FROM user_playlists WHERE user_id = ? AND playlist_id = ?",
//     [userId, playlistId]
//   );
//   return rows.length > 0;
// };

// exports.assignPlaylistToUser = async (userId, playlistId) => {
//   await pool.query(
//     "INSERT IGNORE INTO user_playlists (user_id, playlist_id) VALUES (?, ?)",
//     [userId, playlistId]
//   );
// };

// exports.editPlaylist = async ({ id, name, description, mood }) => {
//   await pool.query(
//     'UPDATE playlists SET name = ?, description = ?, mood = ? WHERE id = ?',
//     [name, description, mood, id]
//   );
// };

// exports.countUserPlaylists = async (userId) => {
//   const [rows] = await pool.query(
//     "SELECT COUNT(*) AS count FROM user_playlists WHERE user_id = ?",
//     [userId]
//   );
//   return rows[0].count;
// };
import pool from "../../db/db.js";

export const getByUserId = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT p.* FROM playlists p
     JOIN user_playlists up ON p.id = up.playlist_id
     WHERE up.user_id = ?`,
    [user_id]
  );
  return rows;
};

export const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM playlists WHERE id = ?', [id]);
  return rows[0];
};

export const getByMood = async (mood) => {
  const [rows] = await pool.query(
    'SELECT * FROM playlists WHERE LOWER(mood) = LOWER(?)',
    [mood]
  );
  return rows;
};

export const getUserVote = async (userId, playlistId) => {
  const [rows] = await pool.query(
    "SELECT vote FROM playlist_votes WHERE user_id = ? AND playlist_id = ?",
    [userId, playlistId]
  );
  return rows[0]?.vote;
};

export const insertVote = async (userId, playlistId, vote) => {
  await pool.query(
    "INSERT INTO playlist_votes (user_id, playlist_id, vote) VALUES (?, ?, ?)",
    [userId, playlistId, vote]
  );
  await pool.query(
    `UPDATE playlists SET ${vote}s = ${vote}s + 1 WHERE id = ?`,
    [playlistId]
  );
};

export const updateVote = async (userId, playlistId, vote, prevVote) => {
  await pool.query(
    "UPDATE playlist_votes SET vote = ? WHERE user_id = ? AND playlist_id = ?",
    [vote, userId, playlistId]
  );
  await pool.query(
    `UPDATE playlists SET ${vote}s = ${vote}s + 1, ${prevVote}s = ${prevVote}s - 1 WHERE id = ?`,
    [playlistId]
  );
};

export const getPlaylistVotes = async (playlistId) => {
  const [rows] = await pool.query(
    "SELECT likes, dislikes FROM playlists WHERE id = ?",
    [playlistId]
  );
  return rows[0];
};

export const userHasPlaylist = async (userId, playlistId) => {
  const [rows] = await pool.query(
    "SELECT 1 FROM user_playlists WHERE user_id = ? AND playlist_id = ?",
    [userId, playlistId]
  );
  return rows.length > 0;
};

export const assignPlaylistToUser = async (userId, playlistId) => {
  await pool.query(
    "INSERT IGNORE INTO user_playlists (user_id, playlist_id) VALUES (?, ?)",
    [userId, playlistId]
  );
};

export const editPlaylist = async ({ id, name, description, mood }) => {
  await pool.query(
    'UPDATE playlists SET name = ?, description = ?, mood = ? WHERE id = ?',
    [name, description, mood, id]
  );
};

export const countUserPlaylists = async (userId) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS count FROM user_playlists WHERE user_id = ?",
    [userId]
  );
  return rows[0].count;
};
