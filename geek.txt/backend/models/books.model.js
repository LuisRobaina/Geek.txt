const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // Features
    genre: {
        type: String,
        required: true,
        trim: true // Remove whitespaces.
    },
    coverUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    authorBio: {
        type: String
        // TODO: Make required.
    },
    description: {
        type: String,
        required: true
    },
    publisher: {
        // TODO: Fix embedding.
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    soldCount: {
        type: Number
    },
    publisherDate: Date
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

// Export userSchema as User.
module.exports = mongoose.model('Books', bookSchema);
