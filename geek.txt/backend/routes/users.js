/*
   API routes related to the User model.
*/

const router = require('express').Router();
const bcrypt = require('bcrypt');
let Users = require('../models/users.model');


const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt.
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash password.
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }
    // Return null if error
    return null;
};

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
router.route('/login').get((req, res) => {
    // List of all users in the DB.
    Users.find()
        // If promise return then return all users as JSON.
        .then(users => res.json(users))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
});

// Handle post request to add new user.
router.route('/add').post((req, res) => {
    
    /**
    Sample POST request:
        "geekID" : "testUser",
        "firstName" : "User",
        "lastName" : "Test",
        "email": "testuser@test.com",
        "password" : "ABCD3F5", 
        "credit_cards" : [],
        "shippingAddress" : [],
        "wishList" : []
    */

    const geekID = req.body.geekID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    password = req.body.password;
    // Generate Salt
    const salt = bcrypt.genSaltSync(10);
    // Hash Password
    password = bcrypt.hashSync(password, salt);     
    const creditCard = []
    const shippingAddress = []
    const wishList = []
    
    // Create new user using the User model.
    // User model validations.
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

// Export all User routes in this routers object.
module.exports = router