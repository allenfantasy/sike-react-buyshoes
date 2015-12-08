'use strict';

import EventEmitter from 'events';
import AppDispatcher from '../AppDispatcher' 
import util from '../lib/util';

let emitter = new EventEmitter();
let {entries} = util;

function emitChange() {
  emitter.emit('change');
}

// global shared variables
let _products = require('../data').products;
for (let [k, v] of entries(_products)) v.liked = false;

let _showOnlyLike = false;

AppDispatcher.register((action) => {
  let handler = handlers[action.type];

  handler && handler(action);
});

let handlers = {
  toggleLikeProduct(action) {
    let {productId} = action
    _products[productId].liked = !_products[productId].liked;
    emitChange();
  }
}

module.exports = {
  products() {
    return _products;
  },

  showOnlyLike() {
    return _showOnlyLike;
  },

  filteredProducts() {
    if (_showOnlyLike) {
      let _filteredProducts = {};
      for (let [k, v] of entries(_products)) {
        if (v.liked) _filteredProducts[k] = v;
      }
      return _filteredProducts;
    } else {
      return _products;
    }
  },

  toggleShowOnlyLike() {
    _showOnlyLike = !_showOnlyLike;
    emitChange();
  },

  addChangeListener(callback) {
    emitter.addListener('change', callback);
  },

  removeChangeListener(callback) {
    emitter.removeListener('change', callback);
  }
}
