'use strict';

import React from 'react';

import {cartItems, products} from '../data';

import QuantityControl from './QuantityControl';

let Product = React.createClass({
  renderControl() {
    let id = this.props.product.id;
    if (cartItems[id]) {
      return <QuantityControl item={cartItems[id]} variant="gray" />;
    } else {
      return (
        <a className="product__add">
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }
  },
  render() {
    let {name, price, imagePath} = this.props.product;

    return (
      <div className="product">

        <div className="product__display">
          <img className="product__img" src={imagePath} alt={name} />
          { this.renderControl() }
          <div className="product__price">
            {price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src="img/heart.svg" alt="" />
        </div>{/* product__description */}

      </div>
    );
  }
});

module.exports = Product;
