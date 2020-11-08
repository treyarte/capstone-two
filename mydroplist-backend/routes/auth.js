const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateSchema = require('../middleware/validateSchema');
const authSchema = require('../yupSchemas/authSchema');

/**
 * authenticates a user and returns a jwt
 * input: email, password
 * return: jwt
 */
router.post('/login', validateSchema(authSchema.login), authController.login);

router.post('/sign-up', authController.signUp)

module.exports = router