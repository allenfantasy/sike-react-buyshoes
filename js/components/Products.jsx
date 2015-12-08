'use strict';
import React from 'react';

// Other Components
import QuantityControl from './QuantityControl.jsx';
import ConnectedStore from './ConnectedStore.jsx';

import connect from './connect';

// Stores
import CartStore from '../stores/CartStore'; 
import LikeStore from '../stores/LikeStore';
import ProductStore from '../stores/ProductStore';

import {addCartItem, toggleLikeProduct} from '../actions';

let Product = React.createClass({
  renderControl(id) {
    let {cartItems} = this.props;
    if (cartItems[id]) {
      return <QuantityControl item={cartItems[id]} variant="gray" />;
    } else {
      return (
        <a onClick={addCartItem.bind(CartStore, id)}  className="product__add">
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }
  },
  render() {
    let {product, likeItems} = this.props;
    let {id, name, price, imagePath} = product;
    let isLiked = likeItems[id];

    return (
      <div className="product">

        <div className="product__display">
          <img className="product__img" src={imagePath} alt={name} />
          { this.renderControl(id) }
          <div className="product__price">
            {'$' + price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img onClick={toggleLikeProduct.bind(null, id)} className="product__heart" src={isLiked ? "img/heart-liked.svg" : "img/heart.svg"} alt="" />
        </div>

      </div>
    );
  }
});

let Products = React.createClass({
  render() {
    let {cartItems, likeItems, filteredProducts} = this.props;

    let productList = Object.keys(filteredProducts).map((key) => {
      return <Product key={key} product={filteredProducts[key]} likeItems={likeItems} cartItems={cartItems} />;
    })
    return (
      <div className="products">
        { productList }
      </div>
    )
  }
});

@connect(LikeStore, 'likeItems')
@connect(CartStore, 'cartItems')
@connect(ProductStore, 'filteredProducts')
class ConnectedProducts extends Products {};

module.exports = ConnectedProducts;
