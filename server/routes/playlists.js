const express = require('express');
const playlistsController = require('../controllers/playlistsController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, playlistsController.createPlaylist);
router.get('/user/:userId', auth, playlistsController.getByUser);
router.get('/:id', auth, playlistsController.getById);

module.exports = router;