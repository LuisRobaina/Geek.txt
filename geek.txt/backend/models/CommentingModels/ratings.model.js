const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({
    
    Creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    NickName: {
        type: String,
        default: "Anonymous"
    },
    BookID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Book',
        required: true,
    },
    Rating: {
        type: Number,
        required: true
    }
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

// Export RatingsSchema as Ratings.
const Ratings = mongoose.model('Ratings', RatingsSchema);
module.exports = Ratings;