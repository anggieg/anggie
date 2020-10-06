const anggie = require('../services/anggie');
const moment = require('moment');
const redis = require('redis');

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