'use strict';

import React from 'react';

// Stores
import CartStore from '../stores/CartStore'; 
import {addCartItem, updateCartItemQuantity} from '../actions';

let QuantityControl = React.createClass({
  render() {
    let {id, quantity} = this.props.item;
    let className = "adjust-qty__button";
    if (this.props.variant) className += " adjust-qty__button--" + this.props.variant;

    return (
      <div className="adjust-qty">
        <a onClick={updateCartItemQuantity.bind(null, id, quantity - 1)} className={ className }>—</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a onClick={updateCartItemQuantity.bind(null, id, quantity + 1)} className={ className }>+</a>
      </div>
    );
  }
});

module.exports = QuantityControl;
