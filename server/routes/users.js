const express = require('express');
const usersController = require('../controllers/usersController');
const { googleLogin } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const { upgradeToPro } = require("../controllers/usersController");
const router = express.Router();

router.get('/me', auth, usersController.getMe);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:id', auth, usersController.getUserById);
router.post("/auth/google", googleLogin);
router.post("/logout", usersController.logout);
router.post("/upgrade", auth, upgradeToPro);

module.exports = router;