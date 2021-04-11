//This is the order summary of the shopping cart feature

import React from 'react';
import YourCart from './YourCart';

export default function OrderSummary() {
    //NEEDS TO CALCULATE
    //Subtotal: The price of the item, multiplied by their quantity. (Quantity function from yourCart.js)
    //Estimated Shipping: Calculates a fixed estimated shipping price. (Calculate it here.)
    //Estimated Tax: Calculates a fixed estimated tax price. (Calculate it here.)
    //Order Total: Combines subtotal, estimated tax, and estimated shipping. Returns the value in two decimal places. (Calculate it here.)
    const { cartItems, onAdd, onRemove } = props;
    const subTotal = book.price;
    const estimatedTax = subTotal * 0.14;
    const estimatedShip = subTotal > 200 ? 0 : 10;
    const totalPrice = subTotal + estimatedTax + estimatedShip;

    return (
        <aside className="block col-1">
          <h2>Cart Items</h2>
          <div>
            {cartItems.length === 0 && <div>Cart is empty</div>}
            {cartItems.map((item) => (
              <div key={item.id} className="row">
                <div className="col-2">{item.name}</div>
                <div className="col-2">
                  <button onClick={() => onRemove(item)} className="remove">
                    -
                  </button>{' '}
                  <button onClick={() => onAdd(item)} className="add">
                    +
                  </button>
                </div>
    
                <div className="col-2 text-right">
                  {item.qty} x ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
    
            {cartItems.length !== 0 && (
              <>
                <hr></hr>
                <div className="row">
                  <div className="col-2">Items Price</div>
                  <div className="col-1 text-right">${subTotal.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div className="col-2">Tax Price</div>
                  <div className="col-1 text-right">${estimatedTax.toFixed(2)}</div>
                </div>
                <div className="row">
                  <div className="col-2">Shipping Price</div>
                  <div className="col-1 text-right">
                    ${estimatedShip.toFixed(2)}
                  </div>
                </div>
    
                <div className="row">
                  <div className="col-2">
                    <strong>Total Price</strong>
                  </div>
                  <div className="col-1 text-right">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <button onClick={() => alert('Implement Checkout!')}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      );
    }