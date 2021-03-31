const router = require('express').Router();
let wishList = require('../models/wishList.model')
 const mongoose = require('mongoose');

// Handles incomming GET requests to url/wishlist/ .
router.route('/').get((req, res) => {
    // List of all wishLists in the DB
    wishList.find()
        // If promise return then return all wishlists as JSON.
        .then(wishList => res.json(wishList))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    // Handle post request to add new wishList.
    /* 
    Sample request body
    {
        "user": "defaultOwner",
        "name": "SampleName",
        "hierarchy":"Primary",
        "items": "Books"
        
        //I am not sure about this one still
    }
    */

    const user = mongoose.Schema.Types.ObjectId(req.body.user);
    const name =  req.body.name;
    const hierarchy = req.body.hierarchy;
    const items = mongoose.Schema.Types.ObjectId(req.body.items);
    

    // Create new wishlist using the wishlist model.
    // wishlist model validations.
    const newwishList = new wishList({
        user,
        name,
        hierarchy,
        items,
    });

    // Save new wishList to database 
    newwishList.save()
        .then(() => res.json('Wishlist Added Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// Export all User routes in this routers object.
module.exports = router