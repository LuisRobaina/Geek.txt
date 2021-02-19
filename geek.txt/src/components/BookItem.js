import { Card, Image } from "semantic-ui-react";

const BookItem = ({book}) => {
    return(
        <Card centered>
            <Image src={book.url} centered/>
            <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>Author: {book.author}</Card.Meta>
            </Card.Content>
            <Card.Content>
                <p>$14.99</p>
                <button className='btn'>Add to Cart</button>
            </Card.Content>
        </Card>
    )
}

export default BookItem;