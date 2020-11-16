const express = require('express');
const router = express.Router();
const droplistController = require('../controllers/droplistController');
const {ensureLogIn, droplistAccess, isStocker, isDriver} = require('../middleware/auth');
const validateSchema = require('../middleware/validateSchema');
const droplistSchema = require('../yupSchemas/droplistSchema');


router.get('/', ensureLogIn,  droplistController.index);
router.get('/:id', ensureLogIn, droplistAccess, droplistController.details);
router.post('/new', ensureLogIn, isStocker,  validateSchema(droplistSchema.droplist), droplistController.new);
router.patch('/:id/update', ensureLogIn, droplistAccess, isStocker, validateSchema(droplistSchema.droplist), droplistController.update);
router.patch('/:id/send', ensureLogIn, droplistAccess, isStocker, droplistController.send);
router.delete('/:id/delete', ensureLogIn, droplistAccess, isStocker, droplistController.delete);
router.patch('/:id/accept', ensureLogIn, droplistAccess, isDriver, droplistController.accept);
router.patch('/:id/decline', ensureLogIn,droplistAccess, isDriver,  droplistController.decline);
router.patch('/:id/complete', ensureLogIn, droplistAccess, isDriver, droplistController.complete);




module.exports = router;