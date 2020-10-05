const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Integer,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    identityNumber: {
        type: Integer,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);