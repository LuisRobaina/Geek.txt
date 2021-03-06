import { useEffect, useState } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react'
import axios from '../config/axios';
import { Header, Comment, Form, TextArea, Segment, Button } from 'semantic-ui-react';
import Comments from '../components/Comments';

import axios from '../config/axios';


const Book = (props) => {
    const [bookData, setBookData] = useState({})

    useEffect(() => {
        // Make api cal to database for Book information and all related comments
        axios.get(`/books/${props.match.params.id}`).then(res => setBookData(res.data)).catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Grid stackable columns={2} container centered>
                <Grid.Column largeScreen={5}>
                    <Image src={bookData.coverUrl} />
                </Grid.Column>
                <Grid.Column largeScreen={5}>
                    <h2>{bookData.title}</h2>
                    <h4>Author: {bookData.author}</h4>
                    <p>Description: {bookData.description}</p>
                </Grid.Column>
            </Grid>

            <div>
                <Segment>
                    <Comment.Group threaded>
                        <Header as='h3' dividing>
                            Comments about this Book
                    </Header>
                        <Comments>

                        </Comments>
                    </Comment.Group>
                    <Form reply>
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>

                    <Form>
                        {/* Text area to add a comment.*/}
                        <TextArea placeholder='Tell us about this' />
                        <Button animated='fade'>
                            <Button.Content visible>Submit Comment</Button.Content>
                            <Button.Content hidden>Your opinion matters!</Button.Content>
                        </Button>
                    </Form>

                </Segment>
            </div>
        </Container>
    )};

export default Book;