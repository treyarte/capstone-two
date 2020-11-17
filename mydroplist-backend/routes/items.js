const express = require('express');
const router = express.Router({mergeParams: true});
const ItemController = require('../controllers/itemController');
const {ensureLogIn, droplistAccess, isStocker} = require('../middleware/auth');
const Item = require('../models/Item');


router.get('/', ItemController.index);
router.get('/:item_id', ItemController.details);
router.post('/new', ItemController.new); 
router.patch('/:item_id', ItemController.update);
router.delete('/:item_id', ItemController.remove);

module.exports = router;