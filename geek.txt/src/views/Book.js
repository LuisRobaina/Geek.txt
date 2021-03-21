import { useEffect, useState } from 'react';
import { Container, Grid, Image, Rating, Icon, TextArea } from 'semantic-ui-react'
import axios from '../config/axios';
import { Segment, Button } from 'semantic-ui-react';
import CommentsList from '../components/CommentsList';

const Book = (props) => {
    const [bookData, setBookData] = useState({})
    const [commentsSet, setCommentsSet] = useState([])
    const [NewCommentText, setNewComment] = useState("")

    const handleNewCommentChange = (e) => {
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
        })
            .catch(err => console.log(err))
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
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        // Make api cal to database for Book information and all related comments
        axios.get(`/books/${props.match.params.id}`)
            .then(res => { setBookData(res.data) })
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


                    <Rating icon="star" defaultRating={bookData.rating} maxRating={5} disabled key={bookData.rating} style={{ margin: '25px 0 ', fontSize: "18px" }} />
                    <span style={{ color: '#909090', fontSize: "18px" }}>({bookData.rating})</span>

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
                <Button positive
                    onClick={handleNewCommentPost}
                >Post Comment</Button>
                <Button secondary
                    onClick={handleNewAnonymousCommentPost}
                >Post Anonymously</Button>
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