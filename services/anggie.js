/** A microservice to manage user data in mongoDB database and also user data caching using Redis**/
const User = require('../models/user');
const redis = require('redis');
const moment = require('moment');
const client = redis.createClient();

const anggie = {
    // get all user data
    getUsers: () => {
        return new Promise(async(resolve, reject) => {
            try{
                // check wheter user data list exists in Redis with 'users' as the key
                client.lrange('users', 0 , -1 , async (error, data) => {
                    // if error occurred return error
                    if(error){
                        reject(error)
                    }
                    
                    if(data.length > 0){ // if user data list has data, return cached data

                        // parse data for every list element
                        const parsedData = data.map(d => JSON.parse(d));

                        // return the parsed data
                        resolve(parsedData)

                    }else{ // if no user data in the list, get data from mongoDB then push them to Redis for future caching
                        
                        // get all user data in mongoDB
                        const users = await User.find();

                        // push every user data from mongoDB to Redis 'users' key
                        users.map(u => {
                            client.rpush('users', JSON.stringify(u.toObject()));
                        })

                        // return the data
                        resolve(users);
                    }
                })
            }catch(error){ // if error occurred, return the error response
                reject(error)
            }
        })
    },
    // create a user data
    postUser: (data) => {
        return new Promise(async(resolve, reject) => {
            try { 

                // get user data payload to be written to mongoDB
                const user = new User({
                    userName: data.userName,
                    accountNumber: parseInt(moment().format('YYYYMMDDHHmmssS')), // generate accountNumber
                    emailAddress: data.emailAddress,
                    identityNumber: data.identityNumber,
                });

                // write the user data to mongoDB
                const createdUser = await user.save();

                // if user successfully created, push a user data element to 'users' list in Redis and also,
                // data synchronization with mongoDB
                client.rpush('users', JSON.stringify(createdUser.toObject()));

                // return created user data
                resolve(createdUser);
            }catch(error){  // if error occurred, return the error response
                reject(error)
            }
        })
    },
    // update a user data
    updateUser: (userId, data) => {
        return new Promise(async(resolve, reject) => {
            try { 
                
                // get an existing user data by userId
                const user = await User.findById(userId);

                // if user with the userId does not exist in mongoBD, throw error response
                if(!user){
                    const error = new Error(`Can not find user with id of ${userId}`)
                    throw error;
                }

                // if a user with the userId is found, 
                // overwrite the existing user data with data passed in the function parameter
                user.userName = data.userName;
                user.emailAddress = data.emailAddress;
                user.identityNumber = data.identityNumber;

                // save the change to mongoDB
                const updatedUser = await user.save();

                // re-populate user data from mongoDB to re-initialize 'users' list in Redis
                const users = await User.find();

                // delete existing user list data with 'users' key in Redis
                client.del('users');

                // push every user data retrieved from mongoDB to re-create the users list in Redis
                users.map(u => {
                    client.rpush('users', JSON.stringify(u.toObject()));
                })

                // return updated user data
                resolve(updatedUser);
            }catch(error){  // if error occurred, return the error response
                reject(error)
            }
        })
    },
    // delete a user data
    deleteUser: (userId) => {
        return new Promise(async(resolve, reject) => {
            try { 
                
                // get an existing user data by userId
                const user = await User.findById(userId);

                // if user with the userId does not exist in mongoBD, throw error response
                if(!user){
                    const error = new Error(`Can not find user with id of ${userId}`)
                    throw error;
                }

                // delete user data with the userId
                const deletedUser = await User.findByIdAndRemove(userId);

                // re-populate user data from mongoDB to re-initialize 'users' list in Redis
                const users = await User.find();

                // delete existing user list data with 'users' key in Redis
                client.del('users');

                // push every user data retrieved from mongoDB to re-create the users list in Redis
                users.map(u => {
                    client.rpush('users', JSON.stringify(u.toObject()));
                })

                // return the deleted user
                resolve(deletedUser);
            }catch(error){  // if error occurred, return the error response
                reject(error)
            }
        })
    },
    // get user data by accountNumber
    getUserByAccNo: (accNo) => {
        return new Promise(async(resolve, reject) => {
            try { 

                // check wheter a user data exists in Redis with the account number as the key
                client.get(accNo, async (error, data) => {
                    
                    // if error occurred return error
                    if(error){
                        reject(error)
                    }
                    
                    // if a user data with the accountNo exists then parse the data and return the response
                    if(data !== null){
                        const parsedData = JSON.parse(data);
                        resolve(parsedData)
                    }else{ 
                        // if no user data with the accountNo exists, get data from mongoDB then set the user data to Redis,
                        // with the account number as key for future caching

                        // find user with the accountNumber in mongoDB
                        const user = await User.findOne({'accountNumber': accNo});

                        // if no user found return error response
                        if(!user){
                            const error = new Error(`Can not find user with accountNumber of ${accNo}`)
                            throw error;
                        }

                        // set a new user data in Redis with the user account number as key for future caching
                        client.set(user.accountNumber, JSON.stringify(user));

                        // return the response
                        resolve(user);
                    }
                })
            }catch(error){  // if error occurred, return the error response
                reject(error)
            }
        })
    },
    // get user data by identityNumber
    getUserByIdentityNo: (identityNo) => {
        return new Promise(async(resolve, reject) => {
            try { 

                // check wheter a user data exists in Redis with the identity number as the key
                client.get(identityNo, async (error, data) => {

                    // if error occurred return error
                    if(error){
                        reject(error)
                    }
                    
                    // if a user data with the identityNo exists then parse the data and return the response
                    if(data !== null){
                        const parsedData = JSON.parse(data);
                        resolve(parsedData)
                    }else{
                        // if no user data with the identityNo exists, get data from mongoDB then set the user data to Redis,
                        // with the identity number as key for future caching

                        // find user with the identityNumber in mongoDB
                        const user = await User.findOne({'identityNumber': identityNo});

                        // if no user found return error response
                        if(!user){
                            const error = new Error(`Can not find user with identityNumber of ${identityNo}`)
                            throw error;
                        }

                         // set a new user data in Redis with the user identity number as key for future caching
                         client.set(user.accountNumber, JSON.stringify(user));

                         // return the response
                         resolve(user);
                    }
                })
            }catch(error){  // if error occurred, return the error response
                reject(error)
            }
        })
    }
}

module.exports = anggie;