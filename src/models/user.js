const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const user = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        refreshToken: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', user);
