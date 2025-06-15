// const albumsService = require('../services/albumsService');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const usersService = require('../service/usersService');
const jwt = require('jsonwebtoken');
// const pool = require('../../db/db');

const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);// const albumsController = {
//   getAllAlbums: async (req, res) => {
//     const { userId } = req.query;
//     if (!userId) return res.status(400).json({ error: 'Missing userId' });
//     try {
//       const [albums] = await albumsService.getAllAlbumsByUser(userId);
//       res.status(200).json(albums);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch albums' });
//     }
//   },
//   getAlbumById: async (req, res) => {
//     try {
//       const album = await albumsService.getAlbumById(req.params.id);
//       if (!album) return res.status(404).json({ error: 'Album not found' });
//       res.status(200).json(album);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch album' });
//     }
//   },
//   createAlbum: async (req, res) => {
//     const { title, userId } = req.body;
//     if (!title || !userId) return res.status(400).json({ error: 'Missing title or userId' });
//     try {
//       const [result] = await albumsService.createAlbum(title, userId);
//       res.status(201).json({ id: result.insertId, title, userId });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create album' });
//     }
//   },
//   updateAlbum: async (req, res) => {
//     const { title } = req.body;
//     if (!title) return res.status(400).json({ error: 'Missing title' });
//     try {
//       const result = await albumsService.updateAlbum(req.params.id, title);
//       if (result.affectedRows === 0) return res.status(404).json({ error: 'Album not found' });
//       res.status(200).json({ message: 'Album updated' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update album' });
//     }
//   },
//   deleteAlbum: async (req, res) => {
//     try {
//       const result = await albumsService.deleteAlbum(req.params.id);
//       if (result.affectedRows === 0) return res.status(404).json({ error: 'Album not found' });
//       res.status(200).json({ message: 'Album deleted' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to delete album' });
//     }
//   },
// };

// module.exports = albumsController;
// בקובץ: server/controllers/authController.js
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Missing token" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email || !name) return res.status(400).json({ error: "Invalid Google payload" });

    let user = await usersService.getByEmail(email);
    if (!user) {
      await usersService.create({ username: email, email, name, password: null, role: "user" });
      user = await usersService.getByEmail(email);
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
console.log("🔑 מחזיר ללקוח:", {
  token: jwtToken,
  user
});

    res.json({
      token: jwtToken,
      user: user,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ error: "Google login failed" });
  }
};