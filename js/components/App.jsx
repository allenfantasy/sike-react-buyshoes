'use strict'; 

import React from 'react';

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
            <Products />
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
