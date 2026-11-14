
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true,
        trim: true
    },

    login: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    }

}, {
    timestamps: true
});

// نعملو Model انطلاقا من Schema
module.exports = mongoose.model('User', userSchema);