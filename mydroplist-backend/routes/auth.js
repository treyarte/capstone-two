const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {SECRET} = require('../config')
const jwt = require('jsonwebtoken')

/**
 * authenticates a user and returns a jwt
 * input: email, password
 * return: jwt
 */
router.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.authenticate(email, password);

        const token = jwt.sign(
            {id: user.id, email: user.email, is_admin: user.is_admin},
            SECRET
        );
    return res.json({token})
    } catch (error) {
        return next(error)
    }
});

router.post('/sign-up', async (req, res, next) => {
    try {
        const data = req.body;
        const user = await User.register(data);

        const token = jwt.sign(
            {id: user.id, email: user.email, is_admin: user.is_admin},
            SECRET
        );

        return res.status(201).json({token});
    } catch (error) {
        return next(error);
    }
})

module.exports = router