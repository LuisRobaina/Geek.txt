// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Features
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    username: {
        // Validations for username.
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 // At least 3 chars for usernames.
    },
    // password ??
    password: {
        // Validations for username.
        type: String,
        required: true,
        trim: true,
        minlength: 5 // At least 5 chars for passwords.
    },
    // More stuff ??
},  {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});

// Instance method to get initials of a user.
userSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0]
  }

// Export userSchema as User.
const User = mongoose.model('User', userSchema)
module.exports = User;