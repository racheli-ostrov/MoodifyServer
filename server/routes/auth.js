// const express = require('express');
// const { googleLogin } = require('../controllers/authController');
// const router = express.Router();

// router.post('/google', googleLogin);

// module.exports = router;
import express from "express";
import { googleLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleLogin);

export default router;
