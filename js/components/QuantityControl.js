'use strict';

import React from 'react';

let QuantityControl = React.createClass({
  render() {
    let quantity = this.props.item.quantity;
    let className = "adjust-qty__button";
    if (this.props.variant) className += " adjust-qty__button--" + this.props.variant;

    return (
      <div className="adjust-qty">
        <a className={ className }>—</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a className={ className }>+</a>
      </div>
    );
  }
});

module.exports = QuantityControl;
