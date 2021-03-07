import { Card, Image, Button, Icon, Rating } from "semantic-ui-react";
import { Link } from 'react-router-dom'

const BookItem = ({book}) => {
    return(
        <>
        <Card centered style={{boxShadow: 'none'}} key={book._id}>
            <Link to={`books/${book._id}`}>
            <Image src={book.coverUrl} centered style={{height: '350px'}}/>
            <Card.Content style={{borderTop: 'none'}}>
                <Card.Header style={{color: 'black', fontSize: "18px", fontWeight: '600', padding: '10px 0'}}>{book.title}</Card.Header>
                <Card.Meta>Author: {book.author}</Card.Meta>
                <Rating icon="star" defaultRating={book.rating} maxRating={5} disabled style={{margin: '10px 0 '}} />
                <span style={{color: '#909090', fontSize: "12px"}}>({book.rating})</span>
            </Card.Content>
        </Link>
                <div style={{textAlign: 'center'}}>
                <Button animated style={{background:  'linear-gradient(98.95deg, #FF785A 19.47%, #FE5B00 82.33%)', margin: '10px 0'}} onClick={() => console.log("click")}>
                    <Button.Content visible style={{color: 'white'}}>$ {book.price}</Button.Content>
                    <Button.Content hidden style={{color: 'white'}}>
                        <Icon name='cart' />
                    </Button.Content>
                </Button>
                </div>
        </Card>
        </>
    )
}

export default BookItem;