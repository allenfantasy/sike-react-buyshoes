'use strict'; 

import React from 'react';
import Ps from 'perfect-scrollbar';

import QuantityControl from './QuantityControl.jsx';
import ConnectedStore from './ConnectedStore.jsx';

import connect from './connect'

import MakeConnectedComponent from './MakeConnectedComponent';

import {products} from '../data';
import {undoShoppingCart, removeCartItem} from '../actions';

// Stores
import CartStore from '../stores/CartStore'; 
import UndoStore from '../stores/UndoStore'

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
  renderUndo(history) {
    if (history.length > 0) {
      return (
        <h3 className="cart_undo"><a onClick={undoShoppingCart}>Undo</a></h3>
      )
    } else {
      return ''
    }
  },
  componentDidMount() {
    let $cart = React.findDOMNode(this.refs.cart);

    Ps.initialize($cart);
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },

  render() {
    let {cartItems, history} = this.props;
    let cartItemList = Object.keys(cartItems).map((key) => {
      let item = Object.assign({}, cartItems[key]);
      item.name = key;
      item.imagePath = products[key].imagePath;
      item.price = products[key].price;
      return this.renderItem(item); 
    }); 
    let undoButton = this.renderUndo(history)
    return (
      <div ref="cart" className="cart">
        <div className="cart__title">Shopping Cart</div>
        <div className="cart__content">
          { cartItemList }
        </div>

        { undoButton }
      </div>
    );
  }
})

@connect(CartStore, 'cartItems')
@connect(UndoStore, 'history')
class ConnectedCart extends Cart {}

module.exports = ConnectedCart
