const mongoose = require('mongoose');
let Books = require('../models/books.model');
const router = require('express').Router();
let Ratings = require('../models/CommentingModels/ratings.model');

// Handles incomming POST requests to url/rate/add .
router.route('/add').post((req, res) => {
    /**
     * Sample POST request body:
     *  {
     *      "Creator": "60392b329b00b252eaa3b3b8",
     *      "BookID": "601d7b8e7e0708245caabc48",
     *      "Rating": 5
     *  }
     */

    const Creator = mongoose.Types.ObjectId(req.body.Creator);
    const BookID = mongoose.Types.ObjectId(req.body.BookID);
    const Rating = req.body.Rating;
    
    Books.count({_id : BookID}, function (err, count) {
        if(count == 0){
            // Book does not exists.
            res.status(400).json('Error: Invalid Book ID.')
        }
    });
    // TODO: Fix this...
    Ratings.findOneAndUpdate({
        query: {Creator: Creator, BookID: BookID},
        update: { $set: { Rating: Rating } },
    }, useFindAndModify=false)
    .then(prev => res.json(prev))
    .catch(err => res.status(400).json('Error: ' + err))

});

// Handles incomming GET requests to url/rate/getAvg .
router.route('/getAvg').get((req, res) => {
    /**
     * Sample GET request body:
     *  {
     *      "BookID": "601d7b8e7e0708245caabc48"
     *  }
     */
    const bookID = mongoose.Types.ObjectId(req.body.BookID);

    Ratings.aggregate([
        {
            $group: {
                _id: "$BookID",
                avg: { $avg: "$Rating"},
            }
        }
    ]).then(avg => res.json(avg))
     // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err));
});

// Export all Rating routes in this routers object.
module.exports = router

