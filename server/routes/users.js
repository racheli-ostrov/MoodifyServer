const express = require('express');
const usersController = require('../controllers/usersController');
const { googleLogin } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const { upgradeToPro } = require("../controllers/usersController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', auth, usersController.getAllUsers);
router.get('/:id', auth, usersController.getUserById);
router.post("/auth/google", googleLogin);
router.post("/logout", usersController.logout);
router.post("/upgrade", auth, upgradeToPro);
router.post("/upgrade", authMiddleware, usersController.upgradeToPro);
router.get('/me', authMiddleware, usersController.getMe);

module.exports = router;