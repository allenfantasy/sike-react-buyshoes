'use strict';
import EventEmitter from 'events';
import AppDispatcher from '../AppDispatcher';
import UndoStore from './UndoStore'

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit('change');
}

let _cartItems = {
  // "jameson-vulc": {
  //   id: "jameson-vulc",
  //   quantity: 1, 
  // },
};

AppDispatcher.register((action) => {
  AppDispatcher.waitFor([UndoStore.getToken()])
  let handler = handlers[action.type];

  handler && handler(action);
})

let handlers = {
  addCartItem(action) {
    let {productId} = action;
    if (_cartItems[productId]) {
      _cartItems[productId].quantity += 1;
    } else {
      _cartItems[productId] = {
        id: productId,
        quantity: 1,
      }
    }
    emitChange();
  },

  removeCartItem(action) {
    let {productId} = action;
    delete _cartItems[productId];
    emitChange();
  },

  updateCartItemQuantity(action) {
    let {productId, quantity} = action;
    if (!_cartItems[productId]) return;
    if (quantity <= 0) {
      delete _cartItems[productId];
    } else {
      _cartItems[productId].quantity = quantity;
    }
    emitChange();
  },

  undoShoppingCart(actions) {
    let {cartItems} = actions
    _cartItems = cartItems;
    emitChange()
  }
}

export default {

  getCartItems() {
    return _cartItems;
  },

  // Alias method
  cartItems() {
    return _cartItems;
  },

  addChangeListener(callback) {
    emitter.addListener('change', callback);
  },

  removeChangeListener(callback) {
    emitter.removeListener('change', callback);
  }
}
