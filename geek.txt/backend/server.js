const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

// Mongoose: Allows us to connect to MongoDB database.
const mongoose = require("mongoose");

// Require env variables.
require("dotenv").config();

// Create express server
const app = express();
// Use the port sepecified in env or use port 5000
const port = process.env.PORT || 5000;

// Cors middleware
app.use(cors());
// Json middleware.
app.use(express.json());

// Load ATLAS_URI environment variable.
const uri = process.env.ATLAS_URI;

// Connect to the remote database.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Geek.txt MongoDB is connected");

  const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true,
  });

  const commentsCollection = connection.collection("comments");
  const bookCollection = connection.collection("books");
  const changeStream = bookCollection.watch();
  const commentStream = commentsCollection.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "update") {
      const bookData = await bookCollection.findOne({
        _id: change.documentKey._id,
      });
      pusher.trigger("books", "updated-rating", bookData);
    }
  });

  commentStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("comments", "inserted-comment", change.fullDocument);
    }
  });
});

// Handle request to root url.
app.get("/", function (req, res) {
  res.send("Welcome to Geek.txt backend built with NodeJS+Express.");
});

/*
 Require and use the routes. 
 TODO: Add all routers here.
*/
const usersRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const commentsRouter = require("./routes/comments");
const ratingsRouter = require("./routes/ratings");
const wishListRouter = require("./routes/wishList");
const purchaseRouter = require("./routes/purchases");
const cartRouter = require("./routes/shopcart");

// If a user browsers our API to the /users it will load all the
// users router in routers/users.js.
app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/comments", commentsRouter);
app.use("/rate", ratingsRouter);
app.use("/wishList", wishListRouter);
app.use("/purchases", purchaseRouter);
app.use("/shopcart", cartRouter);

/*
 Start the server.
*/
app.listen(port, () => {
  console.log(`Geek.txt server is running on port: ${port}`);
});
