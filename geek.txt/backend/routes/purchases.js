const mongoose = require('mongoose');
const router = require('express').Router();
let Purchases = require('../models/purchases.model')

// Handles incomming GET requests to url/comments/ .
router.route('/:UserID').get((req, res) => {
    Purchases.where("UserID").equals(req.params.UserID)
        .then(books => res.json(books))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
});

// Handles incomming GET requests to url/comments/ .
router.route('/check').post((req, res) => {
    /*
    {
        "UserID",
        "BookID"
    }
    */
    const User = mongoose.Types.ObjectId(req.body.UserID);
    const Book = mongoose.Types.ObjectId(req.body.BookID);

    Purchases.find({
        UserID: User,
        BookID: Book
    })
    .then(record => res.json(record))
        // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))
});
module.exports = router

