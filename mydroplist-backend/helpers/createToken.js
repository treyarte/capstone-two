const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');

function createToken({user}){
    let payload = {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
        role_id: user.role_id
    };
    return jwt.sign(payload, SECRET);
}

module.exports = createToken;