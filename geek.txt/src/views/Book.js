import { useEffect, useState } from 'react';
import { Container, Grid, Image, Rating, Icon, TextArea, Popup } from 'semantic-ui-react'
import axios from '../config/axios';
import { Segment, Button } from 'semantic-ui-react';
import CommentsList from '../components/CommentsList';

const Book = (props) => {
    const [bookData, setBookData] = useState({})
    const [commentsSet, setCommentsSet] = useState([])
    const [NewCommentText, setNewComment] = useState("")
    const [currentRating, setCurrentRating] = useState(0)
    const [rating, setNewRating] = useState(0)

    const handleNewCommentChange = (e) => {
        e.preventDefault()
        setNewComment(e.currentTarget.value)
    }
    const handleNewAnonymousCommentPost = (e) => {
        e.preventDefault()
        // TODO: Add the creators ID once we get login running.
        const postObject = {
            Creator: "60426686e0804e3b0cc20702",
            CreatorName: "Anonymous",
            Anonymous: "true",
            BookID: props.match.params.id,
            Text: NewCommentText
        }
        axios.post('/comments/add', postObject).then(res => {
            // TODO: remove this log.
            console.log(res)
            // Make an api call to get the comments associated with this book.
            // TODO change book request string to props.match.params.id
            axios.get(`/comments/${props.match.params.id}`)
                .then(comments => {
                    // TODO: remove this log.
                    console.log(comments)
                    setCommentsSet(comments.data)
                })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
    }
    const handleNewRating = (e, data) => {
        console.log(e.currentTarget)
        setNewRating(data.rating)
        const postObject = {
            Creator: "60426686e0804e3b0cc20702",
            BookID: props.match.params.id,
            Rating: data.rating
        }
        console.log(postObject)

        axios.post('/rate/add', postObject).then(res => console.log(res))
            .catch(err => console.log(err))

        alert("Thanks for rating")
        window.location.reload()
    }
    const handleNewCommentPost = (e) => {
        e.preventDefault()
        // TODO: Add the creators ID once we get login running.
        const postObject = {
            Creator: "60426686e0804e3b0cc20702",
            CreatorName: "Peter",
            Anonymous: "false",
            BookID: props.match.params.id,
            Text: NewCommentText
        }
        axios.post('/comments/add', postObject).then(res => {
            // TODO: remove this log.
            console.log(res);
            // Get the set of comments
            // Make an api call to get the comments associated with this book.
            // TODO change book request string to props.match.params.id
            axios.get(`/comments/${props.match.params.id}`)
                .then(comments => {
                    // TODO: remove this log.
                    console.log(comments)
                    setCommentsSet(comments.data)
                })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // Make api cal to database for Book information and all related comments
        axios.get(`/books/${props.match.params.id}`)
            .then(res => {
                setBookData(res.data)
            }).catch(err => console.log(err))


        axios.get(`/rate/getAvg/${props.match.params.id}`)
            .then(res => {
                setCurrentRating((res.data.avg).toFixed(2))
            })
            .catch(err => console.log(err))

        // Make an api call to get the comments associated with this book.
        // TODO change book request string to props.match.params.id
        axios.get(`/comments/${props.match.params.id}`)
            .then(comments => {
                // TODO: remove this log.
                console.log(comments)
                setCommentsSet(comments.data)
            })
            .catch(err => console.log(err))

        axios.get(`/users/${"60426686e0804e3b0cc20702"}`)
            .then(comments => {
                // TODO: remove this log.
                console.log(comments)
                setCommentsSet(comments.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Grid stackable columns={2} container centered>
                <Grid.Column largeScreen={5}>
                    <Image src={bookData.coverUrl} />
                </Grid.Column>
                <Grid.Column largeScreen={5}>
                    <h2>{bookData.title}</h2>
                    <h3>Author: {bookData.author}</h3>
                    <h4>Genre: {bookData.genre}</h4>
                    <p>Description: {bookData.description}</p>
                    <b>Current Rating </b>
                    <Rating icon="star" defaultRating={currentRating} maxRating={5} disabled key={currentRating} style={{ margin: '25px 0 ', fontSize: "18px" }} />
                    <span style={{ color: '#909090', fontSize: "14px" }}>({currentRating})</span>
                    <Grid.Column>

                        <Button animated style={{ background: 'linear-gradient(98.95deg, #FF785A 19.47%, #FE5B00 82.33%)' }} onClick={() => console.log("click")}>
                            <Button.Content visible style={{ color: 'white' }}>$ {bookData.price}</Button.Content>
                            <Button.Content hidden style={{ color: 'white' }}>
                                <Icon name='cart' />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid.Column>
            </Grid>
            <div>
                {/* Comments section */}
                <h2>Post a Comment</h2>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    placeholder={"Post your comment"}
                    onChange={handleNewCommentChange}
                    value={NewCommentText}
                />
                <Popup trigger={<Button positive>Post Comment</Button>} flowing hoverable>
                    <Grid centered divided columns={3}>
                        <Grid.Column textAlign='center'>
                            <Button positive onClick={handleNewCommentPost}>Post with name</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Button secondary onClick={handleNewAnonymousCommentPost}>Hide my name!</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
            </div>
            <div>
                <h2>Rate this book</h2>
                <Rating icon='star' size='massive' defaultRating={1} maxRating={5} value={rating} onRate={handleNewRating} />
            </div>
            <div>
                <Segment>
                    <CommentsList commentsList={commentsSet} />
                </Segment>
            </div>
        </Container>

    )
};

export default Book;