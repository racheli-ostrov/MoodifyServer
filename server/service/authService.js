const pool = require('../../db/db');

const albumsService = {
  getAllAlbumsByUser: async (userId) => {
    return pool.query('SELECT * FROM albums WHERE userId = ?', [userId]);
  },
  getAlbumById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM albums WHERE id = ?', [id]);
    return rows[0];
  },
  createAlbum: async (title, userId) => {
    return pool.query('INSERT INTO albums (title, userId) VALUES (?, ?)', [title, userId]);
  },
  updateAlbum: async (id, title) => {
    const [result] = await pool.query('UPDATE albums SET title = ? WHERE id = ?', [title, id]);
    return result;
  },
  deleteAlbum: async (id) => {
    const [result] = await pool.query('DELETE FROM albums WHERE id = ?', [id]);
    return result;
  },
};

module.exports = albumsService;