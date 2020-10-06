const moment = require('moment');
const User = require('../models/user');
const redis = require('redis');
const client = redis.createClient();

const anggie = {
    getUsers: () => {
        return new Promise(async(resolve, reject) => {
            try{
                client.lrange('users', 0 , -1 , async (error, data) => {
                    if(error){
                        reject(error)
                    }
                    
                    if(data.length > 0){
                        const parsedData = data.map(d => JSON.parse(d));
                        resolve(parsedData)
                    }else{
                        const users = await User.find();
                        users.map(u => {
                            client.rpush('users', JSON.stringify(u.toObject()));
                        })
                        resolve(users);
                    }
                })
            }catch(error){
                reject(error)
            }
        })
    },
    postUser: (data) => {
        return new Promise(async(resolve, reject) => {
            try { 
                const user = new User({
                    userName: data.userName,
                    accountNumber: data.accountNumber,
                    emailAddress: data.emailAddress,
                    identityNumber: data.identityNumber,
                });

                const createdUser = await user.save();
                client.rpush('users', JSON.stringify(createdUser.toObject()));

                resolve(createdUser);
            }catch(error){
                reject(error)
            }
        })
    },
    updateUser: (userId, data) => {
        return new Promise(async(resolve, reject) => {
            try { 
                resolve({
                    userId: userId,
                    data: data
                });

                const user = await User.findById(userId);
                if(!user){
                    const error = new Error(`Can not find user with id of ${userId}`)
                    throw error;
                }

                user.userName = data.userName;
                user.emailAddress = data.emailAddress;
                user.identityNumber = data.identityNumber;

                const updatedUser = await user.save();

                const users = await User.find();
                client.del('users');
                users.map(u => {
                    client.rpush('users', JSON.stringify(u.toObject()));
                })

                resolve(updatedUser);
            }catch(error){
                reject(error)
            }
        })
    },
    deleteUser: (id) => {
        return new Promise(async(resolve, reject) => {
            try { 
                const user = await User.findById(id);
                if(!user){
                    const error = new Error(`Can not find user with id of ${id}`)
                    throw error;
                }

                const result = await User.findByIdAndRemove(id);

                const users = await User.find();
                client.del('users');
                users.map(u => {
                    client.rpush('users', JSON.stringify(u.toObject()));
                })

                resolve(result);
            }catch(error){
                reject(error)
            }
        })
    },
    getUserByAccNo: (accNo) => {
        return new Promise(async(resolve, reject) => {
            try { 
                client.get(accNo, async (error, data) => {
                    if(error){
                        reject(error)
                    }
                    
                    if(data!== null){
                        const parsedData = JSON.parse(data);
                        resolve(parsedData)
                    }else{
                        const user = await User.findOne({'accountNumber': accNo});
                        if(!user){
                            const error = new Error(`Can not find user with accountNumber of ${accNo}`)
                            throw error;
                        }

                        client.set(user.accountNumber, JSON.stringify(user));
                        resolve(user);
                    }
                })
            }catch(error){
                reject(error)
            }
        })
    },
    getUserByIdentityNo: (identityNo) => {
        return new Promise(async(resolve, reject) => {
            try { 
                client.get(identityNo, async (error, data) => {
                    if(error){
                        reject(error)
                    }
                    
                    if(data!== null){
                        const parsedData = JSON.parse(data);
                        resolve(parsedData)
                    }else{
                        const user = await User.findOne({'identityNumber': identityNo});
                        if(!user){
                            const error = new Error(`Can not find user with identityNumber of ${identityNo}`)
                            throw error;
                        }

                        client.set(user.identityNumber, JSON.stringify(user));
                        resolve(user);
                    }
                })
            }catch(error){
                reject(error)
            }
        })
    }
}

module.exports = anggie;