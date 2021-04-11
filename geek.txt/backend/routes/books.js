const router = require('express').Router();
const bookController = require('../controllers/bookController')
let Purchases = require('../models/purchases.model')
let Books = require('../models/books.model')
const mongoose = require('mongoose');

// Current Route is localhost:5000/books
// Display the routes.
router.get('/:id', bookController.getABook)
router.get('/', bookController.getBooks)

// Handles incomming GET requests to url/comments/ .
router.route('/buy').post((req, res) => {
    /**
     * Route to buy a book.
    */

    /* 
    Sample request body:
    {
        "UserID": "601d7b8e7e0708245caabc48",
        "BookID": "601d7b8e7e0708245caabc48",
        "Title": "",
        "CoverURL": ""
    }
    */
   const User = mongoose.Types.ObjectId(req.body.UserID);
   const Book = mongoose.Types.ObjectId(req.body.BookID);
   const Title =req.body.Title;
   const CoverURL = req.body.CoverURL;

   const PurchaseRecord = new Purchases({
       UserID:  User,
       BookID: Book,
       Title: Title,
       CoverURL: CoverURL
   });

   PurchaseRecord.save()
   .then( () => res.status(200).json("Added transaction: "))
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))

});
module.exports = router