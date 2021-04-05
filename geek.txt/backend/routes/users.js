// API routes related to the User model.
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
let { EmailValidator, registerValidate } = require("../utils/validators");
const router = require("express").Router();

// Handles incomming GET requests to url/users/ .
router.route("/").get((req, res) => {
  // List of all users in the DB.
  Users.find()
    // If promise return then return all users as JSON.
    .then((users) => res.json(users))
    // If there is an error return status 400 with Error.
    .catch((err) => res.status(400).json("Error: " + err));
});

// Handles incomming POST requests to users/login.
router.route("/login").post((req, res) => {
  /*
    Sample POST request:
        "credential" : "testUser",
        "password" : "User"
    */
  // Credential can be an email or a geek ID.
  const credential = req.body.credential;
  const password = req.body.password;

  // Login by email.
  if (EmailValidator.validateEmail(credential)) {
    Users.findOne({ email: credential })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ errors: { form: "Invalid Credentials" } });
        }
        bcrypt.compare(password, user.password, function (err, valid) {
          if (!valid) {
            return res
              .status(401)
              .json({ errors: { form: "Invalid Credentials" } });
          }
          const token = generateJWT(user);
          return res.json(token);
        });
      })
      .catch((err) =>
        res.status(401).json({ errors: { form: "Invalid Credentials" } })
      );
  } else {
    // Look user by GeekID.
    Users.findOne({ geekID: credential })
      // If promise return then return all users as JSON.
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ errors: { form: "Invalid Credentials" } });
        }
        bcrypt.compare(password, user.password, function (err, valid) {
          if (!valid) return res.status(401).json("Invalid Credentials");
          res.json(generateJWT(user));
        });
      })
      // If there is an error return status 400 with Error. check if password  matches hashed in DB, return error if not
      .catch((err) =>
        res.status(401).json({ errors: { form: "Something went wrong!" } })
      );
  }
});

// Handle post request to add new user.
router.route("/add").post((req, res) => {
  /*
    Sample POST request:
        "geekID" : "testUser",
        "firstName" : "User",
        "lastName" : "Test",
        "email": "testuser@test.com",
        "password" : "ABCD3F5",
        "nickname" : "User",
        "creditCard" : [],
        "Address" : [],
    */

  const geekID = req.body.geekId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const nickname = req.body.nickname;
  const creditCard = [];
  const Address = [];
  // const wishList = [];
  console.log("made it in here");
  let { errors, isValid } = registerValidate(req.body);
  if (!isValid) return res.json({ errors });

  // Create new user using the User model.
  const newUser = {
    geekID,
    firstName,
    lastName,
    email,
    password,
    nickname,
    creditCard,
    Address,
    // wishList
  };

  // Save new user to database.
  Users.create(newUser, function (err, doc) {
    if (err) return res.status(401).json("Unable to create user"); // need better error response
    const token = generateJWT(doc);
    return res.json(token);
  });
});

router.route("/addcard").post((req, res) => {
  /* 
    Sample POST request body:
    {
        "cardOwner": "601d7b8e7e0708245caabc48"
        "cardName": "Card 1",
        "nameOnCard": "Logan Simijoski",
        "number": 0123 4567 8910
        "expDate":03/21
        "CVV":123
    }
    */

  const cardOwner = mongoose.Types.ObjectId(req.body.cardOwner);
  const cardName = req.body.cardName;
  const nameOnCard = req.body.nameOnCard;
  const number = req.body.number;
  const expDate = req.body.expDate;
  const CVV = req.body.CVV;

  // Create new comment using the Comments model.
  const newCard = new Users.creditCard({
    cardOwner,
    cardName,
    nameOnCard,
    number,
    expDate,
    CVV,
  });

  // Save new card to database.
  newCard
    .save()
    .then(() => res.status(200).json("Card Added Successfully."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addaddress").post((req, res) => {
  /* 
    Sample POST request body:
    {
        "addressOwner": "601d7b8e7e0708245caabc48"
        "addressName": "Address 1", 
        "street": "123 Something Lane",
        "state": "FL", //make arraylist of states?
        "city": "Miami",
        "zipcode": "33199" 
    }
    */

  const addressOwner = mongoose.Types.ObjectId(req.body.addressOwner);
  const addressName = req.body.addressName;
  const street = req.body.street;
  const state = req.body.state;
  const city = req.body.city;
  const zipcode = req.body.zipcode;

  // Create new comment using the Comments model.
  const newAddress = new Users.Address({
    addressOwner,
    addressName,
    street,
    state,
    city,
    zipcode,
  });

  // Save new address to database.
  newAddress
    .save()
    .then(() => res.status(200).json("Address Added Successfully."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// <------ Helper Functions ----->

function generateJWT(user) {
  return jwt.sign({ user }, process.env.SECERT, { expiresIn: "2h" });
}

// Export all User routes in this routers object.
module.exports = router;
