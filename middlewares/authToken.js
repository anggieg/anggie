const jwt = require('jsonwebtoken');

const authToken =  (req, res, next) => {

    const token = req.header('authToken');
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

module.exports = authToken;