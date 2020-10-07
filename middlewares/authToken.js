const jwt = require('jsonwebtoken');

// function to verify authorization token
const authToken =  (req, res, next) => {

    // get the authToken from request header
    const token = req.header('authToken');

    // get secret key from .env variable
    const secret = process.env.SECRET_KEY;

    // verify the token
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            console.log('error :: ', error);
            error.statusCode = 403;
            next(error);
        } else {
            next();
        }
    });
}

module.exports = authToken;