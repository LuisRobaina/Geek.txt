import { Grid, Pagination } from "semantic-ui-react";
import { useState } from 'react';
import BookItem from "./BookItem";
import ModalBook from './ModalBook';

const BookList = ({ bookData, bookCount, currentPage, setCurrentPage}) => {
    const [open, setOpen] = useState(false);
    const lastPageindex = bookCount * currentPage;
    const firstPageIndex = lastPageindex - bookCount;
    const books =  bookData.slice(firstPageIndex, lastPageindex);

    const handleChange = (e, {activePage}) => {
        setCurrentPage(activePage)
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    return(
        <div style={{marginTop: '10px'}}>
        <Grid stackable >
            {books ? (books.map((book, index) => (
                <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                    <BookItem book={book} />
                </Grid.Column>
            ))) : (
                <p>Loading...</p>
                )}

        </Grid>
        {open && <ModalBook open={open} setOpen={setOpen}/>}
        <div className="paginate">
            <Pagination
                boundaryRange={0}
                ellipsisItem={null}
                siblingRange={1}
                totalPages={Math.ceil(bookData.length / bookCount)}
                onPageChange={handleChange}
                activePage={currentPage}
            />        
        </div>
        </div>
    )
}

export default BookList;