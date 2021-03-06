// API routes related to the User model.

const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
let Users = require('../models/users.model');
let EmailValidator = require('./utils/validators')
   
// Handles incomming GET requests to users/.
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
    const [credential, password] = req.body;
    
    if(EmailValidator.validateEmail(credential)){
        // Lookup user by email.
        Users.find({email: credential}) 
        // If promise return then return all users as JSON.     check if password  matches hashed in DB, return error if not
        .then(user => res.json(user))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
    }
    else {
        // Look user by GeekID.
        Users.find({geekID: credential}) 
        // If promise return then return all users as JSON.
        .then(user => res.json(user))
        // If there is an error return status 400 with Error.   check if password  matches hashed in DB, return error if not
        .catch(err => res.status(400).json('Error: ' + err))
    }  
});

// Handle post request to add new user.
router.route('/add').post((req, res) => {  
    /*
    Sample POST request:
        "geekID" : "testUser",
        "firstName" : "User",
        "lastName" : "Test",
        "email": "testuser@test.com",
        "password" : "ABCD3F5"
    */

    const geekID = req.body.geekID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const creditCard = []
    const shippingAddress = []
    const wishList = []

    bcrypt.hash(password, saltRounds, function(err, hash) {

    if(err) return res.status(400);

    // Create new user using the User model.
    const newUser = new Users({
        geekID,
        firstName,
        lastName,
        email,
        password,
        creditCard,
        shippingAddress,
        wishList
    });

    // Save new user to database. 
    newUser.save()
        .then(() => res.json('User Added Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err))

    });

});

// Export all User routes in this routers object.
module.exports = router