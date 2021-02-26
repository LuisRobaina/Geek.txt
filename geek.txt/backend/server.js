const express = require('express');
const cors = require('cors');

// Mongoose: Allows us to connect to MongoDB database.
const mongoose = require('mongoose');

// Require env variables.
require('dotenv').config();

// Create express server
const app = express()
// Use the port sepecified in env or use port 5000
const port = process.env.PORT || 5000

// Cors middleware
app.use(cors());
// Json middleware.
app.use(express.json());

// Load ATLAS_URI environment variable.
const uri = process.env.ATLAS_URI

// Connect to the remote database.
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Geek.txt MongoDB is connected");
});


// Handle request to root url.
app.get('/', function(req, res){
    res.send("Welcome to Geek.txt backend built with NodeJS+Express.")
})

/*
 Require and use the routes. 
 TODO: Add all routers here.
*/
const usersRouter =require('./routes/users');
const bookRouter = require('./routes/books');
const commentsRouter = require('./routes/comments');
const ratingsRouter = require('./routes/ratings');

// If a user browsers our API to the /users it will load all the
// users router in routers/users.js.
app.use('/users', usersRouter);
app.use('/books', bookRouter);
app.use('/comments', commentsRouter);
app.use('/rate', ratingsRouter);

/*
 Start the server.
*/
 app.listen(port , () => {
    console.log(`Geek.txt server is running on port: ${port}`);
});

