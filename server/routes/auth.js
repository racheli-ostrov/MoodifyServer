const express = require('express');
// const albumsController = require('../controllers/albumsController');
const { googleLogin } = require('../controllers/authController');
const router = express.Router();

// router.get('/', albumsController.getAllAlbums);
// router.get('/:id', albumsController.getAlbumById);
// router.post('/', albumsController.createAlbum);
// router.put('/:id', albumsController.updateAlbum);
// router.delete('/:id', albumsController.deleteAlbum);
router.post('/google', googleLogin);

module.exports = router;