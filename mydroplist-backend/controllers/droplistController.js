const ExpressError = require('../helpers/expressError');
const Droplist = require('../models/Droplist');

class droplistController{
    async index (req, res, next){
        try {
            const droplists = await Droplist.getAll(req.user.id, req.user.role_id);
            
            return res.json(droplists);

        } catch (error) {
            return next(error);
        }
    }

    async details(req, res, next){
        try {
            const {id} = req.params;

            const droplist = await Droplist.get(id)

            return res.json(droplist);
        } catch (error) {
            return next(error);
        }
    }

    async new(req, res, next){
        try {
            //make sure to create middleware to check if the role is a stocker
            const stocker_id = req.user.id;
            const droplist = await Droplist.new({...req.body, stocker_id})

            return res.status(201).json(droplist);
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next){
        try {
            
            const {id} = req.params;

            const droplist = await Droplist.update({...req.body, droplist_id: id});

            return res.json(droplist);

        } catch (error) {
            return next(error);
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params;

            const deleted = await Droplist.delete(id);

            if(deleted){
                return res.json({message: 'droplist successfully deleted'});
            } else {
                throw new ExpressError('could not delete droplist', 400);
            }

        } catch (error) {
            return next(error);
        }
    }

    async send(req, res, next){
        try {
            const {id} = req.params;
            const {forklift_driver_id} = req.body;

            const droplist_id = await Droplist.addDriver(id, forklift_driver_id);

            const droplist = await Droplist.get(droplist_id);

            return res.json(droplist);

        } catch (error) {
            return next(error);
        }
    }

    async accept(req, res, next){
        try {
            const {id} = req.params;

            const droplist_id = await Droplist.changeStatus('ACCEPTED', id);

            if(!droplist_id){
                throw new ExpressError('could not accept droplist', 400);
            }

            return res.json({
                message: 'droplist successfully accepted'
            })

        } catch (error) {
            return next(error);
        }
    }

    async decline(req, res, next){
        try {
            const {id} = req.params;

            const droplist_id = await Droplist.changeStatus('DECLINED', id);

            if(!droplist_id){
                throw new ExpressError('could not decline droplist', 400);
            }

            return res.json({
                message: 'droplist decline'
            })

        } catch (error) {
            return next(error);
        }
    }

    async complete(req, res, next){
        try {
            const {id} = req.params;

            const droplist_id = await Droplist.changeStatus('COMPLETED', id);

            if(!droplist_id){
                throw new ExpressError('could not complete droplist', 400);
            }

            return res.json({
                message: 'droplist successfully completed'
            })

        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new droplistController();