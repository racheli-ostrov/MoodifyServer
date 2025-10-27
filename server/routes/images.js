// const express = require('express');
// const { upload } = require('../utils/upload');
// const imagesController = require('../controllers/imagesController');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');

// router.post('/upload', upload.single('image'), auth, imagesController.uploadAndDetectMood);
// router.get('/my', auth, imagesController.getMyImages);
// router.put("/:id", auth, imagesController.updateImageName);
// router.delete('/:id', auth, imagesController.deleteImage);

// module.exports = router;
import express from "express";
import { upload } from "../utils/upload.js";
import * as imagesController from "../controllers/imagesController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("image"), auth, imagesController.uploadAndDetectMood);
router.get("/my", auth, imagesController.getMyImages);
router.put("/:id", auth, imagesController.updateImageName);
router.delete("/:id", auth, imagesController.deleteImage);

export default router;
