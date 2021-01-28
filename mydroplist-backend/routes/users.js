const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userSchema = require('../yupSchemas/userSchema');
const validationSchema = require('../middleware/validateSchema');

const {ensureCorrectUser, ensureLogIn} = require('../middleware/auth')

router.get('/', ensureLogIn, userController.getUsers);

router.get('/:id', ensureLogIn, userController.getUser);

router.put('/:id', ensureLogIn, ensureCorrectUser, validationSchema(userSchema.update) ,userController.updateUser);

router.delete('/:id', ensureLogIn, ensureCorrectUser, userController.removeUser);

module.exports = router;