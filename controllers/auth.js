const jwt = require('jsonwebtoken');
const moment = require('moment');

// function to generate the authorization token
exports.generateAuthToken = (req, res) => {

    // generate the JWT with expiry time
    const token = jwt.sign({
        token: moment().format('YYYYMMDDHHmmss')
    }, process.env.SECRET_KEY , {expiresIn: process.env.TOKEN_EXPIRATION});

    res.status(200).json({
        authToken: token
    });
}