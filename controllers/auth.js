const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.generateAuthToken = (req, res) => {
    const token = jwt.sign({
        token: moment().format('YYYYMMDDHHmmss')
    }, process.env.SECRET_KEY || 'anggiegunawan', {expiresIn: '1h'});

    res.status(200).json({
        authToken: token
    });
}