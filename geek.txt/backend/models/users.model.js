// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { isEmail } = require("validator");

const userSchema = new Schema({
    // Features.
    geekID: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    email: { // Primary key.
        type: String,
        unique: true,
        // validate: [isEmail, "Invalid Email"]
    },
    password: {
        type: String,
        required: true,
    },
    Credit_cards: [
        {
            name: { type: String },
            Number: { type: Number },
            ExpDate: { type: Date },
            CSV: { type: Number },
            Address: { type: String }
        }
    ],
    ShippingAddress: [
        {
            Address: {
                name: {type: String}, 
                street: {type: String},
                state: {type: String},
                city: {type: String},
                zipcode: {type: Number},
            }
        }
    ],
    WishList: [
        {
            List: { type: mongoose.Schema.Types.ObjectId, ref: 'WishList' },
            // max: 3 // TODO verify this.
        }
    ]
}, {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
});


// Export userSchema as User.
const User = mongoose.model('User', userSchema)
module.exports = User;