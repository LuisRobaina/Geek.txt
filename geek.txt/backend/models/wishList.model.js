// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    // Features
    User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    Name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    Hierarchy: {
        type: Number,
        required: true,
        trim: true, 
        unique: true,
        1: true,
     //   2: false,
     //   3: false, 
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

const wishList = mongoose.model('wishList', wishListSchema)
module.exports = wishList;