const createToken = require('../helpers/createToken');
const User = require('../models/User');

class AuthController{
    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const user = await User.authenticate(email, password);
    
            const token = createToken(user);
    
            return res.status(200).json({token})
    
        } catch (error) {
            return next(error)
        }
    }

    async signUp(req, res, next){
        try {
            const data = req.body;
            const user = await User.register(data);
    
            const token = createToken(user);
    
            return res.status(201).json({token});
            
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController;