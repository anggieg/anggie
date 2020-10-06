const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.getToken = (req, res) => {
    const token = jwt.sign({
        string: moment().format('YYYYMMDDHHmmss')
    }, process.env.SECRET_KEY || 'anggiegunawan', {expiresIn: '1h'});

    res.status(200).json({
        token: token
    });
}