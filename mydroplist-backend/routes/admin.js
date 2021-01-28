const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userSchema = require('../yupSchemas/userSchema');
const validationSchema = require('../middleware/validateSchema');
const {ensureAdmin, ensureLogIn} =  require('../middleware/auth');

router.delete('/:id', ensureLogIn, ensureAdmin, userController.removeUser);

module.exports = router;
