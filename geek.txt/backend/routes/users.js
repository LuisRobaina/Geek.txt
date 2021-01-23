// API routes related to the User model.

const router = require('express').Router();
let User = require('../models/users.model')

// Route to get all users.

// Handles incomming GET requests to url/users/ .
router.route('/').get((req, res) => {
    // List of all users in the DB.
    User.find()
        // If promise return then return all users as JSON.
        .then(users => res.json(users))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: '+ err))
})

// Handle post request to add new user.
// Handles incomming post request to url/users/add 
router.route('/add').post((req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   const date_joined = Date.parse(req.body.date_joined);
   
   // Create new user using the User model.
   // User model validations.
   const  newUser = new User({
        username, 
        password,
        date_joined
    });
    // Save new user to database. 
    newUser.save()
        .then(() => res.json('User Added Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// Export all User routes in the routers object.
module.exports = router