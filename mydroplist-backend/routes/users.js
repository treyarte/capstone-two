const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

const {ensureCorrectUser, ensureLogIn} = require('../middleware/auth')

router.get('/', ensureLogIn, userController.getUsers);

router.get('/:id', ensureLogIn, userController.getUser);

router.put('/:id', ensureLogIn, ensureCorrectUser, userController.updateUser);

router.delete('/:id', ensureLogIn, ensureCorrectUser, userController.removeUser);

module.exports = router;