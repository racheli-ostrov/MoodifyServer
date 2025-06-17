// const express = require('express');
// const { upload } = require('../upload');
// const imagesController = require('../controllers/imagesController');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// router.post('/upload', auth, upload.single('image'), imagesController.uploadAndDetectMood);
// // router.post('/', auth, imagesController.uploadAndDetectMood); // <-- לא צריך כרגע!
// router.get('/user/:userId', auth, imagesController.getImagesByUser);

// module.exports = router;
const express = require('express');
const { upload } = require('../upload');
const imagesController = require('../controllers/imagesController');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.post('/upload', upload.single('image'), auth, imagesController.uploadAndDetectMood);
router.get('/user/:userId', auth, imagesController.getImagesByUser);

// ✅ הנתיב החדש
router.get('/my', auth, imagesController.getMyImages);
router.put("/:id", auth, imagesController.updateImageName);
router.delete('/:id', auth, imagesController.deleteImage);

module.exports = router;
