'use strict';

import EventEmitter from 'events';
//import util from '../lib/util';

let emitter = new EventEmitter();
//let {entries} = util;

function emitChange() {
  emitter.emit('change');
}

// global shared variables
let _products = require('../data').products;
//for (let [k, v] of entries(_products)) products[k].liked = false;

let _showOnlyLike = false;

module.exports = {
  products() {
    return _products;
  },

  filteredProducts() {
    return _products;
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
