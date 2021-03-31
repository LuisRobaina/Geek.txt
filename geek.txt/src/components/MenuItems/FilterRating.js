import {  Menu,Rating  } from 'semantic-ui-react';
import { useContext } from 'react';
import { BookContext } from '../../contexts/BookContext';
import { filterRating } from '../../config/sortHelpers'


const ratingOptions = [5,4,3,2,1];

export function FilterRating(){

    const bookData = useContext(BookContext);
  
    const handleClick = (rate) => {
        const modArry = filterRating(bookData.defaultBooks, rate);
        bookData.setBooks(modArry);
        bookData.setCurrentPage(1);
    };


    return(
        <>
        {ratingOptions.map(rate => (
                <Menu.Item key={rate} >
                    <span className="ratingSpan" onClick={() => handleClick(rate)}>
                    <Rating icon="star" defaultRating={rate} maxRating={5} disabled />({rate})
                    </span>
                </Menu.Item>
        ))}
        </>
    )
};

export default FilterRating;