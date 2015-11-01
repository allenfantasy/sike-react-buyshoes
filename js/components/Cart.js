'use strict'; 

import React from 'react';
import Ps from 'perfect-scrollbar';

import QuantityControl from './QuantityControl';

// global shared variables
import {cartItems, products} from '../data';

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

          <img className="cart-item__trash" src="img/trash-icon.svg" alt="" />

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
  },

  render() {
    let cartItemList = Object.keys(this.props.items).map((key) => {
      let item = Object.assign({}, this.props.items[key]);
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
