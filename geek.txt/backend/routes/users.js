// API routes related to the User model.
//var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let Users = require('../models/users.model');
let EmailValidator = require('../utils/validators')
const router = require('express').Router();

// Handles incomming GET requests to url/users/ .
router.route('/').get((req, res) => {
    // List of all users in the DB.
    Users.find()
        // If promise return then return all users as JSON.
        .then(users => res.json(users))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
});

// Handles incomming POST requests to users/login.
router.route('/login').post((req, res) => {

    /*
    Sample POST request:
        "credential" : "testUser",
        "password" : "User"
    */
    // Credential can be an email or a geek ID.
    const credential = req.body.email;
    const password = req.body.password;

    // Login by email.
    if (EmailValidator.validateEmail(credential)) {
        Users.findOne({ email: credential })
            .then(user => {
                if (!user) { return res.status(400).json('Invalid Credentials') }
                bcrypt.compare(password, user.password, function (err, valid) {
                    if (!valid) { return res.status(400).json('Invalid Credentials') }
                    return res.json(user)
                });
            })
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        return res.status(400).json("Invalid Email");
    }
    // else {
    //     console.log("id place")
    //     // Look user by GeekID.
    //     Users.findOne({geekID: credential}) 
    //     // If promise return then return all users as JSON.
    //     .then(user => {
    //         if(!user){
    //             return res.status(400).json('Invalid Credentials')
    //         }
    //         result = bcrypt.compareSync(password, user.password);
    //         if(result){
    //             return res.json(user)
    //         }
    //         else{
    //             return res.status(400).json('Invalid Credentials')
    //         }
    //     })
    //     // If there is an error return status 400 with Error.   check if password  matches hashed in DB, return error if not
    //     .catch(err => res.status(400).json('Error: ' + err))
    // }  
});

// Handle post request to add new user.
router.route('/add').post((req, res) => {
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

    if (email !== /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) return res.status(400).json("Invalid Email");
    if (password !== password2) return res.status(400).json("Passwords do not match");
    if (password !== /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) return res.status(400).json("Password must be between 6-20 characters, contain an uppercase letter, lowercase letter, and a number");

    bcrypt.hash(password, saltRounds, function (err, hash) { // });

        if (err) return res.status(400);
        // password = hash;
        // Create new user using the User model.
        const newUser = new Users({
            geekID,
            firstName,
            lastName,
            email,
            password: hash,
            nickname,
            creditCard,
            Address,
            // wishList
        });

        // Save new user to database. 
        newUser.save()
            .then(() => res.json('User Added Successfully.'))
            .catch(err => res.status(400).json('Error: ' + err))
    });

});

router.route('/addcard').post((req, res) => {

    /* 
    Sample POST request body:
    {
        "Creator": "601d7b8e7e0708245caabc48"
        "cardName": "Card 1",
        "nameOnCard": "Name User",
        "number": 0123 4567 8910,
        "expDate":03/21,
        "CVV":123
        "address" : 1234 Lane Dr
    }
    */

    const cardOwner = mongoose.Types.ObjectId(req.body.cardOwner);
    const cardName = req.body.cardName;
    const nameOnCard = req.body.nameOnCard;
    const number = req.body.number;
    const expDate = req.body.expDate;
    const CVV = req.body.CVV;
    const address = req.body.address;

    Users.updateOne(
        { _id: cardOwner },
        {
            $push: {
                creditCard: {
                    cardName,
                    nameOnCard,
                    number,
                    expDate,
                    CVV,
                    address
                }
            }
        }

        //check for expDate validity

    ).then(res.status(200).json('Added new address Successfully'))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))

});

router.route('/addaddress').post((req, res) => {

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
     *      "Owner": "60392b329b00b252eaa3b3b8",
     *      "geekID" : "Geek123",
            "firstName" : "User",
            "lastName" : "Test",
            "email": "usertest@test.com",
            "password" : "123password",
            "password2" : "123password",
            "nickname" : "Booklover1",
     *      
     *  }
     */

    const Owner = mongoose.Types.ObjectId(req.body.Owner);
    const geekID = req.body.geekId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const nickname = req.body.nickname;

    Users.findOneAndUpdate(
        {
            Owner: Owner,
        },
        {
            geekID: geekID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2,
            nickname: nickname
        }

        //if (email !== /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) return res.status(400).json("Invalid Email");
        //if (password !== password2) return res.status(400).json("Passwords do not match");
        //if (password !== /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) return res.status(400).json("Password must be between 6-20 characters, contain an uppercase letter, lowercase letter, and a number");

        //rehash password

    ).then(updatedProf => res.status(200).json('Profile Updated' + updatedProf))
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
            "number": 0123 4567 8910,
            "expDate":03/21,
            "CVV":123
            "address" : 123 Lane Dr
     *      
     *  }
     */

    const Owner = mongoose.Types.ObjectId(req.body.Owner);
    const cardName = req.body.cardName;
    const cardID = mongoose.Types.ObjectId(req.body.cardID);
    const nameOnCard = req.body.nameOnCard;
    const number = req.body.number;
    const expDate = req.body.expDate;
    const CVV = req.body.CVV;
    const address = req.body.address;

    // Get the user by its _id.
    Users.where("_id").equals(Owner)
        .then(user => {
            let cards = user.creditCard
            cards.forEach(card => {
                if (card._id === cardID) {
                    // Update.
                    card.cardName = cardName
                    card.nameOnCard = nameOnCard
                    card.number = number
                    card.expDate = expDate
                    card.CVV = CVV
                    card.address = address;
                }
            });
            // Update.
            Users.findOneAndUpdate(
                {
                    _id: Owner,
                },
                {
                    creditCard: cards
                })
                .then(updatedCard => res.status(200).json('Credit Card Updated' + updatedCard))
                .catch(err => res.status(400).json('Error: ' + err))
        })

        //check for expDate validity

        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
});

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


// Export all User routes in this routers object.
module.exports = router