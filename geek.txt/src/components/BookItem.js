import { Card, Image, Button, Icon, Rating } from "semantic-ui-react";
import { Link } from 'react-router-dom'

const BookItem = ({book, handleModal}) => {
    return(
        <>

            <Link to={`book/${book.title}`}>
        <Card centered style={{boxShadow: 'none'}} >
            <Image src={book.url} centered style={{height: '350px'}}/>
            <Card.Content style={{borderTop: 'none'}}>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>Author: {book.author}</Card.Meta>
                <Rating icon="star" defaultRating={3} maxRating={5} disabled style={{margin: '10px 0 '}} />
                <span style={{color: '#909090', fontSize: "12px"}}>(192)</span>
                <div style={{textAlign: 'center'}}>
                <Button animated style={{background:  'linear-gradient(98.95deg, #FF785A 19.47%, #FE5B00 82.33%)', margin: '10px 0'}} >
                    <Button.Content visible style={{color: 'white'}}>$ {book.price}</Button.Content>
                    <Button.Content hidden style={{color: 'white'}}>
                        <Icon name='cart' />
                    </Button.Content>
                </Button>
                </div>
            </Card.Content>
        </Card>
        </Link>
        </>
    )
}

export default BookItem;