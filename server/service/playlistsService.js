const pool = require('../../db/db');
exports.createPlaylist = async ({ user_id, image_id, mood, name, description }) => {
  const [res] = await pool.query(
    'INSERT INTO playlists (user_id, image_id, mood, name, description) VALUES (?, ?, ?, ?, ?)',
    [user_id, image_id, mood, name, description]
  );
  return res.insertId;
};
exports.getByUserId = async (user_id) => {
  const [rows] = await pool.query('SELECT * FROM playlists WHERE user_id = ?', [user_id]);
  return rows;
};
exports.getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM playlists WHERE id = ?', [id]);
  return rows[0];
};
exports.getMoodFromImage = async (image_id) => {
  const [rows] = await pool.query('SELECT mood FROM images WHERE id = ?', [image_id]);
  return rows[0]?.mood;
};


exports.getByMood = async (mood) => {
  // משתמש ב-LOWER כדי לאפשר השוואה לא תלויה באותיות גדולות/קטנות
  const [rows] = await pool.query(
    'SELECT * FROM playlists WHERE LOWER(mood) = LOWER(?)',
    [mood]
  );
  return rows;
};

// module.exports = {
//   getByMood,
//   // שאר הפונקציות הקיימות:
//   // getAll,
//   // getByUserId,
//   // getById,
//   // create,
//   // update,
//   // remove
// };