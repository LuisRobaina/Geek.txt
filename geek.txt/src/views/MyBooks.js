import {Segment } from 'semantic-ui-react';
import BookItem from '../components/BookItem';

const MyBooks = ({user}) => {

    // get the books this user owns.

    return (
        <Segment>
            <BookItem book={book}></BookItem>
        </Segment>
    )
}
export default MyBooks