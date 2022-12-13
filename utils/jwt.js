const { sign } = require('jsonwebtoken');
const { jwtKey } = require('../config/custom-environment-variables');
const { jwtExpirationTime } = require('../config/default');

module.exports.generateJWT = (id, email, role) => {
    const payload = { 
        id: id,
        email: email,
        role: role
    };
    const token = sign(payload, jwtKey, { expiresIn: jwtExpirationTime });

    return token;
};


