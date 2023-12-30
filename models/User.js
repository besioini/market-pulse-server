const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        // index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // index: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{ 
    timestamps: true, 
    versionKey: false 
});

const User = mongoose.model('User', userSchema);

module.exports = User;