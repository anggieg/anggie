const jwt = require('jsonwebtoken');

const checkToken =  (req, res, next) => {

    const token = req.header('token');
    const secret = process.env.SECRET_KEY || 'anggiegunawan';

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            error.statusCode = 403;
            next(error);
        } else {
            next();
        }
    });
}

module.exports = checkToken;