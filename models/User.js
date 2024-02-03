/*
    User will store username, email, password & add creation and update date
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['regular', 'seller'],
        required: true,
    },
},
{ 
    timestamps: true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
