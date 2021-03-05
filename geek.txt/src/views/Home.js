import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import axios from '../config/axios';
import { Container } from 'semantic-ui-react'
import Dropdown from '../components/Dropdown/Dropdown';

const bookOptions = [
    {"id": 1, "name" : 10},
    {"id": 2, "name" : 20}
]

const Home = () => {
    const [books, setBooks] = useState([]);
    const [bookCount, setBookCount] = useState(10);

    useEffect(() => {
        axios.get('/books').then(res => setBooks(res.data.list)).catch(err => console.log(err))
    }, [])

    

    return (
        <Container>
        <h3>Featured Books </h3>
        <div style={{display: 'flex', justifyContent:"flex-end"}}>
            <Dropdown prompt="Books per Page" value={bookCount} onChange={val => setBookCount(val)} width={150} options={bookOptions}/>
        </div>
        <BookList bookData={books} bookCount={bookCount} setBookCount={setBookCount}/>
        <Footer />
        </ Container>
    )
}

export default Home;