function makeCartScrollNicely() {
  var cart = document.querySelector('.cart');
  var productList = document.querySelector('.products');
  Ps.initialize(cart);
  Ps.initialize(productList);
}

window.onload = function() {
  console.log("page loaded");
}
