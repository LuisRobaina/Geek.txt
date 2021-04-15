import React, { useEffect } from "react";
import "../../App.css";
import DelCart from "./DelCart";
import QuantInc from "./QuantInc";

function BookItem(book, removefunc) {
    return (
      <ul key={book['title']}>          
                <div class="container">
                    <div class="row">
                        <div class="card">
                            <div class="card">
                                    <img src={book['image']} alt="book cover"/>
                                    <li class="card-title"><h1>{book['title']}</h1></li>
                                    <li><h2>Author: {book['author']}</h2></li>
                                    <li><h3>Rating: {book['rating']}</h3></li>
                                    <li><h4>Price: {book['price']}</h4></li>
                                    <li><h5>Quantity: {book['quantity']}</h5></li>
                            </div>    
                        <div class='card-action'>
                            <DelCart book={book}></DelCart>
                            <QuantInc book={book}></QuantInc>
                            <button className= "ui animated fade button" onClick={() => {removefunc(book)}}>Remove</button>
                        </div>
                    </div>        
                </div> 
            </div>
                
      </ul>
    )
  }

function BookList(books, bookLayout, bookfunc) {
    if(!Array.isArray(books)){
      books = []
    }
    return (
        
      <div className="box">
          <div className="box" data-columns="2">
            <ul>{books.map((book) => bookLayout(book, bookfunc))}</ul>
          </div>
      </div>
    
    )
  }

function Cart () {
    //Gets cart with local storage
    const [cart, setCart] = React.useState([]);

    useEffect(() => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        setCart(user['cart'].map((book) => {
            return book['book'];
           
        }));

    }, []);
    
    //Calculates total price
    const getTotalPrice = () => {
        let sum = 0
        let shipCost = 15
        let taxCost = 2
        cart.map((book) => {
            sum += ((book['price'] * book['quantity']) + shipCost + taxCost)
            return book
        })
        return sum;
    }
    
    //Prints subTotal, shipCost, and taxCost 
    //const subTotal = (book['price'] * book['quantity']);
    //console.log(subTotal);

    //const shipCost = shipCost;
    //console.log(shipCost);

    //const taxCost = taxCost;
    //console.log(taxCost);

    // Formats total price to two decimal places
    const result = getTotalPrice().toFixed(2);
    console.log(result); 

    //All the outputs below are replaced with result
    return (
        <li>
            <div className="cart-left-side">
                {BookList(cart, BookItem)}
            </div>
            
            <div className="cart-total">
                <h3>Subtotal: ${result}</h3>
                <h3>Estimated Shipping: ${result}</h3>
                <h3>Estimated Tax: ${result}</h3>
                <h1>Total: ${result}</h1>
            </div>
        </li>
    )
}

export default Cart;