const anggie = require('../services/anggie');
const moment = require('moment');
const redis = require('redis');
const redisClient = redis.createClient();
const flat = require('flat');

exports.testRedis = (req, res, next) => {
    // redisClient.lrange('mylist', 0, -1, (error, data) => {
    //     data.map(d => {
    //         console.log(JSON.parse(d));
    //     });
    // });

    // redisClient.hmset('anggie', {'userName':'anggieGunawan', 'email':'anggie@email.com'});
    // redisClient.hmset("myKey", "foo", "bar");
    redisClient.hgetall('hera', (error, data) => {
        res.status(200).json(data);
    });
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await anggie.getUsers();
        
        res.status(200).json({
            users: users
        });
        
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}

exports.postUser = async (req, res, next) => {
    const data = {
        userName: req.body.userName,
        accountNumber: parseInt(moment().format('YYYYMMDDHHmmssS')),
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
    };

    try{
        const createdUser = await anggie.postUser(data);

        res.status(200).json({
            user: createdUser
        });
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    try{
        const deletedUser = await anggie.deleteUser(userId);
        
        res.status(200).json({
            message: deletedUser
        });
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const data = {
        userName: req.body.userName,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber
    }

    try{
        const updatedUser = await anggie.updateUser(userId, data);
        
        res.status(200).json({
            message: updatedUser
        });
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}

exports.getUserByAccNo = async (req, res, next) => {
    const { accNo } = req.params;

    try{
        const user = await anggie.getUserByAccNo(accNo);
        
        res.status(200).json({
            user: user
        });
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}

exports.getUserByIdentityNo = async (req, res, next) => {
    const { identityNo } = req.params;

    try{
        const user = await anggie.getUserByIdentityNo(identityNo);
        
        res.status(200).json({
            user: user
        });
    }catch(error){
        error.statusCode = 500;
        next(error);
    }
}



// exports.postUser = async (req, res) => {
//     try{
//         const result = await anggie.postUser();
//         res.status(200).json({
//             user: result
//         });
//     }catch(error){
//         res.status(500).json({
//             error: error
//         });
//     }
// }

// exports.getUsers = async (req, res) => {
//     try {
//         const users = await anggie.getUsers();
        
//         redisClient.setex('users', users, 3600);
        
//         res.status(200).json({
//             users: users
//         });
//     }catch(error){
//         res.status(500).json({
//             error: error
//         });
//     }

// }