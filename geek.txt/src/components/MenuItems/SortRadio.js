import { useState, useContext } from 'react';
import {  Menu, Radio } from 'semantic-ui-react';
import { BookContext } from '../../contexts/BookContext';
import { sortBy } from '../../config/sortHelpers'


const sortOptions = ["Most Popular", "Title", "Author", "Price", "Published Date"];


export default function SortRadio(){
    const [val, setVal] = useState("")
    const bookData = useContext(BookContext);
  
    const handleChange = (e, {value}) => {
      setVal(value);
      // sort by said value
      const modArry = sortBy(bookData.books, value);
      bookData.setBooks([...modArry]);
      bookData.setCurrentPage(1);
    };
  
    /// Also set default books to all push to 1 first page
    // Need to create an alternate variable that holds the entire array and is not modified at all
    const handleClick = (e, {value }) => {
      if(val === value) {
        setVal("")
        bookData.setBooks([...bookData.defaultBooks])
      }
    };
    
    return(
        <Menu.Menu>
              {sortOptions.map(option => (
                <Menu.Item key={option}>
                  <Radio
                    label={option}
                    value={option.toLowerCase()}
                    onChange={handleChange}
                    checked={val === option.toLowerCase()}
                    onClick={handleClick}
                  />
                </Menu.Item>
              ))}
        </Menu.Menu>
      )
}