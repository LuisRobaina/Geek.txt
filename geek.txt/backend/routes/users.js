// API routes related to the User model.
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
let { validateEmail, registerValidate, updateValidate, loginValidate, expirationValidate } = require("../utils/validators");
const router = require("express").Router();
const SALT_ROUNDS = 6;

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

  let { errors, isValid } = loginValidate(req.body);
  if (!isValid) return res.json({ errors });

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
  const expYear = req.body.expYear;
  const expMonth = req.body.expMonth;
  const CVV = req.body.CVV;
  const Address = req.body.address;

  let { errors, isValid } = expirationValidate(expMonth, expYear);
  if (!isValid) return res.status(400).json("Invalid card, check your inputs");

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

  ).then(res.status(200).json('Added new card Successfully'))
    .catch(err => res.status(400).json('Error: ' + err))
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

  Users.updateOne(
    { _id: addressOwner },
    {
      $push: {
        addresses: {
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


  const Owner = mongoose.Types.ObjectId(req.body.Owner);
  const cardName = req.body.cardName;
  const cardID = mongoose.Types.ObjectId(req.body.cardID);
  const nameOnCard = req.body.nameOnCard;
  const number = req.body.number;
  const expYear = req.body.expYear;
  const expMonth = req.body.expMonth;
  const CVV = req.body.CVV;
  const address = req.body.address;

  let { errors, isValid } = expirationValidate(expMonth, expYear);
  if (!isValid) return res.json({ errors });

  // Get the user by its _id.
  Users.findOne({ _id: Owner })
    .then(user => {
      let cards = user.creditCards
      cards.forEach(card => {
        let ID = String(card._id)
        if (ID === String(cardID)) { //giving error for ==, make sure === works
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
   *      "addressOwner": "60392b329b00b252eaa3b3b8",
   *      "addressID" : "60392b329b00b252eaa3b3b9",
   *      "addressName": "Home Address",
          "street": "123 Somewhere Lane",
          "state": "FL"
          "city": "Miami",
          "zipcode": "33199"
   *      
   *  }
   */

  const addressOwner = mongoose.Types.ObjectId(req.body.addressOwner);
  const addressID = mongoose.Types.ObjectId(req.body.addressID);
  const addressName = req.body.addressName;
  const street = req.body.street;
  const state = req.body.state;
  const city = req.body.city;
  const zipcode = req.body.zipcode;

  Users.findOne({ _id: addressOwner })
    .then(user => {
      let Addresses = user.addresses
      Addresses.forEach(address => {
        let ID = String(address._id)
        if (ID === String(addressID)) {
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
          _id: addressOwner,
        },
        {
          addresses: Addresses
        })
        .then(updatedCard => res.status(200).json('Address Updated' + updatedCard))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/getAddresses/:UserID').get((req, res) => {
  Users.findOne({ _id: req.params.UserID }).then(doc => {
    console.log(doc)
    res.status(200).json(doc.addresses)
  })
    .catch(err => res.json(err))
})



router.route('/editpassword').post((req, res) => {

  /**
   * Sample POST request body:
   *  {
          "userID",
          "oldpassword": 
          "newpassword"
   *      
   *  }
   */

  const userID = mongoose.Types.ObjectId(req.body.userID);
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;

  Users.findOne({ _id: userID }).then(user => {

    bcrypt.compare(oldpassword, user.password, function (err, valid) {
      if (!valid) {
        return res.status(401).json("Invalid Credentials");
      }
      else {
        bcrypt.hash(newpassword, SALT_ROUNDS, function (err, hash) {
          if (err) return res.status(401).json("Something went wrong!")
          // Update.
          Users.findOneAndUpdate(
            {
              _id: userID
            },
            {
              password: hash
            })
            .then(updated => res.status(200).json('Password updated' + updated))
            .catch(err => res.status(400).json('Error: ' + err))
        })
      }
    })
  })
});


// <------ Helper Functions ----->

function generateJWT(user) {
  return jwt.sign({ user }, process.env.SECERT, { expiresIn: "2h" });
}

// Export all User routes in this routers object.
module.exports = router;
