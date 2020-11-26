const express = require('express');
const router = express.Router({mergeParams: true});
const ItemController = require('../controllers/itemController');
const {ensureLogIn, droplistAccess, isStocker} = require('../middleware/auth');
const itemSchema = require('../yupSchemas/itemSchema');
const validationSchema = require('../middleware/validateSchema');



router.get('/', ensureLogIn, droplistAccess, isStocker,  ItemController.index);
router.get('/:item_id', ensureLogIn, droplistAccess, isStocker, ItemController.details);
router.post('/new', ensureLogIn, droplistAccess, isStocker, validationSchema(itemSchema.item), ItemController.new); 
router.patch('/:item_id', ensureLogIn, droplistAccess, isStocker, validationSchema(itemSchema.item), ItemController.update);
router.delete('/:item_id', ensureLogIn, droplistAccess, isStocker, ItemController.remove);

module.exports = router;