const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const Product = new Schema(
    {
        productName: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        category: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', Product);
