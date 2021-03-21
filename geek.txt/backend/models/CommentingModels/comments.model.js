
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema= new Schema({
    
    Creator: { // References to a User.
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    CreatorName: {
        type: String,
        required: true
    },
    Anonymous: {
        type: Boolean,
        required: true
    },
    BookID: { // References to a book.
        type: mongoose.Schema.Types.ObjectId, ref: 'Book'
    },
    Text: {
        type: String,
        required: false
    },
    Replies: [
        // Each reply has a creator and a text.
        { 
            Creator: { // References a User.
                type: mongoose.Schema.Types.ObjectId, ref: 'User',
                required: true
            },
            Text: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    // Create a timestamps for the creation and modification of this document.
    timestamps: true,
});


// Export CommentsSchema as Comments
const Comments = mongoose.model('Comments', CommentsSchema)
module.exports = Comments;