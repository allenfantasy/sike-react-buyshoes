'use strict';

import EventEmitter from 'events'
import AppDispatcher from '../AppDispatcher' 

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit('change');
}

let _likeItems = {
  //'jameson-vulc': true
}

AppDispatcher.register((action) => {
  let handler = handlers[action.type];

  handler && handler(action);
});

function isLiked(productId) {
  return _likeItems[productId];
};

let handlers = {
  like(action) {
    let {productId} = action
    if (!_likeItems[productId]) _likeItems[productId] = true;
    emitChange();
  },

  unlike(action) {
    let {productId} = action
    if (_likeItems[productId]) delete _likeItems[productId];
    emitChange();
  },

  toggleLikeProduct(action) {
    let {productId} = action
    isLiked(productId) ? handlers.unlike(action) : handlers.like(action)
  }
}

module.exports = {
  getLikeItems() {
    return _likeItems;
  },

  likeItems() {
    return _likeItems;
  },

  addChangeListener(callback) {
    emitter.addListener('change', callback);
  },

  removeChangeListener(callback) {
    emitter.removeListener('change', callback);
  }
};
