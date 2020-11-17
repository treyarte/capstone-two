const ExpressError = require('../helpers/expressError');
const Item = require('../models/Item');
const Droplist = require('../models/Droplist');

class ItemController {
    async new(req, res, next){
        try {
            const {id} = req.params;

            const item = await Item.new({...req.body, droplist_id: id});

            return res.status(201).json(item)

        
        } catch (error) {
            return next(error);
        }
    }

    async index(req, res, next){
        try {
            const {id} = req.params;

            const items = await Item.getAll(id);

            return res.json(items);
        } catch (error) {
            return next(error);
        }
    }

    async details(req, res, next){
        try {
            const {item_id} = req.params;

            const item = await Item.get(item_id);

            return res.json(item);

        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next){
        try {
            const {item_id} = req.params;
            const item = await Item.update({...req.body, item_id})

            return res.json(item);

        } catch (error) {
            return next(error);
        }
    }

    async remove(req, res, next){
        try {
            const {item_id} = req.params;
            const isDeleted = await Item.delete(item_id);

            if (isDeleted) {
                return res.json({message: 'Item removed'});
            } else {
                throw new ExpressError('Item was not deleted', 400);
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ItemController();