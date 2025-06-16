// const express = require('express');
// const { upload } = require('../upload');
// const imagesController = require('../controllers/imagesController');
// const router = express.Router();
// // const auth = require('../middlewares/authMiddleware');
// router.post('/upload', upload.single('image'), imagesController.uploadAndDetectMood);
// // router.post('/', auth, imagesController.uploadAndDetectMood); // <-- לא צריך כרגע!
// // router.get('/user/:userId', auth, imagesController.getImagesByUser);

// module.exports = router;

const express = require("express");
const { upload } = require("../upload");
const imagesController = require("../controllers/imagesController");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload", auth, upload.single("image"), imagesController.uploadAndDetectMood);
router.get("/my", auth, imagesController.getImagesByUser);
router.delete("/:id", auth, imagesController.deleteImage);

module.exports = router;