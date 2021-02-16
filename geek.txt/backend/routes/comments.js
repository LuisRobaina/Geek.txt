const mongoose = require('mongoose');
let Books = require('../models/books.model')

const router = require('express').Router();
let Comment = require('../models/CommentingModels/comments.model')

// Handles incomming GET requests to url/comments/ .
router.route('/').get((req, res) => {
    // Route to get all the comments for a given book.

    /* 
    Sample request body:
    {
        "BookID": "601d7b8e7e0708245caabc48"
    }
    */

    Comment.where("BookID").equals(req.body.BookID)
        // If promise return then return all comments as JSON.
        .then(comments => res.json(comments))
        // If there is an error return status 400 with Error.
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    // Handles POST request to add new comment to a given book.

    /* 
    Sample POST request body:
    {
        "Creator": "601d7b8e7e0708245caabc48",
        "BookID": "601d7b8e7e0708245caabc48",
        "Text": "This book is amazing!"
    }
    */
   
    const Creator = mongoose.Types.ObjectId(req.body.Creator);
    const BookID = mongoose.Types.ObjectId(req.body.BookID);
    
    Books.count({_id : BookID}, function (err, count) {
        if(count == 0){
            // Book does not exists
            res.status(400).json('Error: Invalid Book ID.')
        }
    });

    const Text = req.body.Text;
    const Replies = [];
    
    // Create new comment using the Comments model.
    const newComment = new Comment({
        Creator,
        BookID,
        Text,
        Replies
    });

    // Save new user to database. 
    newComment.save()
        .then(() => res.status(200).json('Comment Added Successfully.'))
        .catch(err => res.status(400).json('Error: ' + err))
});


router.route('/reply').post((req, res) => {
    // Handles POST request to add new reply for a given comment.
    /* 
    Sample POST request body
    {
        "OriginalCommentID": "602abe0c22ebdf09e077f33f",
        "Creator": "601d7b8e7e0708245caabc48",
        "Text": "This book is amazing!"
    }
    */
   
    const OriginalCommentID = req.body.OriginalCommentID;
    const Creator = req.body.Creator;
    const Text = req.body.Text;
    
    Comment.updateOne(
        {_id: OriginalCommentID},
        {$push: {
            Replies: {
                Creator,
                Text
            }
        }}
    ).then(res.status(200).json('Replied Successfully'))
    // If there is an error return status 400 with Error.
    .catch(err => res.status(400).json('Error: ' + err))

});

// Export all Comments routes in this routers object.
module.exports = router