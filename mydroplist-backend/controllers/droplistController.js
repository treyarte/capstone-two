const Droplist = require('../models/Droplist');

class droplistController{
    async getDroplists(req, res, next){
        try {
            
            const droplists = await Droplist.getAll(req.user.id, req.user.role_id);
            
            return res.json(droplists);

        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new droplistController();