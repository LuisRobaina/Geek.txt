import { useEffect, useState } from 'react';
import { Container, Grid, Image, Rating, Icon } from 'semantic-ui-react'
import axios from '../config/axios';
import { Header, Comment, Form, TextArea, Segment, Button } from 'semantic-ui-react';
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
                    <h3>Author: {bookData.author}</h3>
                    <h4>Genre: {bookData.genre}</h4>
                    <p>Description: {bookData.description}</p>

            
            <Rating icon="star" defaultRating={bookData.rating} maxRating={5} disabled key = {bookData.rating} style={{margin: '25px 0 ', fontSize: "18px"}} />
             <span style={{color: '#909090', fontSize: "18px"}}>({bookData.rating})</span>
             
            <Grid.Column>

            <Button animated style={{background:  'linear-gradient(98.95deg, #FF785A 19.47%, #FE5B00 82.33%)'}} onClick={() => console.log("click")}>
                    <Button.Content visible style={{color: 'white'}}>$ {bookData.price}</Button.Content>
                    <Button.Content hidden style={{color: 'white'}}>
                        <Icon name='cart' />
                    </Button.Content>
            </Button> 
            
            </Grid.Column>

              
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