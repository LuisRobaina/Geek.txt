// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsRatingsSchema = new Schema({
    // Features
    Creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    Book: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Book'
    },
    Ratings: {
        type: Number,
    },
    Text: {
        type: String,
        required: true
    },
    Replies: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'CommentsRatings'
        }
    ]
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

// Export userSchema as User.
const CommentsRatings = mongoose.model('CommentsRatings', CommentsRatingsSchema)
module.exports = CommentsRatings;