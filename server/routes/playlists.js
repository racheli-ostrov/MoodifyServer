// const express = require('express');
// const playlistsController = require('../controllers/playlistsController');
// const auth = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.post('/', auth, playlistsController.createPlaylist);
// router.get('/user/:userId', auth, playlistsController.getByUser);
// router.get('/:id', auth, playlistsController.getById);
// router.get("/bymood/:mood", playlistsController.getByMood);
// router.post("/:id/vote", auth, playlistsController.votePlaylist);
// // router.post('/create', playlistsController.createPlaylist);

// module.exports = router;
const express = require('express');
const playlistsController = require('../controllers/playlistsController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/user/:userId', auth, playlistsController.getByUser);
router.get('/:id', auth, playlistsController.getById);
router.get('/bymood/:mood', playlistsController.getByMood);
router.post('/:id/vote', auth, playlistsController.votePlaylist);
router.post("/:playlistId/save", auth, playlistsController.savePlaylistForUser);
router.post('/:playlistId/songs', auth, playlistsController.addSongToPlaylist);
router.delete('/:playlistId/songs/:songId', auth, playlistsController.deleteSongFromPlaylist);
router.put('/:playlistId/songs/:songId', auth, playlistsController.editSongInPlaylist);
router.put('/:playlistId', auth, playlistsController.editPlaylist);

module.exports = router;