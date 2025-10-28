// // const express = require('express');
// // const usersController = require('../controllers/usersController');
// // const { googleLogin } = require('../controllers/authController');
// // const auth = require('../middlewares/authMiddleware');
// // const { upgradeToPro } = require("../controllers/usersController");
// // const router = express.Router();

// // router.get('/me', auth, usersController.getMe);
// // router.post('/register', usersController.register);
// // router.post('/login', usersController.login);
// // router.get('/:id', auth, usersController.getUserById);
// // router.post("/auth/google", googleLogin);
// // router.post("/logout", usersController.logout);
// // router.post("/upgrade", auth, upgradeToPro);

// // module.exports = router;
// import express from "express";
// import { getMe, register, login, getUserById, logout, upgradeToPro } from "../controllers/usersController.js";
// import { googleLogin } from "../controllers/authController.js";
// import auth from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/me", auth, getMe);
// router.post("/register", register);
// router.post("/login", login);
// router.get("/:id", auth, getUserById);
// router.post("/auth/google", googleLogin);
// router.post("/logout", logout);
// router.post("/upgrade", auth, upgradeToPro);

// export default router;
import express from "express";
import {
  getMe,
  register,
  login,
  getUserById,
  logout,
  upgradeToPro,
} from "../controllers/usersController.js";
import { googleLogin } from "../controllers/authController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ רישום והתחברות
router.post("/register", register);
router.post("/login", login);
router.post("/auth/google", googleLogin);

// ✅ מידע על המשתמש
router.get("/me", auth, getMe);
router.get("/:id", auth, getUserById);

// ✅ שדרוג ויציאה
router.post("/upgrade", auth, upgradeToPro);
router.post("/logout", logout);

export default router;
