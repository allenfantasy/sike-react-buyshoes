'use strict';
import React from 'react';

// Other Components
import QuantityControl from './QuantityControl.jsx';

// Stores
import CartStore from '../stores/CartStore'; 
let {addCartItem} = CartStore;
let cartItems = CartStore.getCartItems();

let Product = React.createClass({
  renderControl() {
    let id = this.props.product.id;
    if (cartItems[id]) {
      return <QuantityControl item={cartItems[id]} variant="gray" />;
    } else {
      return (
        <a onClick={addCartItem.bind(null, id)}  className="product__add">
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
            {'$' + price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src="img/heart.svg" alt="" />
        </div>

      </div>
    );
  }
});

let Products = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },
  render() {
    let productList = Object.keys(this.props.products).map((key) => {
      return <Product key={key} product={this.props.products[key]} />;
    })
    return (
      <div className="products">
        { productList }
      </div>
    )
  }
});

module.exports = Products;
