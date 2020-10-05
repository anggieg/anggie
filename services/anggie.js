const moment = require('moment');
const User = require('../models/user');

const anggie = {
    getUsers: () => {
        return new Promise(async(resolve, reject) => {
            try{
                const users = await User.find();
                resolve(users);
            }catch(error){
                reject(error)
            }
        })
    },
    postUser: () => {
        return new Promise(async(resolve, reject) => {
            try {
                const user = new User({
                    userName: 'anggieGunawan',
                    accountNumber: '001',
                    emailAddress: 'anggie@email.com',
                    identityNumber: '1234567',
                });

                user.save()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error)
                });
            }catch(error){
                reject(error)
            }
        })
    }
}

module.exports = anggie;