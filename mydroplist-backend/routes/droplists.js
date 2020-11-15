const express = require('express');
const router = express.Router();
const droplistController = require('../controllers/droplistController');
const {ensureLogIn} = require('../middleware/auth')


router.get('/', ensureLogIn, droplistController.getDroplists);

module.exports = router;