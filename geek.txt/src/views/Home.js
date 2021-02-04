import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import axios from '../config/axios';
import { Container } from 'semantic-ui-react'


const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/books').then(res => setBooks(res.data.list)).catch(err => console.log(err))
    }, [])
    return (
        <Container>
        <p>Home page!</p>
        <BookList bookData={books}/>
        </ Container>
    )
}

export default Home;