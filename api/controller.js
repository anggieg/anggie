const anggie = require('../services/anggie');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const controllers = {
    auth: {
        getToken: (req, res) => {
            const token = jwt.sign(moment().format('YYYYMMDDHHmmss'), process.env.SECRET_KEY || 'anggiegunawan');

            res.status(200).json({
                token: token
            });
        }
    },
    user: {
        postUser: async (req, res) => {
            try{
                const result = await anggie.postUser();
                res.status(200).json({
                    user: result
                });
            }catch(error){
                res.status(500).json({
                    error: error
                });
            }
        },
        getUsers: async (req, res, next) => {
            const users = await anggie.getUsers();
            res.status(200).json({
                users: users
            });
        }
        // updateUser: (req, res) => {
        //     res.status(200).json({
        //         message: 'from updateUser'
        //     });
        // },
        // deleteUser: (req, res) => {
        //     res.status(200).json({
        //         message: 'from deleteUser'
        //     });
        // },
    }
}

module.exports = controllers