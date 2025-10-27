// // const pool = require('../../db/db');
// import pool from "../../db/db.js";
// exports.createImage = async ({ user_id, url, mood }) => {
//   const [result] = await pool.query(
//     'INSERT INTO images (user_id, url, mood) VALUES (?, ?, ?)',
//     [user_id, url, mood]
//   );
//   return result.insertId;
// };

// exports.getImagesByUser = async (user_id) => {
//   const [rows] = await pool.query('SELECT * FROM images WHERE user_id = ?', [user_id]);
//   return rows;
// };

// exports.deleteImage = async (imageId, userId) => {
//   await pool.query(
//     "DELETE FROM images WHERE id = ? AND user_id = ?",
//     [imageId, userId]
//   );
// };

// exports.updateName = async (id, name) => {
//   const [result] = await pool.query(
//     "UPDATE images SET name = ? WHERE id = ?",
//     [name, id]
//   );
//   return result;
// };
import pool from "../../db/db.js";

export const createImage = async ({ user_id, url, mood }) => {
  const [result] = await pool.query(
    "INSERT INTO images (user_id, url, mood) VALUES (?, ?, ?)",
    [user_id, url, mood]
  );
  return result.insertId;
};

export const getImagesByUser = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM images WHERE user_id = ?",
    [user_id]
  );
  return rows;
};

export const deleteImage = async (imageId, userId) => {
  await pool.query("DELETE FROM images WHERE id = ? AND user_id = ?", [
    imageId,
    userId,
  ]);
};

export const updateName = async (id, name) => {
  const [result] = await pool.query(
    "UPDATE images SET name = ? WHERE id = ?",
    [name, id]
  );
  return result;
};
