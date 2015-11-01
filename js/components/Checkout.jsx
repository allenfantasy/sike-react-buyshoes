'use strict'; 

import React from 'react';

import {products} from '../data';

// Stores
import CartStore from '../stores/CartStore'; 

let Checkout = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },
  render() {
    let cartItems = CartStore.getCartItems();
    let items = Object.keys(cartItems).map((key) => {
      let item = Object.assign({}, cartItems[key]);
      item.price = products[key].price;
      return item;
    });

    let total = items.reduce((prev, currItem) => {
      return prev + currItem.quantity * currItem.price;
    }, 0).toFixed(2);

    return (
      <div className="checkout">
        <hr className="checkout__divider" />
        <input className="checkout__coupon-input" type="text" placeholder="coupon code" />
        <p className="checkout__help-block">No such coupon code!</p>

        <div className="checkout__summary">
          <div className="checkout__row checkout__row--subtotal">

            <div className="checkout__row-title subtotal">
              Subtotal
            </div>
            <div className="checkout__total">
              <div className="checkout__amount checkout__amount--saving">
                { total }
              </div>
            </div>

          </div>
        </div>

        <div className="checkout__confirm-wrapper">
          <div className="checkout__confirm">
            <img className="checkout__cart-icon" src="img/cart-icon.svg" alt="" />
            <div className="checkout__confirm-text">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Checkout;
