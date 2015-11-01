'use strict'; 

import React from 'react';
import Ps from 'perfect-scrollbar';

import QuantityControl from './QuantityControl.jsx';

import {products} from '../data';

// Stores
import CartStore from '../stores/CartStore'; 
let {removeCartItem} = CartStore; 

let Cart = React.createClass({
  renderItem(item) {
    let {id, quantity, name, imagePath, price} = item; 
    if (quantity > 1) price = price + ' x ' + quantity;
    return (
      <div key={id} className="cart-item">

        <div className="cart-item__top-part">

          <div className="cart-item__image">
            <img src={imagePath} alt={name} />
          </div>

          <div className="cart-item__top-part__middle">
            <div className="cart-item__title">{name}</div>
            <div className="cart-item__price">{price}</div>
          </div>

          <img onClick={removeCartItem.bind(null, id)} className="cart-item__trash" src="img/trash-icon.svg" alt="" />

        </div>

        <div className="cart-item__qty">
          <QuantityControl item={item} />
        </div>

      </div>
    );
  },
  componentDidMount() {
    let $cart = React.findDOMNode(this.refs.cart);

    Ps.initialize($cart);
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },

  render() {
    let cartItems = CartStore.getCartItems();
    let cartItemList = Object.keys(cartItems).map((key) => {
      let item = Object.assign({}, cartItems[key]);
      item.name = key;
      item.imagePath = products[key].imagePath;
      item.price = products[key].price;
      return this.renderItem(item); 
    }); 
    return (
      <div ref="cart" className="cart">
        <div className="cart__title">Shopping Cart</div>
        <div className="cart__content">
          { cartItemList }
        </div>
      </div>
    );
  }
})

module.exports = Cart;
