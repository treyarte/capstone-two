const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const ExpressError = require('../helpers/expressError');

/**
 * authenticates a valid jwt
 * 
 */
function authenticateJWT(req, res, next){
    try {
        const {token} = req.body;
        const payload = jwt.verify(token, SECRET)
        req.user = payload;
        return next();
    } catch (error) {
        return next()
    }
}

/**
 * check if a user is logged in
 */
function ensureLogIn(req, res, next){
    if(!req.user){
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error)
    } else {
      return next(); //look here if not working
    }
}


/**
 * check if the logged in user is the same as user trying to modify
 */
function ensureCorrectUser(req, res, next){
    if(req.user.id === req.params.id){
        return next();
    } else {
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error);
    }
}

/**
 * check if a user is admin
 */
function ensureAdmin(req, res, next){
    if(req.user.is_admin){
        return next();
    } else {
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error);
    }
}