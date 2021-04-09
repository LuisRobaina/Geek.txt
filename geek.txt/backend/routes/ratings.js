const mongoose = require("mongoose");
let Books = require("../models/books.model");
const router = require("express").Router();
let Ratings = require("../models/CommentingModels/ratings.model");

// Handles incomming POST requests to url/rate/add .
router.route("/add").post((req, res) => {
  /**
   * Sample POST request body:
   *  {
   *      "Creator": "60392b329b00b252eaa3b3b8",
   *      "NickName": not required, defaults to annonymous.
   *      "BookID": "601d7b8e7e0708245caabc48",
   *      "Rating": 5
   *  }
   */

  const Creator = mongoose.Types.ObjectId(req.body.Creator);
  const BookID = mongoose.Types.ObjectId(req.body.BookID);

  const Rating = req.body.Rating;
  let Nick = req.body.NickName;
  let avg = 0;

  if (Nick === undefined) {
    Nick = "Anonymous";
  }
  Books.count({ _id: BookID }, function (err, count) {
    if (count === 0) {
      // Book does not exists.
      res.status(400).json("Error: Invalid Book ID.");
    }
  });
  Ratings.findOneAndUpdate(
    {
      Creator: Creator,
      BookID: BookID,
    },
    {
      NickName: Nick,
      Rating: Rating,
    },
    {
      upsert: true,
    }
  )
    .then((newRating) => {
      Ratings.aggregate([
        {
          $group: {
            _id: "$BookID",
            avg: { $avg: "$Rating" },
          },
        },
      ]).then((ratings) => {
        ratings.forEach((doc) => {
          if (doc._id == req.body.BookID) {
            avg = doc.avg;
          }
        });
        Books.findOneAndUpdate({ _id: BookID }, { rating: avg }).then((doc) =>
          res.status(200).json("Rating added (Prev)= " + newRating)
        );
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Handles incomming GET requests to url/rate/getAvg .
router.route("/getAvg/:BookID").get((req, res) => {
  const bookID = req.params.BookID;
  Ratings.aggregate([
    {
      $group: {
        _id: "$BookID",
        avg: { $avg: "$Rating" },
      },
    },
  ])
    .then((ratings) => {
      console.log(ratings);
      var avg = 0;
      ratings.forEach((rating) => {
        if (rating._id == bookID) {
          avg = rating.avg;
        }
      });
      console.log(avg, "this updated");
      res.status(200).json({ avg: avg });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get/:BookID").get((req, res) => {
  const bookID = mongoose.Types.ObjectId(req.params.BookID);
  Ratings.where("BookID")
    .equals(bookID)
    // If promise return then return all ratings as JSON.
    .then((ratings) => res.json(ratings))
    // If there is an error return status 400 with Error.
    .catch((err) => res.status(400).json("Error: " + err));
});

// Export all Rating routes in this routers object.
module.exports = router;
