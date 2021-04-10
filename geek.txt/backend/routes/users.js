// API routes related to the User model.
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
let { validateEmail, registerValidate, updateValidate } = require("../utils/validators");
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
  if (validateEmail(credential)) {
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
        "password2" : "ABCD3F5",
        "nickname" : "User",
        "creditCard" : [],
        "Address" : [],
    */
  const geekID = req.body.geekID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const creditCard = [];
  const Address = [];
  // const wishList = [];
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
    if (err)
      return res
        .status(401)
        .json({ errors: "Unable to create User. Try again" }); // need better error response
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
        "nameOnCard": "Name User",
        "number": 0123 4567 8910,
        "expYear":2022,
        "expMonth":7,
        "CVV":123,
        "address" : 1234 Lane Dr
    }
    */

  var today = new Date();
  var currMonth = today.getMonth();
  var currYear = today.getFullYear();

  const cardOwner = mongoose.Types.ObjectId(req.body.cardOwner);
  const cardName = req.body.cardName;
  const nameOnCard = req.body.nameOnCard;
  const number = req.body.number;
  const expYear = req.body.expYear;
  const expMonth = req.body.expMonth;
  const CVV = req.body.CVV;
  const Address = req.body.address;

  if (expYear < currYear) return res.status(400).json("Invalid Expiration Date");
  if (((expMonth - 1) < currMonth) && (expYear === currYear)) return res.status(400).json("Invalid Expiration Date");

  Users.updateOne(
    { _id: cardOwner },
    {
      $push: {
        creditCards: {
          cardName,
          nameOnCard,
          number,
          expMonth,
          expYear,
          CVV,
          Address
        }
      }
    }
    /*
    cardName: { type: String },
    nameOnCard: { type: String },
    number: { type: Number }, //must be 16 long
    expMonth: { type: Number },
    expYear: {type: Number},
    CVV: { type: Number }, //must be 3 long
    Address: { type: String },
    */
  ).then(res.status(200).json('Added new card Successfully'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route("/addaddress").post((req, res) => {
  /* 
    Sample POST request body:
    {
        "addressOwner": "60392b329b00b252eaa3b3b8"
        "addressName": "Address 1", 
        "street": "123 Something Lane",
        "state": "FL",
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

  Users.updateOne(
    { _id: addressOwner },
    {
      $push: {
        Address: {
          addressName,
          street,
          state,
          city,
          zipcode
        }
      }
    }
  ).then(res.status(200).json('Added new address Successfully'))
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/editprofile').post((req, res) => {
  /**
   * Sample POST request body:
   *  {
          "Owner": "60392b329b00b252eaa3b3b8",
          "geekID" : "Geek123",
          "firstName" : "User",
          "lastName" : "Test",
          "email": "usertest@test.com",
   *      
   *  }
   */

  const Owner = mongoose.Types.ObjectId(req.body.Owner);
  const geekID = req.body.geekID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let { errors, isValid } = updateValidate(req.body);
  if (!isValid) return res.json({ errors });

  Users.findOneAndUpdate(
    {
      _id: Owner,
    },
    {
      geekID: geekID,
      firstName: firstName,
      lastName: lastName,
      email: email
    }
  ).then(updatedProf => res.status(200).json('Profile Updated: ' + updatedProf))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/editcard').post((req, res) => {
  /**
   * Sample POST request body:
   *  {
   *      "Owner": "60392b329b00b252eaa3b3b8",
   *      "cardID": "60392b329b00b252eaa3b3b8",
   *      "cardName": "Card 1",
          "nameOnCard": "Name User",
          "number": "0123 4567 8910",
          "expYear":2022,
          "expMonth":7,
          "CVV":123,
          "address" : 123 Lane Dr
   *      
   *  }
   */

  var today = new Date();
  var currMonth = today.getMonth();
  var currYear = today.getFullYear();

  const Owner = mongoose.Types.ObjectId(req.body.Owner);
  const cardName = req.body.cardName;
  const cardID = mongoose.Types.ObjectId(req.body.cardID);
  const nameOnCard = req.body.nameOnCard;
  const number = req.body.number;
  const expYear = req.body.expYear;
  const expMonth = req.body.expMonth;
  const CVV = req.body.CVV;
  const address = req.body.address;

  if (expYear < currYear) return res.status(400).json("Invalid Expiration Date");
  if (((expMonth - 1) < currMonth) && (expYear === currYear)) return res.status(400).json("Invalid Expiration Date");


  
  // Get the user by its _id.
  Users.findOne({ _id: Owner })
    .then(user => {
      let cards = user.creditCards
      cards.forEach(card => {
        let ID = String(card._id)
        if (ID == String(cardID)) {
          // Update.
          console.log("Updated ", cardID)
          card.cardName = cardName
          card.nameOnCard = nameOnCard
          card.number = number
          card.expYear = expYear
          card.expMonth = expMonth
          card.CVV = CVV
          card.Address = address
        }
      });
      // Update.
      Users.findOneAndUpdate(
        {
          _id: Owner,
        },
        {
          creditCards: cards
        })
        .then(updatedCard => res.status(200).json('Credit Card Updated\n: ' + updatedCard))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/getCards/:UserID').get((req, res) => {
  Users.findOne({ _id: req.params.UserID }).then(doc => {
    console.log(doc)
    res.status(200).json(doc.creditCards)
  })
    .catch(err => res.json(err))
})

router.route('/editaddress').post((req, res) => {
  /**
   * Sample POST request body:
   *  {
   *      "Owner": "60392b329b00b252eaa3b3b8",
   *      "addressID" : "60392b329b00b252eaa3b3b9",
   *      "addressName": "Home Address",
          "street": "123 Somewhere Lane",
          "state": "FL"
          "city": "Miami",
          "zipcode": "33199"
   *      
   *  }
   */

  const Owner = mongoose.Types.ObjectId(req.body.Owner);
  const addressID = mongoose.Types.ObjectId(req.body.addressID);
  const addressName = req.body.addressName;
  const street = req.body.street;
  const state = req.body.state;
  const city = req.body.city;
  const zipcode = req.body.zipcode;

  Users.where("_id").equals(Owner)
    .then(user => {
      let addresses = user.Address
      addresses.forEach(address => {
        if (address._id === addressID) {
          // Update.
          address.addressName = addressName
          address.street = street
          address.state = state
          address.city = city
          address.zipcode = zipcode
        }
      });
      // Update.
      Users.findOneAndUpdate(
        {
          _id: Owner,
        },
        {
          Address: addresses
        })
        .then(updatedCard => res.status(200).json('Address Updated' + updatedCard))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))
});

// <------ Helper Functions ----->

function generateJWT(user) {
  return jwt.sign({ user }, process.env.SECERT, { expiresIn: "2h" });
}

// Export all User routes in this routers object.
module.exports = router;
