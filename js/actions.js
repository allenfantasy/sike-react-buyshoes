import AppDispatcher from './AppDispatcher';
import UndoStore from './stores/UndoStore'

module.exports = {
  addCartItem(productId) {
    AppDispatcher.dispatch({
      type: 'addCartItem',
      productId: productId
    })
  },

  removeCartItem(productId) {
    AppDispatcher.dispatch({
      type: 'removeCartItem',
      productId: productId
    })
  },

  updateCartItemQuantity(productId, quantity) {
    AppDispatcher.dispatch({
      type: 'updateCartItemQuantity',
      productId: productId,
      quantity: quantity
    });
  },

  toggleLikeProduct(productId) {
    AppDispatcher.dispatch({
      type: 'toggleLikeProduct',
      productId: productId
    })
  },
  
  undoShoppingCart() {
    let cartItems = UndoStore.lastHistoryItem()
    AppDispatcher.dispatch({ type: 'undoShoppingCart', cartItems: cartItems })
  }
};
