const jwt = require('jsonwebtoken');

const checkToken =  (req, res, next) => {
    const secret = process.env.SECRET_KEY || 'anggiegunawan';
    const token = req.header('token');

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).json({
                message: 'Invalid token'
            })
        } else {
            next();
        }
    });
}

module.exports = checkToken;