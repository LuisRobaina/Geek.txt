// This is a base for the user model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Features.
    nickname: {
        type: String,
        default: 'Anonymous'
    },
    geekID: {
        type: String,
        unique: true
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    creditCard: [
        {   
            cardName: {type: String},
            nameOnCard: { type: String },
            number: { type: Number }, //must be 16 long
            expDate: { type: Date },    //date?
            CVV: { type: Number }, //must be 3 long
            address: { type: String }
        }
    ],
    Address: [
        {
            addressName: {type: String}, 
            street: {type: String},
            state: {type: String},
            city: {type: String},
            zipcode: {type: Number},
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