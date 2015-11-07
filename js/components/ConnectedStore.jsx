'use strict';
import React from 'react';

class ConnectedStore extends React.Component {

  componentDidMount() {
    let store = this.props.store;
    store.addChangeListener(this.forceUpdate.bind(this));
  }

  render() {
    // The `children` property is a function.
    let contentRenderFunction = this.props.children;

    // 1. Read all the data from store by calling reader methods dynamically.
    let storeProps = {};

    this.props.propNames.forEach((name) => {
      storeProps[name] = this.props.store[name]();
    });

    // 2. Pass the data to `contentRenderFunction`.
    return contentRenderFunction(storeProps);
  }
}

module.exports = ConnectedStore;
