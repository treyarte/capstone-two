const express = require('express');
const router = express.Router();
const User = require('../models/User');

const {ensureCorrectUser, ensureLogIn} = require('../middleware/auth')

router.get('/', ensureLogIn, async (req, res, next) =>{
    try {
        const users = await User.getAll();
        return res.json(users);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;