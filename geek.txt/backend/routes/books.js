const router = require('express').Router();
const bookController = require('../controllers/bookController')


// Current Route is localhost:5000/books
// Display the routes
router.get('/:id', bookController.getABook)
router.get('/', bookController.getBooks)

module.exports = router