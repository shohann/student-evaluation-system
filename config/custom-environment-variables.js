const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    jwtKey: process.env.JWT_SECRET
};