const Admin = require('../models/Admin');

class AdminController{
    async makeAdmin(req, res, next){
        try {
            const {id} = req.params;
            const admin = await Admin.makeAdmin(id);
            return res.json(admin);
        } catch (error) {
            return next(error);
        }
    }

    async revokeAdmin(req, res, next){
        try {
            const {id} = req.params;
            const user = await Admin.revokeAdmin(id);
            return res.json(user);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AdminController();