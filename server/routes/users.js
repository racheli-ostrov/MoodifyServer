const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', auth, usersController.getAllUsers);
router.get('/:id', auth, usersController.getUserById);

module.exports = router;