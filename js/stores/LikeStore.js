'use strict';

import EventEmitter from 'events';

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit('change');
}

let _likeItems = {
  //'jameson-vulc': true
}

module.exports = {
  isLiked(productId) {
    return _likeItems[productId];
  },

  like(productId) {
    if (!_likeItems[productId]) _likeItems[productId] = true;
    emitChange();
  },

  unlike(productId) {
    if (_likeItems[productId]) delete _likeItems[productId];
    emitChange();
  },

  toggle(productId) {
    this.isLiked(productId) ? this.unlike(productId) : this.like(productId);
  },

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
