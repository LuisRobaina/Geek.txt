import { Grid, Image, Pagination } from "semantic-ui-react";
import { useState } from 'react';

const BookList = ({bookData}) => {
    const [bookPerPage, setBookPerPage] = useState(10);
    const [currentPage, setcurrentPage] = useState(1);

    const lastPageindex = bookPerPage * currentPage;
    const firstPageIndex = lastPageindex - bookPerPage;
    const books =  bookData.slice(firstPageIndex, lastPageindex);


    const handleChange = (e, {activePage}) => {
        setcurrentPage(activePage)
        window.scrollTo({top: 0, behavior: "smooth"})
    }



    return(
        <>
        <Grid  stackable >
            {books ? (books.map((book, index) => (
                <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                    <Image src={book.url} centered/>
                </Grid.Column>
            ))) : (
                <p>Loading...</p>
                )}

        </Grid>
        <Pagination
        boundaryRange={0}
        ellipsisItem={null}
        siblingRange={1}
        totalPages={Math.ceil(bookData.length / bookPerPage)}
        onPageChange={handleChange}
        activePage={currentPage}
        />        </>
    )
}

export default BookList;