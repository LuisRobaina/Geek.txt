// This is a base for the user model.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;
// const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    geekID: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      // Primary key.
      type: String,
      unique: true,
      // validate: [isEmail, "Invalid Email"]
      //match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i email validation???
    },
    password: {
      type: String,
      required: true,
      //match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,  alphanumeric
      //minlength: 8 //must be atleast 8 characters long
    },
    creditCards: [
      {
        cardName: { type: String },
        nameOnCard: { type: String },
        number: { type: Number }, //must be 16 long
        expDate: { type: Date }, //date?
        CVV: { type: Number }, //must be 3 long
        Address: { type: String },
      },
    ],
    Addresses: [
      {
        addressName: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        zipcode: { type: Number },
      },
    ],

    WishList: [
      {
        List: { type: mongoose.Schema.Types.ObjectId, ref: "WishList" },
        // max: 3 // TODO verify this.
      },
    ],
  },
  {
    // Create a timestamps for the creation and modification of document.
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  // Hash password before saving to DB
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

// Export userSchema
module.exports = mongoose.model("User", userSchema);
