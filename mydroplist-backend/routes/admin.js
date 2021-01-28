const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const userSchema = require('../yupSchemas/userSchema');
const validationSchema = require('../middleware/validateSchema');
const {ensureAdmin, ensureLogIn} =  require('../middleware/auth');

router.patch('/:id/makeAdmin', ensureLogIn, ensureAdmin, adminController.makeAdmin);
router.patch('/:id/revokeAdmin', ensureLogIn, ensureAdmin, adminController.revokeAdmin);
router.delete('/users/:id', ensureLogIn, ensureAdmin, userController.removeUser);

module.exports = router;
