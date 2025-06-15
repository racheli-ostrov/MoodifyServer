const express = require('express');
const usersController = require('../controllers/usersController');
const { googleLogin } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', auth, usersController.getAllUsers);
router.get('/:id', auth, usersController.getUserById);
router.post("/auth/google", googleLogin);

module.exports = router;