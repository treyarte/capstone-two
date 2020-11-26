const User = require("../models/User");

class UserController{
    async getUsers(req, res, next){
        try {
            const {option} = req.query;
            const users = await User.getAll(option);
            return res.json(users);
        } catch (error) {
            return next(error);
        }
    }

    async getUser(req, res, next){
        try {
            const {id} = req.params;
            const user = await User.get(id);
            return res.json(user);
        } catch (error) {
            return next(error);
        }
    }

    async updateUser(req, res, next){
        try {
            const {id} = req.params;
            const { first_name, last_name, email, department_id, password, role_id} = req.body;
    
            const updatedUser = await User.update(id, {first_name, last_name, email, department_id, password, role_id});
            return res.json(updatedUser);
        } catch (error) {
            return next(error)
        }
    }
    async removeUser(req, res, next){
        try {
            const {id} = req.params;
            const is_deleted = await User.delete(id);
    
            if(is_deleted) return res.json({message: 'User deleted'});
            else return res.json({message: 'User cannot be deleted'});
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new UserController();