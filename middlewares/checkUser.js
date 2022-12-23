const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        next()
    } else {
      res.locals.user = null;
      next();
    }
};