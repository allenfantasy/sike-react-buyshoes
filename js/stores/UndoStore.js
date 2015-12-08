'use strict'

import EventEmitter from 'events';
import _ from 'lodash'
import AppDispatcher from '../AppDispatcher'
import CartStore from './CartStore'

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit('change');
}

let history = []

let token = AppDispatcher.register((action) => {
  let handler = handlers[action.type]

  handler && handler(action)
})

let handlers = {
  addCartItem(action) {
    history.push(_.cloneDeep(CartStore.cartItems()))
    console.log(history);
  },

  removeCartItem(action) {
    history.push(_.cloneDeep(CartStore.cartItems()))
  }
}

export default {
  lastHistoryItem() {
    return history.pop()
  },
  
  getToken() {
    return token
  },

  getHistory() {
    return history
  },

  // alias
  history() {
    return history
  },

  addChangeListener(callback) {
    emitter.addListener('change', callback);
  },

  removeChangeListener(callback) {
    emitter.removeListener('change', callback);
  }
}
