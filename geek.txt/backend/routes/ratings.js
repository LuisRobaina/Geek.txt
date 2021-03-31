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

    Books.count({ _id: BookID }, function (err, count) {
        if (count == 0) {
            // Book does not exists.
            res.status(400).json('Error: Invalid Book ID.')
        }
    });
    Ratings.findOneAndUpdate(
        { 
            Creator: Creator, 
            BookID: BookID 
        },
        { Rating: Rating },
        {
            upsert: true
        }
    ).then(newRating => res.status(200).json('Rating added' + newRating))
        .catch(err => res.status(400).json('Error: ' + err))
});

// Handles incomming GET requests to url/rate/getAvg .
router.route('/getAvg/:BookID').get((req, res) => {
    const bookID = req.params.BookID
    Ratings.aggregate([
        {
            $group: {
                _id: '$BookID',
                avg: { $avg: "$Rating" },
            }
        }
    ]).then(ratings => {
        var avg = 0
        ratings.forEach(rating => {
            if (rating._id == bookID) {
                avg = rating.avg
            }
        });
        res.status(200).json({avg: avg});
    }).catch(err => res.status(400).json('Error: ' + err));
});

// Export all Rating routes in this routers object.
module.exports = router

