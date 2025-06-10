const express = require('express');
const imagesController = require('../controllers/imagesController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, imagesController.uploadAndDetectMood);
router.get('/user/:userId', auth, imagesController.getImagesByUser);

module.exports = router;