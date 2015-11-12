import React from 'react';

import connect from './connect';

import ProductStore from '../stores/ProductStore';

let {toggleShowOnlyLike} = ProductStore;

class SiteTitle extends React.Component {
  render() {
    let {showOnlyLike} = this.props;
    return (
      <div className="title">
        <h2>Buy Some Shoes</h2>
        <img onClick={toggleShowOnlyLike.bind(ProductStore)} className="title__heart" src={showOnlyLike ? "img/heart-liked.svg" : "img/heart.svg"} />
      </div>
    )
  }
};

@connect(ProductStore, 'showOnlyLike')
class ConnectedSiteTitle extends SiteTitle {};

module.exports = ConnectedSiteTitle;
