import { useEffect, useState } from 'react';
import { Container, Grid, Image } from 'semantic-ui-react'
import axios from '../config/axios';
import { Segment } from 'semantic-ui-react';
import Comments from '../components/Comments';


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
                    <Comments />
                </Segment>
            </div>
        </Container>
    )};

export default Book;