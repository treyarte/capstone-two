const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * authenticates a user and returns a jwt
 * input: email, password
 * return: jwt
 */
router.post('/login', authController.login);

router.post('/sign-up', authController.signUp)

module.exports = router