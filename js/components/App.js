'use strict'; 

import React from 'react';

// global shared variables
import {cartItems, products} from '../data';

import SiteTitle from './SiteTitle';
import Products from './Products';
import Cart from './Cart';
import Checkout from './Checkout';

// The App Component

let App = React.createClass({
  // Generate `buyshoes` site's virtual DOM
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
          <Cart items={cartItems} />
          <Checkout items={cartItems} />
        </div>

        <a className="site__right-sidebar-toggle">
          <img src="img/arrow-icon.svg" alt="" />
        </a>
      </div>
    )
  }
});

module.exports = App;
