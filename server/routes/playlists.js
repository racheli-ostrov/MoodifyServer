// const express = require('express');
// const playlistsController = require('../controllers/playlistsController');
// const auth = require('../middlewares/authMiddleware');
// const requirePro = require('../middlewares/requirePro');
// const router = express.Router();

// router.get('/user/:userId', auth, playlistsController.getByUser);
// router.get('/:id', auth, playlistsController.getById);
// router.get('/bymood/:mood', playlistsController.getByMood);
// router.post('/:id/vote', auth, playlistsController.votePlaylist);
// router.post("/:playlistId/save", auth, playlistsController.savePlaylistForUser);
// router.post('/:playlistId/songs', auth, requirePro, playlistsController.addSongToPlaylist);
// router.delete('/:playlistId/songs/:songId', auth, requirePro, playlistsController.deleteSongFromPlaylist);
// router.put('/:playlistId/songs/:songId', auth, requirePro, playlistsController.editSongInPlaylist);
// router.put('/:playlistId', auth, requirePro, playlistsController.editPlaylist);

// module.exports = router;
import express from "express";
import playlistsController from "../controllers/playlistsController.js";
import auth from "../middlewares/authMiddleware.js";
import requirePro from "../middlewares/requirePro.js";

const router = express.Router();

router.get("/user/:userId", auth, playlistsController.getByUser);
router.get("/:id", auth, playlistsController.getById);
router.get("/bymood/:mood", playlistsController.getByMood);
router.post("/:id/vote", auth, playlistsController.votePlaylist);
router.post("/:playlistId/save", auth, playlistsController.savePlaylistForUser);
router.post("/:playlistId/songs", auth, requirePro, playlistsController.addSongToPlaylist);
router.delete("/:playlistId/songs/:songId", auth, requirePro, playlistsController.deleteSongFromPlaylist);
router.put("/:playlistId/songs/:songId", auth, requirePro, playlistsController.editSongInPlaylist);
router.put("/:playlistId", auth, requirePro, playlistsController.editPlaylist);

export default router;