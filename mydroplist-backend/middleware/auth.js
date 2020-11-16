const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const ExpressError = require('../helpers/expressError');
const Droplist = require('../models/Droplist');

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
    if(req.user.id === parseInt(req.params.id)){
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

/**
 * check if user has access to droplist
 */
async function droplistAccess(req, res, next){
    const {id} = req.params;

    const {droplist} = await Droplist.get(id);

    if(droplist.forklift_driver){
        if(droplist.forklift_driver.id === req.user.id){
            return next();
        }
    }
    if(droplist.stocker.id === req.user.id){
        return next();
    } else {
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error);
    }
}

/**
 * check if a user is a stocker
 */
function isStocker(req, res, next){
    if(req.user.role_id === 1){
        return next();
    } else {
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error);
    }
}

/**
 * check if a user is a driver
 */
function isDriver(req, res, next){
    if(req.user.role_id === 2){
        return next();
    } else {
        const error = new ExpressError('Unauthorized Access', 401);
        return next(error);
    }
}

module.exports = {
    ensureAdmin,
    ensureCorrectUser,
    authenticateJWT,
    ensureLogIn,
    authenticateJWT,
    droplistAccess,
    isStocker,
    isDriver
}