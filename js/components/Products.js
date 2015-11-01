import React from 'react';

import Product from './Product';

let Products = React.createClass({
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
