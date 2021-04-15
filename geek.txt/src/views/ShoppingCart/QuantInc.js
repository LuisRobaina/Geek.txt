import React from "react";
import "../../App.css";


function QuantInc (book) {
    //Increases quantity with localstorage
    const bookAdd = async () => {
        if(localStorage.getItem('user') === null || !localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify({}))
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user['cart']) {
            user['cart'] = []
        }
        let cart = user['cart'];
        
        let insideCart = false;
        for(let i = 0; i < cart.length; i++){
            if(cart[i]['book']['title'] === book['book']['title']){
                cart[i]['book']['quantity'] = cart[i]['book']['quantity'] + 1;
                console.log(cart[i]['book'])
                insideCart = true;
            }
        }


        window.location.reload();
        return false;
        
    }
    //Displays add book button
    return(
    <li class='collection-item avatar'>    
        <div>
            <button class= "ui animated fade button" onClick={() => bookAdd(book)}>+</button>
        </div>
    </li>    
    );
}

export default QuantInc;