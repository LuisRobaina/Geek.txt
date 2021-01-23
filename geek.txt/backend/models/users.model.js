// This is a base for the user model.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Features
    username: {
        // Validations for username.
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 // At least 3 chars for usernames.
    },
    // password ??

    // When did this  user joined Geek.txt
    date_joined : {
        type: Date,
        required: true
    },
    // More stuff ??
    
},  {
    // Create a timestamps for latest creation or modification of document.
    timestamps: true,
});

// Export userSchema as User.
const User = mongoose.model('User', userSchema)
module.exports = User;