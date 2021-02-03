const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // Features
    Genre: {
        type: String,
        required: true,
        trim: true, // Remove whitespaces.
    },
    Cover: {
        url: String,
        required: true
    },
    Title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    AuthorName: {
        type: String,
        required: true,
        trim: true,
    },
    AuthorBio: {
        type: String
        // TODO: Make required.
    },
    Description: {
        type: String,
        required: true
    },

    // Publisher: {
    //     // TODO: Fix embedding.
    //     {
    //         name: String,
    //         date: Date
    //     }
    // },

    Rating: {
        type: Number,
        max: 5,
        min: 0,
        default: 5
    },
    Price: {
        type: Number,
        required: true
    },
    Sold_Count: {
        type: Number
    }
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

// Instance method to get initials of a user.
// bookSchema.methods.getSoldCount = function () {
//     return this.Sold_Count
// }

// Export userSchema as User.
const Books = mongoose.model('Books', bookSchema)
module.exports = Books;