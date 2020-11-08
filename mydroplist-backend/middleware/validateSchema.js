const ExpressError = require('../helpers/expressError');

const options = {
    abortEarly: false
}

function validateSchema(schema){
    return async (req, res, next) => {
        try {
            const validateBody = await schema.validate(req.body, options);
            req.body = validateBody;
            next();
        } catch (error) {
            next(ExpressError.badRequest(error));
        }
    }
}

module.exports = validateSchema