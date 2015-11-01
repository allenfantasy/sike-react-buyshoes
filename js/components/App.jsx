'use strict'; 

import React from 'react';

// global shared variables
import {products} from '../data';

// Components
import SiteTitle from './SiteTitle.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';

// The App Component

let App = React.createClass({
  render() {
    return (
      <div className="site">
        <div className="site__main">
          <div className="site__left-sidebar">
            <SiteTitle />
          </div>
          <div className="site__content">
            <Products products={products} />
          </div>
        </div>

        <div className="site__right-sidebar">
          <Cart />
          <Checkout />
        </div>

        <a className="site__right-sidebar-toggle">
          <img src="img/arrow-icon.svg" alt="" />
        </a>
      </div>
    )
  }
});

module.exports = App;
