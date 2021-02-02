// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    // Features
    Owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    Items: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Books'
        }
    ],
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

const wishLists = mongoose.model('WishLists', wishListSchema)
module.exports = wishLists;