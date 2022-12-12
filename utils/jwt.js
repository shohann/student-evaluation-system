const { sign } = require('jsonwebtoken');
const { jwtKey } = require('../config/custom-environment-variables');
const { jwtExpirationTime } = require('../config/default');

module.exports.generateJWT = (id, email) => {
    const payload = { id: id, email: email, role: role};
    const token = sign(payload, jwtKey, jwtExpirationTime);

    return token;
};

// module.exports.generateJWT = (id, email) =>  sign({id: id, email: email, role: role}, jwtKey, jwtExpirationTime);
