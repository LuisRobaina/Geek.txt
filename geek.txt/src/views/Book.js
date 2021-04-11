import { useEffect, useState } from "react";
import React from 'react'
import {
  Container,
  Grid,
  Image,
  Rating,
  Icon,
  TextArea,
  Popup,
  Modal,
} from "semantic-ui-react";
import axios from "../config/axios";
import { Segment, Button, Message } from "semantic-ui-react";
import CommentsList from "../components/CommentsList";
import { Link } from "react-router-dom";
import pusher from "../config/pusher";

const Book = (props) => {
  const [bookData, setBookData] = useState({});
  const [commentsSet, setCommentsSet] = useState([]);
  const [NewCommentText, setNewComment] = useState("");
  const [rating, setNewRating] = useState(0);
  const [userOwnsBook, setUserOwnsBook] = useState(false);
  const [recentPurchase, setRecentPurshase] = useState(false);

  const buyBook = (e) => {
    const postObject = {
      UserID: props.user._id,
      BookID: props.match.params.id,
      Title: bookData.title,
      CoverURL: bookData.coverUrl
    };

    axios.post("/books/buy", postObject)
      .then((res) => {
        console.log(res)
        setUserOwnsBook(true)
        setRecentPurshase(true)
      })
      .catch(err => console.log(err))

  }
  const handleRecentPurchase = (e) => {
    setRecentPurshase(!recentPurchase)
  };

  const handleNewCommentChange = (e) => {
    //e.preventDefault();
    setNewComment(e.currentTarget.value);
  };
  const handleNewRatingChange = (e, data) => {
    //e.preventDefault();
    setNewRating(data.rating);
    console.log("Current rating: ", data.rating);
  };

  const handleNewAnonymousCommentPost = (e) => {
    e.preventDefault();
    // TODO: Add the creators ID once we get login running.
    const postObject = {
      Creator: props.user._id,
      CreatorName: "Anonymous",
      Anonymous: "true",
      BookID: props.match.params.id,
      Text: NewCommentText,
    };
    axios
      .post("/comments/add", postObject)
      .then((res) => { })
      .catch((err) => console.log(err));
  };

  const handleNewRating = (e) => {
    console.log(e.currentTarget);
    const postObject = {
      Creator: props.user._id,
      NickName: props.user.geekID,
      BookID: props.match.params.id,
      Rating: rating,
    };
    console.log(postObject);

    axios
      .post("/rate/add", postObject)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log("Thanks for rating");
  };
  const handleNewAnonymousRating = (e) => {
    console.log(e.currentTarget);
    const postObject = {
      Creator: props.user._id,
      BookID: props.match.params.id,
      Rating: rating,
    };
    console.log(postObject);
    axios
      .post("/rate/add", postObject)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleNewCommentPost = (e) => {
    e.preventDefault();
    // TODO: Add the creators ID once we get login running.
    const postObject = {
      Creator: props.user._id,
      CreatorName: props.user.geekID,
      Anonymous: "false",
      BookID: props.match.params.id,
      Text: NewCommentText,
    };
    axios
      .post("/comments/add", postObject)
      .then((res) => { })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Make api cal to database for Book information and all related comments
    axios
      .get(`/books/${props.match.params.id}`)
      .then((res) => {
        setBookData(res.data);
      })
      .catch((err) => console.log(err));

    // Make an api call to get the comments associated with this book.
    axios
      .get(`/comments/${props.match.params.id}`)
      .then((comments) => {
        setCommentsSet(comments.data);
      })
      .catch((err) => console.log(err));

    /*       const postObj = {
            UserID: props.user._id,
            BookID: props.match.params.id
          }
          axios
          .post(`/purchases/check`, postObj)
          .then((res) => {
              console.log("Check", res)
              if(res.data.length >=1){
                setUserOwnsBook(true)
              }
          })
          .catch((err) => console.log(err));    */
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe("books");
    channel.bind("updated-rating", function (data) {
      setBookData(data);
    });

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe("comments");
    channel.bind("inserted-comment", function (data) {
      setCommentsSet([...commentsSet, data]);
    });

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [commentsSet]);

 
  return (
    <Container>
      <Grid stackable columns={2} container centered>
        <Grid.Column largeScreen={5}>
        <Modal
        centered = {true}

      trigger={<Button>Cover</Button>}
    >
      <Modal.Header>Cover Art</Modal.Header>
      <Modal.Content image>
        <Image size='fullscreen' src={bookData.coverUrl} />
      </Modal.Content>
    </Modal>
          <Image src={bookData.coverUrl} />
          <h4>Publisher: {bookData.publisher}</h4>
          <h5>Copies Sold: {bookData.soldCount}</h5>
        </Grid.Column>
        <Grid.Column largeScreen={5}>
          <h2>{bookData.title}</h2>
          <h3>Author: {bookData.author}</h3>
          <Link to={`/books/${props.match.params.id}`}>
          <button class="ui animated fade button" tabindex="0">
            <div class="visible content">More books by this author</div>
            <div class="hidden content">{bookData.author}
          </div>
          </button>
          </Link>
          <h4>Genre: {bookData.genre}</h4>
          <p>Description: {bookData.description}</p>
          <p>Author's biography: {bookData.authorBio}</p>
          <Link to={`/ratings/${props.match.params.id}`}>
            <button class="ui right labeled icon button">
              <h4>Current Rating </h4>
              <i class="right arrow icon"></i>
              <Rating
                icon="star"
                defaultRating={bookData.rating}
                maxRating={5}
                disabled
                key={bookData.rating}
                style={{ margin: "15px", fontSize: "15px" }}
              />
              <span style={{ color: "#909090", fontSize: "15px" }}>
                ({bookData.rating})
              </span>
              <p>Click to see who rated</p>
            </button>
          </Link>
          <div>
            <br></br>
            <Grid.Column>
              {!props.user && (
                <Message positive>
                  <Message.Header>
                  </Message.Header>
                  <p>
                    Login or Register to buy books.
                </p>
                </Message>
              )}
              <Button
                animated
                disabled={!props.user || userOwnsBook}
                style={{
                  background:
                    "linear-gradient(98.95deg, #FF785A 19.47%, #FE5B00 82.33%)",
                }}
                onClick={() => buyBook()}>

                <Button.Content visible style={{ color: "white" }}>
                  $ {bookData.price}
                </Button.Content>
                <Button.Content hidden style={{ color: "white" }}>
                  <Icon name="cart" />
                </Button.Content>
              </Button>
              {recentPurchase && (
                <div class="ui positive message">
                  <i class="close icon" onClick={handleRecentPurchase}></i>
                  <div class="header">
                    <p>Thanks for buying <b>{bookData.title}</b> - Don't forget to rate and comment.</p>
                    <Link to={`/mybooks`}>
                      <b>see my books</b>
                    </Link>
                  </div>
                </div>

              )}
            </Grid.Column>
          </div>
        </Grid.Column>
      </Grid>
      <div>

        <br></br>
        <Segment>
          {/* Comments section */}
          <h2>Post a Comment</h2>
          {!userOwnsBook && (
            <Message negative>
              <Message.Header>
                You can only comment and rate books you already own.
              </Message.Header>
              <p>
                Buy <b>{bookData.title}</b> to unlock comments and rating.
              </p>
            </Message>
          )}
          {userOwnsBook && (
            <Message positive>
              <Message.Header>
                You own this book, share with us your feedback
              </Message.Header>
              <p>
                Please be respectful, check our{" "}
                <Link to="/guidelines">
                  <b>community guidelines</b>
                </Link>
              </p>
            </Message>
          )}
          <TextArea
            disabled={!userOwnsBook}
            style={{ width: "100%", borderRadius: "5px" }}
            placeholder={"Post your comment"}
            onChange={handleNewCommentChange}
            value={NewCommentText}
          />
          <Popup
            trigger={
              <Button disabled={!userOwnsBook} positive>
                Post Comment
              </Button>
            }
            flowing
            hoverable
          >
            <h4>We value privacy</h4>
            <Grid centered divided columns={2}>
              <Grid.Column textAlign="center">
                <Button positive onClick={handleNewCommentPost}>
                  Post with name
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button secondary onClick={handleNewAnonymousCommentPost}>
                  Hide my name!
                </Button>
              </Grid.Column>
            </Grid>
          </Popup>
        </Segment>
      </div>
      <div>
        <Segment>
          <h2>Rate this book</h2>
          <Rating
            disabled={!userOwnsBook}
            icon="star"
            size="massive"
            defaultRating={0}
            maxRating={5}
            value={rating}
            onRate={handleNewRatingChange}
          />
          <Popup
            disabled={!userOwnsBook}
            trigger={<Button>Post My Rating</Button>}
            flowing
            hoverable
          >
            <h4>We value privacy</h4>
            <Grid centered divided columns={2}>
              <Grid.Column textAlign="center">
                <Button positive onClick={handleNewRating}>
                  Show Nickname
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button secondary onClick={handleNewAnonymousRating}>
                  Hide my name!
                </Button>
              </Grid.Column>
            </Grid>
          </Popup>
        </Segment>
      </div>
      <div>
        <Segment>
          <CommentsList User={props.user} commentsList={commentsSet} />
        </Segment>
      </div>
    </Container>
  );
};

export default Book;
