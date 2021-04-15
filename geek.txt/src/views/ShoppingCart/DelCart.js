import React from "react";
import "../../App.css";



function DelCart (book) {
    const delBook = async () => {
        
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        let cart = user['cart'];
        
        for(let i = 0; i < cart.length; i+= 1){
            if(cart[i]['book']['title'] === book['book']['title']){
                cart[i]['book']['quantity'] = cart[i]['book']['quantity'] - 1;
                if (cart[i]['book']['quantity'] === 0) {
                    cart.splice(i,1)
                }
            }
        }

        //Refresh the webpage to delete the book
        window.location.reload();
        return false;
    }
            return (
                <li class='collection-item avatar'>   
                <div>
                    <button class= "ui animated fade button" onClick={() => delBook(book)}>-</button>
                </div>
                </li>
            )
          }
    
export default DelCart;